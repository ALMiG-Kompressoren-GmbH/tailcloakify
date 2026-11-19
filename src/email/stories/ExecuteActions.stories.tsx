import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const requiredActions = [
    "UPDATE_PASSWORD",
    "UPDATE_PROFILE",
    "VERIFY_PROFILE",
    "VERIFY_EMAIL",
    "UPDATE_EMAIL",
    "CONFIGURE_TOTP",
    "CONFIGURE_RECOVERY_AUTHN_CODES",
    "TERMS_AND_CONDITIONS",
    "webauthn-register",
    "webauthn-register-passwordless",
    "update_user_locale",
    "delete_account",
    "delete_credential",
    "idp_link",
    "verifiable_credential_offer",
    "invitation-required-action"
];
const base = createEmailStoryMeta("executeActions", [
    "default",
    "admin",
    "no-actions",
    "no-contact",
    "no-branding",
    "long-content"
]);

const meta = {
    title: "emails/executeActions.ftl",
    ...base,
    args: { ...base.args, requiredActions: ["UPDATE_PASSWORD", "UPDATE_PROFILE"] },
    argTypes: {
        ...base.argTypes,
        requiredActions: {
            table: { disable: false },
            control: {
                type: "multi-select" as const,
                labels: Object.fromEntries(
                    requiredActions.map(action => [
                        action,
                        `${action} (${action === "invitation-required-action" ? "keycloak-orgs" : "Keycloak"})`
                    ])
                )
            },
            options: requiredActions
        }
    }
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Admin: Story = {
    args: { scenario: "admin", requiredActions: ["VERIFY_EMAIL", "CONFIGURE_TOTP"] }
};
export const NoActions: Story = {
    args: { scenario: "no-actions", requiredActions: [] }
};
export const OrganizationInvitation: Story = {
    args: { requiredActions: ["invitation-required-action"] }
};
