import Mustache from "mustache";

export const locales = ["en", "cs", "de", "es", "fr", "it", "ru"];

export function resolveEmailPreview(
    source,
    {
        scenario = "default",
        locale = "en",
        logo = "",
        messages = {},
        plainText = false
    } = {}
) {
    const values = {
        realmName: "Tailcloakify",
        firstName: "Max",
        lastName: "Mustermann",
        newEmail: "max.mustermann@example.com",
        link: "https://example.com/account/verify",
        magicLink: "https://example.com/account/magic-link",
        code: "123456",
        username: "max.mustermann",
        provider: "GitHub",
        organization: "Example Organization",
        date: "2026-11-18 10:30 UTC",
        ipAddress: "192.0.2.42",
        expiry: new Intl.NumberFormat(locale, {
            style: "unit",
            unit: "minute",
            unitDisplay: "long"
        }).format(30),
        logo,
        background: "",
        font: "Arial",
        contact: "support@example.com",
        welcome: scenario !== "admin" && scenario !== "no-actions",
        named: scenario !== "anonymous",
        hasActions: scenario !== "no-actions",
        hasContact: scenario !== "no-contact",
        actions: ["VERIFY_EMAIL", "CONFIGURE_TOTP"].map(action => ({
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
        code: "code",
        "identityProviderContext.username": "username",
        identityProviderDisplayName: "provider",
        "organization.name": "organization",
        "event.date": "date",
        "event.ipAddress": "ipAddress",
        "linkExpirationFormatter(linkExpiration)": "expiry",
        "properties.TAILCLOAKIFY_EMAIL_LOGO": "logo",
        "properties.TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE_URL": "background",
        "properties.TAILCLOAKIFY_EMAIL_FONT_FAMILY": "font",
        "properties.TAILCLOAKIFY_EMAIL_CONTACT": "contact"
    };
    const conditions = {
        "(requiredActions![])?seq_contains('UPDATE_PASSWORD') && (requiredActions![])?seq_contains('UPDATE_PROFILE')":
            "welcome",
        "(requiredActions![])?size gt 0": "hasActions",
        "firstName?? && lastName??": "named",
        "properties.TAILCLOAKIFY_EMAIL_CONTACT?? && properties.TAILCLOAKIFY_EMAIL_CONTACT?has_content":
            "hasContact"
    };
    const stack = [];
    const template = source
        .replace(
            "<#list (requiredActions![]) as r><li>${msg('requiredAction.' + r)}</li></#list>",
            "{{#actions}}<li>{{label}}</li>{{/actions}}"
        )
        .replace(/<\/?#(?:if|else)\b[^>]*>/g, directive => {
            if (directive.startsWith("<#if ")) {
                const condition = directive.slice(5, -1).trim();
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
            const name = expressions[expression];
            if (!name)
                throw new Error(`Unsupported email preview expression: ${expression}`);
            return `{{${name}}}`;
        });
    if (stack.length || /<\/?#/.test(template)) {
        throw new Error("Unsupported or unbalanced FreeMarker in email preview");
    }
    return Mustache.render(
        template,
        values,
        {},
        plainText ? { escape: value => String(value) } : undefined
    );
}
