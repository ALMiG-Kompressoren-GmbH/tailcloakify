import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/event-update_password.ftl",
    ...createEmailStoryMeta("event-update_password")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
