import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/email-test.ftl",
    ...createEmailStoryMeta("email-test")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
