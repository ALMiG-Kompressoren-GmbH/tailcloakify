import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/event-login_error.ftl",
    ...createEmailStoryMeta("event-login_error")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
