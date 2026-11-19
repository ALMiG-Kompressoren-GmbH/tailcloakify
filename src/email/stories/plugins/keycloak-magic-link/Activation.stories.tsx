import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../../../EmailPreview";

const meta = {
    title: "emails/plugins/keycloak-magic-link/activation-email.ftl",
    ...createEmailStoryMeta("activation-email")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
