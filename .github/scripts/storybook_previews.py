import argparse
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import stat
from urllib.error import HTTPError
from urllib.parse import urlencode, urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener
import zipfile
import zlib


MAX_ARCHIVE_BYTES = 100 * 1024 * 1024
MAX_EXTRACTED_BYTES = 250 * 1024 * 1024
MAX_SITE_BYTES = 900 * 1024 * 1024
MAIN_WORKFLOW = "storybook-pages.yaml"
PR_WORKFLOW = "storybook-pr.yaml"
COMMENT_MARKER = "<!-- tailcloakify-storybook-preview -->"


class ApiError(RuntimeError):
    def __init__(self, status):
        super().__init__(f"GitHub API request failed with HTTP {status}")
        self.status = status


class SafeRedirect(HTTPRedirectHandler):
    def redirect_request(self, request, response, code, message, headers, new_url):
        if urlsplit(new_url).scheme != "https":
            raise ValueError("Artifact redirects must use HTTPS")
        redirected = super().redirect_request(request, response, code, message, headers, new_url)
        redirected.remove_header("Authorization")
        return redirected


class GitHub:
    def __init__(self, repository, token, api_url="https://api.github.com"):
        if not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", repository):
            raise ValueError("Invalid repository")
        if urlsplit(api_url).scheme != "https":
            raise ValueError("GitHub API must use HTTPS")
        self.repository = repository
        self.prefix = f"/repos/{repository}"
        self.token = token
        self.api_url = api_url.rstrip("/")
        self.opener = build_opener(SafeRedirect())

    def request(self, method, path, body=None, raw=False, **query):
        url = self.api_url + self.prefix + path
        if query:
            url += "?" + urlencode(query)
        request = Request(url, method=method, headers={
            "Authorization": f"Bearer {self.token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
            "User-Agent": "tailcloakify-storybook-previews",
        }, data=None if body is None else json.dumps(body).encode("utf-8"))
        try:
            with self.opener.open(request, timeout=60) as response:
                data = response.read(MAX_ARCHIVE_BYTES + 1)
        except HTTPError as error:
            raise ApiError(error.code) from None
        if len(data) > MAX_ARCHIVE_BYTES:
            raise ValueError("GitHub response exceeds the preview size limit")
        return data if raw else json.loads(data)

    def pages(self, path, key=None, **query):
        for page in range(1, 101):
            document = self.request("GET", path, per_page=100, page=page, **query)
            items = document if key is None else document[key]
            yield from items
            if len(items) < 100:
                return
        raise RuntimeError("GitHub pagination limit exceeded")


def matching_run(run, pull_request=None):
    if run.get("conclusion") != "success":
        return False
    if pull_request is None:
        return run.get("event") in ("push", "workflow_dispatch") and run.get("head_branch") == "main"
    head = pull_request["head"]["sha"]
    return (
        run.get("event") == "pull_request"
        and run.get("head_sha") == head
        and any(
            item.get("number") == pull_request["number"]
            and item.get("head", {}).get("sha") == head
            for item in run.get("pull_requests", [])
        )
    )


def find_artifact(api, workflow, pull_request=None):
    query = {"status": "success"}
    if pull_request is None:
        query["branch"] = "main"
    else:
        query.update(event="pull_request", head_sha=pull_request["head"]["sha"])
    for run in api.pages(f"/actions/workflows/{workflow}/runs", "workflow_runs", **query):
        if not matching_run(run, pull_request):
            continue
        for artifact in api.pages(f"/actions/runs/{int(run['id'])}/artifacts", "artifacts"):
            if artifact.get("name") == "storybook" and not artifact.get("expired", True):
                return artifact, run
    return None


def extract_preview(data, destination):
    if len(data) > MAX_ARCHIVE_BYTES:
        raise ValueError("Preview archive is too large")
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        entries = archive.infolist()
        if len(entries) > 20000 or sum(item.file_size for item in entries) > MAX_EXTRACTED_BYTES:
            raise ValueError("Expanded preview exceeds size limit")
        names = set()
        for item in entries:
            name = item.orig_filename
            path = PurePosixPath(name)
            mode = (item.external_attr >> 16) & 0o170000
            if (
                not name or "\\" in name or ":" in name or "\0" in name
                or not path.parts or path.is_absolute() or ".." in path.parts
                or mode not in (0, stat.S_IFREG, stat.S_IFDIR)
                or name.casefold().rstrip("/") in names
            ):
                raise ValueError("Unsafe preview archive entry")
            names.add(name.casefold().rstrip("/"))
        destination.mkdir(parents=True, exist_ok=False)
        written = 0
        for item in entries:
            target = destination.joinpath(*PurePosixPath(item.filename).parts)
            if item.is_dir():
                target.mkdir(parents=True, exist_ok=True)
                continue
            target.parent.mkdir(parents=True, exist_ok=True)
            with archive.open(item) as source, target.open("xb") as output:
                while True:
                    chunk = source.read(1024 * 1024)
                    if not chunk:
                        break
                    written += len(chunk)
                    if written > MAX_EXTRACTED_BYTES:
                        raise ValueError("Expanded preview exceeds size limit")
                    output.write(chunk)
    for required in ("index.html", "iframe.html", "index.json"):
        if not (destination / required).is_file():
            raise ValueError("Incomplete Storybook artifact")
    return written


def download_preview(api, artifact, destination):
    data = api.request("GET", f"/actions/artifacts/{int(artifact['id'])}/zip", raw=True)
    return extract_preview(data, destination)


def assemble(api, destination, manifest_path):
    main = find_artifact(api, MAIN_WORKFLOW)
    if main is None:
        raise RuntimeError("No main Storybook artifact available; run the main Storybook build first")
    size = download_preview(api, main[0], destination)
    if (destination / "pr").exists():
        raise ValueError("Main artifact must not contain the reserved pr directory")
    manifest = []
    for pull_request in api.pages("/pulls", state="open", base="main", sort="updated", direction="desc"):
        number = int(pull_request["number"])
        if number <= 0:
            raise ValueError("Invalid pull request number")
        head = pull_request["head"]["sha"]
        if not re.fullmatch(r"[a-f0-9]{40}", head):
            raise ValueError("Invalid pull request commit")
        record = {"number": number, "head": head, "available": False}
        manifest.append(record)
        artifact = find_artifact(api, PR_WORKFLOW, pull_request)
        if artifact is None:
            continue
        preview = destination / "pr" / str(number)
        try:
            preview_size = download_preview(api, artifact[0], preview)
        except ApiError as error:
            if error.status not in (404, 410):
                raise
            shutil.rmtree(preview, ignore_errors=True)
            print(f"Skipping unavailable preview artifact for PR #{number}")
            continue
        except (ValueError, zipfile.BadZipFile, OSError, RuntimeError, zlib.error):
            shutil.rmtree(preview, ignore_errors=True)
            print(f"Skipping invalid preview artifact for PR #{number}")
            continue
        size += preview_size
        if size > MAX_SITE_BYTES:
            raise ValueError("Combined Pages site exceeds size limit")
        record.update(available=True, run=int(artifact[1]["id"]))
    manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
    return manifest


def update_comment(api, number, body, create):
    for comment in api.pages(f"/issues/{number}/comments"):
        if (
            comment.get("user", {}).get("login") == "github-actions[bot]"
            and comment.get("body", "").startswith(COMMENT_MARKER)
        ):
            if comment["body"] != body:
                api.request("PATCH", f"/issues/comments/{int(comment['id'])}", {"body": body})
            return
    if create:
        api.request("POST", f"/issues/{number}/comments", {"body": body})


def comment_previews(api, manifest, base_url):
    parsed = urlsplit(base_url)
    if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password or parsed.query or parsed.fragment:
        raise ValueError("Invalid Pages deployment URL")
    base_url = base_url.rstrip("/")
    for record in manifest:
        number = int(record["number"])
        current = api.request("GET", f"/pulls/{number}")
        if current["state"] != "open" or current["head"]["sha"] != record["head"]:
            continue
        body = COMMENT_MARKER + "\n"
        if record["available"]:
            body += (
                f"**[Storybook preview]({base_url}/pr/{number}/)**\n\n"
                f"Commit: `{record['head']}`\n\n"
                "Includes login pages and email templates. This preview contains code from this pull request."
            )
        else:
            body += "No successful Storybook preview is available for the current PR commit. Check the Storybook build."
        update_comment(api, number, body, create=record["available"])


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=("assemble", "comment"))
    parser.add_argument("--output", type=Path)
    parser.add_argument("--manifest", type=Path, required=True)
    arguments = parser.parse_args()
    api = GitHub(os.environ["GITHUB_REPOSITORY"], os.environ["GITHUB_TOKEN"], os.environ.get("GITHUB_API_URL", "https://api.github.com"))
    if arguments.command == "assemble":
        if arguments.output is None:
            parser.error("--output is required for assembly")
        assemble(api, arguments.output, arguments.manifest)
    else:
        manifest = json.loads(arguments.manifest.read_text(encoding="utf-8"))
        comment_previews(api, manifest, os.environ["PAGES_BASE_URL"])
        if os.environ.get("GITHUB_EVENT_NAME") == "pull_request_target":
            event = json.loads(Path(os.environ["GITHUB_EVENT_PATH"]).read_text(encoding="utf-8"))
            number = int(event["pull_request"]["number"])
            current = api.request("GET", f"/pulls/{number}")
            if current["state"] == "closed":
                update_comment(api, number, COMMENT_MARKER + "\nStorybook preview removed because this pull request is closed.", create=False)


if __name__ == "__main__":
    main()