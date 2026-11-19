import type { Meta } from "@storybook/react-vite";
import { DownloadIcon } from "@storybook/icons";
import { useEffect, useState } from "react";
import previews, {
    renderRequiredActions,
    type EmailPreviewData
} from "virtual:email-previews";

type PreviewProps = {
    template: string;
    locale: string;
    scenario: string;
    requiredActions?: string[];
    showButtonLink?: boolean;
    format?: "html" | "plainText";
};

function EmailPreview({
    template,
    locale,
    scenario,
    requiredActions,
    showButtonLink,
    format = "html"
}: PreviewProps) {
    const actionSelection = JSON.stringify(requiredActions);
    const selection = `${template}:${locale}:${scenario}:${actionSelection}:${showButtonLink}`;
    const [preview, setPreview] = useState<{
        selection: string;
        data: EmailPreviewData;
        downloadUrl: string;
    }>();
    const [error, setError] = useState<{ selection: string; cause: Error }>();
    useEffect(() => {
        let active = true;
        let downloadUrl: string | undefined;
        setError(undefined);
        previews[locale]()
            .then(data => {
                if (!active) return;
                const selected = renderRequiredActions(
                    data[template][scenario],
                    actionSelection === undefined
                        ? undefined
                        : JSON.parse(actionSelection),
                    showButtonLink
                );
                downloadUrl = URL.createObjectURL(
                    new Blob([selected.eml], { type: "message/rfc822" })
                );
                setPreview({ selection, data: selected, downloadUrl });
            })
            .catch(error => {
                if (active)
                    setError({
                        selection,
                        cause: error instanceof Error ? error : new Error(String(error))
                    });
            });
        return () => {
            active = false;
            if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        };
    }, [template, locale, scenario, selection, actionSelection, showButtonLink]);
    if (error?.selection === selection) throw error.cause;
    if (!preview || preview.selection !== selection)
        return (
            <div style={{ height: 600, display: "grid", placeItems: "center" }}>
                <progress aria-label="Loading email preview" />
            </div>
        );
    return (
        <main
            style={{
                width: "100%",
                margin: "0 auto"
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    padding: "16px 16px 0",
                    marginBottom: 16
                }}
            >
                <dl
                    style={{
                        display: "flex",
                        flex: "1 1 240px",
                        minWidth: 0,
                        gap: 12,
                        margin: 0,
                        fontSize: 14,
                        overflowWrap: "anywhere"
                    }}
                >
                    <dt style={{ fontWeight: 600 }}>Subject</dt>
                    <dd style={{ margin: 0, minWidth: 0 }}>{preview.data.subject}</dd>
                </dl>
                <a
                    href={preview.downloadUrl}
                    download={`${template}.${locale}.${scenario}.eml`}
                    title="Download EML"
                    aria-label="Download EML"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        width: 36,
                        height: 36,
                        border: "1px solid #cccccc",
                        borderRadius: 4,
                        backgroundColor: "#ffffff",
                        color: "#333333"
                    }}
                >
                    <DownloadIcon width={18} height={18} aria-hidden="true" />
                </a>
            </div>
            {format === "plainText" ? (
                <pre
                    role="region"
                    aria-label="Plain text email"
                    lang={locale}
                    style={{
                        boxSizing: "border-box",
                        width: "100%",
                        minHeight: 1000,
                        margin: 0,
                        padding: 16,
                        backgroundColor: "#ffffff",
                        color: "#262626",
                        fontFamily: "Consolas, monospace",
                        fontSize: 13,
                        lineHeight: "20px",
                        whiteSpace: "pre-wrap",
                        overflowWrap: "anywhere"
                    }}
                >
                    {preview.data.plainText}
                </pre>
            ) : (
                <iframe
                    title={preview.data.subject}
                    srcDoc={preview.data.html}
                    sandbox=""
                    referrerPolicy="no-referrer"
                    style={{ display: "block", width: "100%", height: 1000, border: 0 }}
                />
            )}
        </main>
    );
}

export function createEmailStoryMeta(
    template: string,
    scenarios = ["default", "no-contact", "no-branding", "long-content"]
) {
    const showButtonLinkControl = template === "email-test";
    return {
        component: EmailPreview,
        parameters: { layout: "padded" },
        args: {
            template,
            locale: "de",
            scenario: "default",
            showButtonLink: false,
            format: "html"
        },
        argTypes: {
            template: { control: false, table: { disable: true } },
            requiredActions: { control: false, table: { disable: true } },
            format: {
                control: {
                    type: "inline-radio",
                    labels: { html: "HTML", plainText: "Plain Text" }
                },
                options: ["html", "plainText"]
            },
            showButtonLink: {
                control: showButtonLinkControl ? "boolean" : false,
                table: { disable: !showButtonLinkControl }
            },
            locale: {
                control: "select",
                options: ["en", "cs", "de", "es", "fr", "it", "ru"]
            },
            scenario: {
                control: false,
                table: { disable: true },
                options: scenarios
            }
        }
    } satisfies Meta<typeof EmailPreview>;
}
