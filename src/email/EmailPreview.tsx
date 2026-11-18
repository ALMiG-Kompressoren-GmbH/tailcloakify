import type { Meta } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import previews from "virtual:email-previews";

type PreviewProps = {
    template: string;
    locale: string;
    screen: "desktop" | "mobile";
    scenario: string;
};

function EmailPreview({ template, locale, screen, scenario }: PreviewProps) {
    const [preview, setPreview] = useState<{ html: string; subject: string }>();
    const [error, setError] = useState<Error>();
    useEffect(() => {
        let active = true;
        setPreview(undefined);
        setError(undefined);
        previews[locale]()
            .then(data => {
                if (active) setPreview(data[template][scenario]);
            })
            .catch(error => {
                if (active)
                    setError(error instanceof Error ? error : new Error(String(error)));
            });
        return () => {
            active = false;
        };
    }, [template, locale, scenario]);
    if (error) throw error;
    if (!preview)
        return (
            <div style={{ height: 600, display: "grid", placeItems: "center" }}>
                <progress aria-label="Loading email preview" />
            </div>
        );
    return (
        <main
            style={{
                width: screen === "mobile" ? 375 : 720,
                maxWidth: "100%",
                margin: "0 auto"
            }}
        >
            <dl
                style={{
                    display: "flex",
                    gap: 12,
                    margin: "0 0 16px",
                    fontSize: 14,
                    overflowWrap: "anywhere"
                }}
            >
                <dt style={{ fontWeight: 600 }}>Subject</dt>
                <dd style={{ margin: 0 }}>{preview.subject}</dd>
            </dl>
            <iframe
                title={preview.subject}
                srcDoc={preview.html}
                sandbox=""
                referrerPolicy="no-referrer"
                style={{ display: "block", width: "100%", height: 1000, border: 0 }}
            />
        </main>
    );
}

export function createEmailStoryMeta(
    template: string,
    scenarios = ["default", "no-contact"]
) {
    return {
        component: EmailPreview,
        parameters: { layout: "padded" },
        args: { template, locale: "de", screen: "desktop", scenario: "default" },
        argTypes: {
            template: { control: false, table: { disable: true } },
            locale: {
                control: "select",
                options: ["en", "cs", "de", "es", "fr", "it", "ru"]
            },
            screen: { control: "inline-radio", options: ["desktop", "mobile"] },
            scenario: { control: "select", options: scenarios }
        }
    } satisfies Meta<typeof EmailPreview>;
}
