import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/email-verification.ftl",
    ...createEmailStoryMeta("email-verification")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const NoBranding: Story = { args: { scenario: "no-branding" } };
export const LongContent: Story = { args: { scenario: "long-content" } };
