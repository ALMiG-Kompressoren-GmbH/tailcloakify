import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/email-update-confirmation.ftl",
    ...createEmailStoryMeta("email-update-confirmation")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
