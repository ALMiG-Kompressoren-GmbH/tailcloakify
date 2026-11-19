import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/event-user_disabled_by_permanent_lockout.ftl",
    ...createEmailStoryMeta("event-user_disabled_by_permanent_lockout")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
