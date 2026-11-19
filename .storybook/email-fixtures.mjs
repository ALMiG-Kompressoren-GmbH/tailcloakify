import Mustache from "mustache";
import { toEml } from "jsx-email/eml";
import {
    normalizeEmailPlainText,
    unwrapEmailPlainText
} from "../src/email/util/plainText.mjs";

export const locales = ["en", "cs", "de", "es", "fr", "it", "ru"];

export function createEmailPreview(source, options) {
    const preview = {
        html: resolveEmailPreview(source.html, options),
        plainText: resolveEmailPreview(source.plainText, { ...options, plainText: true }),
        subject: resolveEmailPreview(source.subject, {
            ...options,
            plainText: true,
            subject: true,
            subjectParameters: source.subjectParameters ?? []
        })
    };
    const encoder = new TextEncoder();
    const chunks = [];
    let chunk = "";
    for (const character of preview.subject) {
        if (encoder.encode(chunk + character).length > 42) {
            chunks.push(chunk);
            chunk = "";
        }
        chunk += character;
    }
    if (chunk) chunks.push(chunk);
    const subject = chunks
        .map(
            value => `=?UTF-8?B?${btoa(String.fromCharCode(...encoder.encode(value)))}?=`
        )
        .join(" ");
    return {
        ...preview,
        eml: toEml({
            html: preview.html,
            plain: preview.plainText,
            subject,
            from: "Tailcloakify Preview <no-reply@example.com>",
            to: "max.mustermann@example.com",
            headers: {
                "X-Tailcloakify-Template": options.template,
                "X-Tailcloakify-Locale": options.locale,
                "X-Tailcloakify-Scenario": options.scenario
            }
        }).replace(/^Subject:\r\n /m, "Subject: ")
    };
}

export function renderRequiredActions(preview, requiredActions, showButtonLink) {
    if (!preview.actionSource) return preview;
    const { source, options } = preview.actionSource;
    return createEmailPreview(source, { ...options, requiredActions, showButtonLink });
}

export function resolveEmailPreview(
    source,
    {
        scenario = "default",
        locale = "en",
        logo = "",
        logoWidth = 40,
        logoHeight = 40,
        background = "",
        messages = {},
        plainText = false,
        subject = false,
        subjectParameters = [],
        showButtonLink = false,
        requiredActions = scenario === "no-actions"
            ? []
            : scenario === "admin"
              ? ["VERIFY_EMAIL", "CONFIGURE_TOTP"]
              : ["UPDATE_PASSWORD", "UPDATE_PROFILE"]
    } = {}
) {
    const daysRemaining = scenario === "no-deadline" ? 0 : 7;
    const reason = "account inactivity";
    const workflowKind =
        scenario === "disable" ? "Disable" : scenario === "delete" ? "Delete" : "";
    const formatMessage = (key, parameters = []) =>
        (messages[key] ?? key)
            .replaceAll("''", "'")
            .replace(/\{(\d+)\}/g, (match, index) => parameters[Number(index)] ?? match);
    const values = {
        showButtonLink,
        realmName:
            scenario === "long-content"
                ? "TailcloakifyEnterpriseIdentityAndAccessManagement International"
                : "Tailcloakify",
        firstName: "Max",
        lastName: "Mustermann",
        newEmail:
            scenario === "long-content"
                ? "maximilian.mustermann.international@example.com"
                : "max.mustermann@example.com",
        link: "https://example.com/account/verify",
        magicLink: "https://example.com/account/magic-link",
        activationLink: "https://example.com/account/activate",
        linkExpirationMinutes: "30",
        clientName: "Example Application",
        realmUrl: "https://example.com/realms/tailcloakify",
        email: "max.mustermann@example.com",
        inviterName: "Alex Example",
        code: "123456",
        username: "max.mustermann",
        provider: "GitHub",
        organization:
            scenario === "long-content"
                ? "International Manufacturing and Engineering Organization"
                : "Example Organization",
        date: "2026-11-18 10:30 UTC",
        ipAddress: "192.0.2.42",
        credentialType: scenario === "unknown-credential" ? "unknown" : "webauthn",
        credentialName: "Employee Identity Credential",
        workflowSubject: formatMessage(`account${workflowKind}NotificationSubject`, [
            daysRemaining,
            reason
        ]),
        workflowBody: formatMessage(`account${workflowKind}NotificationBody`, [
            daysRemaining,
            reason
        ]),
        workflowGreeting: formatMessage("accountNotificationGreeting", ["Max"]),
        workflowTimeRemaining: formatMessage("accountNotificationTimeRemaining", [
            daysRemaining
        ]),
        workflowQuestions: formatMessage("accountNotificationQuestions", [
            "Tailcloakify"
        ]),
        workflowSignature: formatMessage("accountNotificationSignatureFrom", [
            "Tailcloakify"
        ]),
        customWorkflowMessage:
            "This is a custom workflow message for the demonstration account.",
        customWorkflow: scenario === "custom-message",
        hasWorkflowDeadline: daysRemaining > 0,
        hasWorkflowQuestions: scenario !== "delete",
        hasInviter: scenario !== "no-inviter",
        hasInvitationLink: scenario !== "no-link",
        noInvitationLink: scenario === "no-link",
        expiry: new Intl.NumberFormat(locale, {
            style: "unit",
            unit: "minute",
            unitDisplay: "long"
        }).format(30),
        logo,
        logoWidth,
        logoHeight,
        background,
        backgroundColor:
            scenario === "gradient-orange"
                ? "#f1f1f1"
                : scenario === "white-background"
                  ? "#ffffff"
                  : "#f3f4f6",
        backgroundImage:
            scenario === "gradient-orange"
                ? "linear-gradient(135deg, #d3f5ff, #f5d9ff)"
                : "none",
        dividerColor:
            scenario === "gradient-orange"
                ? "#f7a800"
                : scenario === "white-background"
                  ? "#374151"
                  : "#d1d5db",
        font: "Arial",
        contact: "support@example.com",
        imprint: "https://example.com/imprint",
        dataProtection: "https://example.com/privacy",
        hasLogo: scenario !== "no-branding" && Boolean(logo),
        hasBackground: scenario !== "no-branding" && Boolean(background),
        hasFont: scenario !== "no-branding",
        hasImprint: scenario !== "no-branding",
        hasDataProtection: scenario !== "no-branding",
        welcome:
            requiredActions.includes("UPDATE_PASSWORD") &&
            requiredActions.includes("UPDATE_PROFILE"),
        named: scenario !== "anonymous",
        hasActions: requiredActions.length > 0,
        hasContact: scenario !== "no-contact" && scenario !== "no-branding",
        actions: requiredActions.map(action => ({
            label: messages[`requiredAction.${action}`] ?? action
        }))
    };
    const expressions = {
        realmName: "realmName",
        firstName: "firstName",
        lastName: "lastName",
        newEmail: "newEmail",
        link: "link",
        magicLink: "magicLink",
        activationLink: "activationLink",
        linkExpirationMinutes: "linkExpirationMinutes",
        clientName: "clientName",
        "url.loginUrl?keep_before_last('/login-actions/')": "realmUrl",
        email: "email",
        inviterName: "inviterName",
        orgName: "organization",
        code: "code",
        "identityProviderContext.username": "username",
        identityProviderDisplayName: "provider",
        "organization.name": "organization",
        "event.date": "date",
        "event.ipAddress": "ipAddress",
        "event.getDetail('credential_type')!'unknown'": "credentialType",
        "(event.getDetail('credential_type')!'unknown')?esc": "credentialType",
        credentialScopeDisplayName: "credentialName",
        "kcSanitize(msg(subjectKey, daysRemaining, reason))?no_esc": "workflowSubject",
        "kcSanitize(msg(messageKey, daysRemaining, reason))?no_esc": "workflowBody",
        "kcSanitize(msg('accountNotificationGreeting', user.firstName!user.username))?no_esc":
            "workflowGreeting",
        "kcSanitize(msg('accountNotificationTimeRemaining', daysRemaining))?no_esc":
            "workflowTimeRemaining",
        "kcSanitize(msg('accountNotificationQuestions', realmName))?no_esc":
            "workflowQuestions",
        "kcSanitize(msg('accountNotificationSignatureFrom', realmName))?no_esc":
            "workflowSignature",
        "kcSanitize(customMessage)?no_esc": "customWorkflowMessage",
        "linkExpirationFormatter(linkExpiration)": "expiry",
        "properties.TAILCLOAKIFY_EMAIL_LOGO": "logo",
        "properties.TAILCLOAKIFY_EMAIL_LOGO_WIDTH": "logoWidth",
        "properties.TAILCLOAKIFY_EMAIL_LOGO_HEIGHT": "logoHeight",
        "properties.TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE_URL": "background",
        "(properties.TAILCLOAKIFY_EMAIL_BACKGROUND_COLOR!'#f3f4f6')?esc":
            "backgroundColor",
        "(properties.TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE!'none')?esc": "backgroundImage",
        "(properties.TAILCLOAKIFY_EMAIL_DIVIDER_COLOR!'#d1d5db')?esc": "dividerColor",
        "properties.TAILCLOAKIFY_EMAIL_FONT_FAMILY": "font",
        "properties.TAILCLOAKIFY_EMAIL_CONTACT": "contact",
        "properties.TAILCLOAKIFY_FOOTER_IMPRINT_URL": "imprint",
        "properties.TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL": "dataProtection"
    };
    const conditions = {
        "(properties.TAILCLOAKIFY_EMAIL_SHOW_BUTTON_LINK!'false')?lower_case == 'true'":
            "showButtonLink",
        "messageKey == 'customMessage'": "customWorkflow",
        "messageKey != 'accountDeleteNotificationBody'": "hasWorkflowQuestions",
        "daysRemaining gt 0": "hasWorkflowDeadline",
        "inviterName?? && inviterName?has_content": "hasInviter",
        "link?? && link?has_content": "hasInvitationLink",
        "!(link?? && link?has_content)": "noInvitationLink",
        "(requiredActions![])?seq_contains('UPDATE_PASSWORD') && (requiredActions![])?seq_contains('UPDATE_PROFILE')":
            "welcome",
        "(requiredActions![])?size gt 0": "hasActions",
        "firstName?? && lastName??": "named",
        "properties.TAILCLOAKIFY_EMAIL_CONTACT?? && properties.TAILCLOAKIFY_EMAIL_CONTACT?has_content":
            "hasContact",
        "properties.TAILCLOAKIFY_EMAIL_LOGO?? && properties.TAILCLOAKIFY_EMAIL_LOGO?has_content":
            "hasLogo",
        "properties.TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE_URL?? && properties.TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE_URL?has_content":
            "hasBackground",
        "properties.TAILCLOAKIFY_EMAIL_FONT_FAMILY?? && properties.TAILCLOAKIFY_EMAIL_FONT_FAMILY?has_content":
            "hasFont",
        "properties.TAILCLOAKIFY_FOOTER_IMPRINT_URL?? && properties.TAILCLOAKIFY_FOOTER_IMPRINT_URL?has_content":
            "hasImprint",
        "properties.TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL?? && properties.TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL?has_content":
            "hasDataProtection"
    };
    const stack = [];
    const templateSource = subject
        ? source.replaceAll("''", "'").replace(/\{(\d+)\}/g, (match, index) => {
              const name = subjectParameters[Number(index)];
              if (!name) throw new Error(`Unknown email subject parameter: ${match}`);
              return "${" + name + "}";
          })
        : plainText
          ? unwrapEmailPlainText(source)
          : source;
    const template = templateSource
        .replace(
            "<#list (requiredActions![]) as r><li>${msg('requiredAction.' + r)}</li></#list>",
            "{{#actions}}<li>{{label}}</li>{{/actions}}"
        )
        .replace(/<\/?#(?:if|else)\b[^>]*>/g, directive => {
            if (directive.startsWith("<#if")) {
                const condition = directive.slice(5, -1).trim().replace(/\s+/g, " ");
                const name = conditions[condition];
                if (!name)
                    throw new Error(`Unsupported email preview condition: ${condition}`);
                stack.push({ name, inverse: false });
                return `{{#${name}}}`;
            }
            const current = stack.at(-1);
            if (!current)
                throw new Error(`Unbalanced email preview directive: ${directive}`);
            if (directive === "<#else>") {
                if (current.inverse) throw new Error("Duplicate email preview else");
                current.inverse = true;
                return `{{/${current.name}}}{{^${current.name}}}`;
            }
            stack.pop();
            return `{{/${current.name}}}`;
        })
        .replace(/\$\{([^}]+)\}/g, (_match, expression) => {
            const name =
                expressions[expression] ?? expressions[expression.replace(/\?esc$/, "")];
            if (!name)
                throw new Error(`Unsupported email preview expression: ${expression}`);
            if (name === "background") return "{{{background}}}";
            return `{{${name}}}`;
        });
    if (stack.length || /<\/?#/.test(template)) {
        throw new Error("Unsupported or unbalanced FreeMarker in email preview");
    }
    const rendered = Mustache.render(
        template,
        values,
        {},
        plainText ? { escape: value => String(value) } : undefined
    );
    return plainText && !subject ? normalizeEmailPlainText(rendered) : rendered;
}
