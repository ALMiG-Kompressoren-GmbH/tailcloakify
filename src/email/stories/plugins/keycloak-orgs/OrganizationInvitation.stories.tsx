import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../../../EmailPreview";

const meta = {
    title: "emails/plugins/keycloak-orgs/invitation-email.ftl",
    ...createEmailStoryMeta("invitation-email", [
        "default",
        "no-inviter",
        "no-link",
        "no-contact",
        "no-branding",
        "long-content"
    ])
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const NoInviter: Story = { args: { scenario: "no-inviter" } };
export const NoLink: Story = { args: { scenario: "no-link" } };
