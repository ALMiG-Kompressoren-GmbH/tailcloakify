import { createSecurityEventEmail } from "../util/createSecurityEventEmail";

export const { Template, previewProps, getTemplate, getSubject, templateName } =
    createSecurityEventEmail("updateCredential", "Credential Updated");
