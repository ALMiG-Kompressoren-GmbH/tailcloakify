import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/email-verification-with-code.ftl",
    ...createEmailStoryMeta("email-verification-with-code")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
