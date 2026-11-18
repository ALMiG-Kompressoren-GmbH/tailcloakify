import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/magic-link-email.ftl",
    ...createEmailStoryMeta("magic-link-email")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
