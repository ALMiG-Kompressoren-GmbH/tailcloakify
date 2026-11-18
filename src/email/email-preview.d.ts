declare module "virtual:email-previews" {
    const previews: Record<
        string,
        () => Promise<Record<string, Record<string, { html: string; subject: string }>>>
    >;
    export default previews;
}
