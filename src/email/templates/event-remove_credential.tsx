import { createSecurityEventEmail } from "../util/createSecurityEventEmail";

export const { Template, previewProps, getTemplate, getSubject, templateName } =
    createSecurityEventEmail("removeCredential", "Credential Removed");
