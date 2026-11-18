import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/otp-email.ftl",
    ...createEmailStoryMeta("otp-email")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
