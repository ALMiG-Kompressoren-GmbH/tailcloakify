import io
import json
import os
from pathlib import Path
import stat
import sys
import tempfile
import unittest
from unittest.mock import patch
from urllib.request import Request
import zipfile

import storybook_previews as previews


HEAD = "a" * 40


def archive(extra=None, label="main"):
    output = io.BytesIO()
    with zipfile.ZipFile(output, "w") as document:
        for name, value in {
            "index.html": label,
            "iframe.html": "preview",
            "index.json": json.dumps({"entries": {}}),
            **(extra or {}),
        }.items():
            document.writestr(name, value)
    return output.getvalue()


def run(number=1, **values):
    return {
        "id": number,
        "event": "pull_request",
        "conclusion": "success",
        "head_sha": HEAD,
        "pull_requests": [{"number": number, "head": {"sha": HEAD}}],
        **values,
    }


class FakeGitHub:
    def __init__(self):
        self.pull_requests = [{"number": 1, "state": "open", "head": {"sha": HEAD}}]
        self.runs = {
            previews.MAIN_WORKFLOW: [run(10, event="push", head_branch="main")],
            previews.PR_WORKFLOW: [run()],
        }
        self.artifacts = {
            10: [{"name": "storybook", "id": 10, "expired": False}],
            1: [{"name": "storybook", "id": 1, "expired": False}],
        }
        self.archives = {10: archive(), 1: archive(label="pull request")}
        self.comments = []
        self.writes = []

    def pages(self, path, key=None, **query):
        if path == "/pulls":
            return iter(self.pull_requests)
        if path.endswith("/comments"):
            return iter(self.comments)
        if path.endswith("/artifacts"):
            return iter(self.artifacts[int(path.split("/")[3])])
        return iter(self.runs[path.split("/")[3]])

    def request(self, method, path, body=None, raw=False):
        if raw:
            return self.archives[int(path.split("/")[3])]
        if method == "GET":
            return next(item for item in self.pull_requests if item["number"] == int(path.split("/")[-1]))
        self.writes.append((method, path, body))


class PreviewTests(unittest.TestCase):
    def test_extracts_regular_static_files(self):
        with tempfile.TemporaryDirectory() as temporary:
            destination = Path(temporary) / "site"
            previews.extract_preview(archive({"assets/main.js": "console.log('preview')"}), destination)
            self.assertEqual((destination / "index.html").read_text(), "main")
            self.assertTrue((destination / "assets/main.js").is_file())

    def test_rejects_traversal_absolute_and_windows_paths(self):
        for name in ("../escape", "/escape", "assets/../../escape", "assets\\escape", "C:/escape"):
            with self.subTest(name=name), tempfile.TemporaryDirectory() as temporary:
                data = archive({name: "bad"})
                if "\\" in name:
                    data = data.replace(name.replace("\\", "/").encode(), name.encode())
                with self.assertRaises(ValueError):
                    previews.extract_preview(data, Path(temporary) / "site")
                self.assertEqual(list(Path(temporary).iterdir()), [])

    def test_rejects_symlinks_collisions_and_zip_bombs(self):
        output = io.BytesIO()
        with zipfile.ZipFile(output, "w") as document:
            link = zipfile.ZipInfo("link")
            link.external_attr = (stat.S_IFLNK | 0o777) << 16
            document.writestr(link, "../escape")
        for data in (output.getvalue(), archive({"INDEX.HTML": "collision"})):
            with tempfile.TemporaryDirectory() as temporary, self.assertRaises(ValueError):
                previews.extract_preview(data, Path(temporary) / "site")
        with tempfile.TemporaryDirectory() as temporary, patch.object(previews, "MAX_EXTRACTED_BYTES", 2):
            with self.assertRaises(ValueError):
                previews.extract_preview(archive(), Path(temporary) / "site")

    def test_requires_complete_storybook(self):
        output = io.BytesIO()
        with zipfile.ZipFile(output, "w") as document:
            document.writestr("index.html", "incomplete")
        with tempfile.TemporaryDirectory() as temporary, self.assertRaises(ValueError):
            previews.extract_preview(output.getvalue(), Path(temporary) / "site")

    def test_redirect_strips_authorization_and_rejects_http(self):
        request = Request("https://api.github.com/artifact", headers={"Authorization": "Bearer synthetic"})
        redirect = previews.SafeRedirect().redirect_request(request, None, 302, "Found", {}, "https://storage.example.com/artifact")
        self.assertIsNone(redirect.get_header("Authorization"))
        with self.assertRaises(ValueError):
            previews.SafeRedirect().redirect_request(request, None, 302, "Found", {}, "http://storage.example.com/artifact")

    def test_run_requires_current_head_and_server_pr_association(self):
        pull_request = {"number": 1, "head": {"sha": HEAD}}
        self.assertTrue(previews.matching_run(run(), pull_request))
        for candidate in (run(head_sha="b" * 40), run(pull_requests=[]), run(2), run(event="push"), run(conclusion="failure")):
            self.assertFalse(previews.matching_run(candidate, pull_request))
        self.assertFalse(previews.matching_run(run(event="push", head_branch="other")))

    def test_assembly_preserves_main_and_isolates_each_pr(self):
        api = FakeGitHub()
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            manifest = previews.assemble(api, root / "site", root / "manifest.json")
            self.assertEqual((root / "site/index.html").read_text(), "main")
            self.assertEqual((root / "site/pr/1/index.html").read_text(), "pull request")
            self.assertTrue(manifest[0]["available"])
            self.assertEqual(json.loads((root / "manifest.json").read_text()), manifest)

    def test_closed_pr_is_not_carried_into_new_site(self):
        api = FakeGitHub()
        api.pull_requests = []
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            self.assertEqual(previews.assemble(api, root / "site", root / "manifest.json"), [])
            self.assertFalse((root / "site/pr").exists())

    def test_stale_expired_and_unassociated_artifacts_are_excluded(self):
        for candidate in (run(head_sha="b" * 40), run(pull_requests=[]), run()):
            api = FakeGitHub()
            api.runs[previews.PR_WORKFLOW] = [candidate]
            if candidate == run():
                api.artifacts[1][0]["expired"] = True
            with tempfile.TemporaryDirectory() as temporary:
                root = Path(temporary)
                manifest = previews.assemble(api, root / "site", root / "manifest.json")
                self.assertFalse(manifest[0]["available"])
                self.assertFalse((root / "site/pr/1").exists())

    def test_missing_main_fails_without_creating_site(self):
        api = FakeGitHub()
        api.runs[previews.MAIN_WORKFLOW] = []
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            with self.assertRaises(RuntimeError):
                previews.assemble(api, root / "site", root / "manifest.json")
            self.assertFalse((root / "site").exists())

    def test_invalid_pr_cannot_overwrite_main_or_block_other_previews(self):
        api = FakeGitHub()
        api.archives[1] = archive({"../../index.html": "overwrite"})
        api.pull_requests.append({"number": 2, "state": "open", "head": {"sha": HEAD}})
        api.runs[previews.PR_WORKFLOW].append(run(2))
        api.artifacts[2] = [{"name": "storybook", "id": 2, "expired": False}]
        api.archives[2] = archive(label="second preview")
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            manifest = previews.assemble(api, root / "site", root / "manifest.json")
            self.assertFalse(manifest[0]["available"])
            self.assertEqual((root / "site/index.html").read_text(), "main")
            self.assertFalse((root / "site/pr/1").exists())
            self.assertTrue(manifest[1]["available"])
            self.assertEqual((root / "site/pr/2/index.html").read_text(), "second preview")

    def test_artifact_removed_during_download_does_not_remove_main(self):
        api = FakeGitHub()
        original = api.request

        def request(method, path, body=None, raw=False):
            if path == "/actions/artifacts/1/zip":
                raise previews.ApiError(410)
            return original(method, path, body, raw)

        api.request = request
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            manifest = previews.assemble(api, root / "site", root / "manifest.json")
            self.assertFalse(manifest[0]["available"])
            self.assertTrue((root / "site/index.html").is_file())

    def test_rate_limit_failure_does_not_silently_discard_previews(self):
        api = FakeGitHub()
        original = api.request

        def request(method, path, body=None, raw=False):
            if path == "/actions/artifacts/1/zip":
                raise previews.ApiError(403)
            return original(method, path, body, raw)

        api.request = request
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            with self.assertRaises(previews.ApiError):
                previews.assemble(api, root / "site", root / "manifest.json")
            self.assertFalse((root / "manifest.json").exists())

    def test_combined_site_limit_is_enforced(self):
        with tempfile.TemporaryDirectory() as temporary, patch.object(previews, "MAX_SITE_BYTES", 1):
            root = Path(temporary)
            with self.assertRaises(ValueError):
                previews.assemble(FakeGitHub(), root / "site", root / "manifest.json")

    def test_comment_links_include_pr_and_exact_commit(self):
        api = FakeGitHub()
        previews.comment_previews(api, [{"number": 1, "head": HEAD, "available": True}], "https://example.github.io/theme/")
        self.assertEqual(len(api.writes), 1)
        self.assertIn("https://example.github.io/theme/pr/1/", api.writes[0][2]["body"])
        self.assertIn(HEAD, api.writes[0][2]["body"])

    def test_comments_update_only_bot_owned_marker_and_skip_new_head(self):
        api = FakeGitHub()
        api.comments = [
            {"id": 1, "user": {"login": "contributor"}, "body": previews.COMMENT_MARKER},
            {"id": 2, "user": {"login": "github-actions[bot]"}, "body": previews.COMMENT_MARKER},
        ]
        previews.comment_previews(api, [{"number": 1, "head": HEAD, "available": True}], "https://example.github.io/theme/")
        self.assertEqual(api.writes[0][1], "/issues/comments/2")
        api.writes.clear()
        previews.comment_previews(api, [{"number": 1, "head": "b" * 40, "available": True}], "https://example.github.io/theme/")
        self.assertEqual(api.writes, [])

    def test_unavailable_preview_updates_old_comment_without_creating_new_one(self):
        api = FakeGitHub()
        manifest = [{"number": 1, "head": HEAD, "available": False}]
        previews.comment_previews(api, manifest, "https://example.github.io/theme/")
        self.assertEqual(api.writes, [])
        api.comments = [{"id": 2, "user": {"login": "github-actions[bot]"}, "body": previews.COMMENT_MARKER}]
        previews.comment_previews(api, manifest, "https://example.github.io/theme/")
        self.assertEqual(api.writes[0][0], "PATCH")
        self.assertIn("No successful Storybook preview", api.writes[0][2]["body"])

    def test_closed_event_marks_existing_preview_comment_removed(self):
        api = FakeGitHub()
        api.pull_requests[0]["state"] = "closed"
        api.comments = [{"id": 2, "user": {"login": "github-actions[bot]"}, "body": previews.COMMENT_MARKER}]
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            (root / "manifest.json").write_text("[]", encoding="utf-8")
            (root / "event.json").write_text(json.dumps({"pull_request": {"number": 1}}), encoding="utf-8")
            with patch.dict(os.environ, {
                "GITHUB_REPOSITORY": "example/theme",
                "GITHUB_TOKEN": "synthetic",
                "GITHUB_EVENT_NAME": "pull_request_target",
                "GITHUB_EVENT_PATH": str(root / "event.json"),
                "PAGES_BASE_URL": "https://example.github.io/theme/",
            }), patch.object(sys, "argv", ["publisher", "comment", "--manifest", str(root / "manifest.json")]), patch.object(previews, "GitHub", return_value=api):
                previews.main()
        self.assertEqual(api.writes[0][1], "/issues/comments/2")
        self.assertIn("preview removed", api.writes[0][2]["body"])


if __name__ == "__main__":
    unittest.main()