const prefix = "<#assign tailcloakifyPlainTextBody>";
const suffix =
    '</#assign>${tailcloakifyPlainTextBody?markup_string?replace("\\r\\n?", "\\n", "r")?replace("[ \\t]+(?=\\n|$)", "", "r")?replace("\\n{3,}", "\\n\\n", "r")?trim?no_esc}';

export function normalizeEmailPlainText(text) {
    return text
        .replace(/\r\n?/g, "\n")
        .replace(/[ \t]+(?=\n|$)/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

export function wrapEmailPlainText(text) {
    return prefix + text + suffix;
}

export function unwrapEmailPlainText(text) {
    if (!text.startsWith(prefix)) return text;
    if (!text.endsWith(suffix)) throw new Error("Incomplete plain-text email wrapper");
    return text.slice(prefix.length, -suffix.length);
}
