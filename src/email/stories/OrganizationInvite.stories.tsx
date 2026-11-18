import type { Meta, StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/org-invite.ftl",
    ...createEmailStoryMeta("org-invite", ["default", "anonymous", "no-contact"])
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
