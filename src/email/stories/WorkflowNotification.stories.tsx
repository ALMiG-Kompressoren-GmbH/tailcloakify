import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/workflow-notification.ftl",
    ...createEmailStoryMeta("workflow-notification", [
        "default",
        "disable",
        "delete",
        "custom-message",
        "no-deadline",
        "no-contact",
        "no-branding",
        "long-content"
    ])
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disable: Story = { args: { scenario: "disable" } };
export const Delete: Story = { args: { scenario: "delete" } };
export const CustomMessage: Story = { args: { scenario: "custom-message" } };
export const NoDeadline: Story = { args: { scenario: "no-deadline" } };
