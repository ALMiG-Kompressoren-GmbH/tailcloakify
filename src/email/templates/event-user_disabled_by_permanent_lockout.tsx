import { createSecurityEventEmail } from "../util/createSecurityEventEmail";

export const { Template, previewProps, getTemplate, getSubject, templateName } =
    createSecurityEventEmail("permanentLockout", "Permanent Account Lockout");
