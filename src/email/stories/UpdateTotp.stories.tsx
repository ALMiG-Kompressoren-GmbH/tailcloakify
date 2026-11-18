import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/event-update_totp.ftl",
    ...createEmailStoryMeta("event-update_totp")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
