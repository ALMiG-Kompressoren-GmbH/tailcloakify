import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../../../EmailPreview";

const meta = {
    title: "emails/plugins/keycloak-magic-link/magic-link-continuation-email.ftl",
    ...createEmailStoryMeta("magic-link-continuation-email")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
