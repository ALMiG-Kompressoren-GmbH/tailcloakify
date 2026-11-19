declare module "virtual:email-previews" {
    export type EmailPreviewData = {
        html: string;
        plainText: string;
        subject: string;
        eml: string;
    };

    export function renderRequiredActions(
        preview: EmailPreviewData,
        requiredActions?: string[],
        showButtonLink?: boolean
    ): EmailPreviewData;

    const previews: Record<
        string,
        () => Promise<Record<string, Record<string, EmailPreviewData>>>
    >;
    export default previews;
}
