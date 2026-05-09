/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ExtendKcContext } from "keycloakify/login";
import type { KcEnvName, ThemeName } from "../kc.gen";

export type KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
    // NOTE: Here you can declare more properties to extend the KcContext
    // See: https://docs.keycloakify.dev/faq-and-help/some-values-you-need-are-missing-from-in-kccontext
    captchaRequired: boolean;
    captchaSiteKey: string;
    captchaAction: string;
    captchaLanguage: string;
};

// MCP Server info type - exported for reuse
export type McpServerInfo = {
    slug: string;
    name: string;
    pricing?: number;  // Cost per request in USD
};

export type KcContextExtensionPerPage = {
    // 👉 Payment Plugin Extension
    "payment-required.ftl": {
        checkoutUrl: string;
    };
    // 👉 P2-INC => Magic Link Extension
    "otp-form.ftl": {
        auth: {
            attemptedUsername: string;
        };
        url: {
            loginRestartFlowUrl: string;
            loginAction: string;
        };
    };
    "email-confirmation.ftl": {
        magicLinkContinuation: {
            sameBrowser: boolean;
            url: string;
        };
    };
    "email-confirmation-error.ftl": {};
    "view-email.ftl": {
        auth: {
            attemptedUsername: string;
        };
    };
    "view-email-continuation.ftl": {
        auth: {
            attemptedUsername: string;
        };
    };
    // 👉 P2-INC => Orgs Extension
    "invitations.ftl": {
        invitations: {
            orgs: {
                id: string;
                displayName: string;
            }[]
        }
    };
    // 👉 Social providers on register page
    "register.ftl": {
        social: import("keycloakify/login/KcContext").KcContext.Login["social"];
    };
    // 👉 MCP Server info for OAuth consent page
    "login-oauth-grant.ftl": {
        mcpServers?: Record<string, McpServerInfo>;
    };
    // 👉 CoreSpeed => Account Chooser Extension
    "account-chooser.ftl": {
        chosenUser: {
            username: string;
            firstName?: string;
            lastName?: string;
            email?: string;
        };
    };
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
