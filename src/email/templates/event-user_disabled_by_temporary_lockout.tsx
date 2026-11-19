import { createSecurityEventEmail } from "../util/createSecurityEventEmail";

export const { Template, previewProps, getTemplate, getSubject, templateName } =
    createSecurityEventEmail("temporaryLockout", "Temporary Account Lockout");
