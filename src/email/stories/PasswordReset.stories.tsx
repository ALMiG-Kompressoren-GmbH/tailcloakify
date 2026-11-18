import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/password-reset.ftl",
    ...createEmailStoryMeta("password-reset")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
