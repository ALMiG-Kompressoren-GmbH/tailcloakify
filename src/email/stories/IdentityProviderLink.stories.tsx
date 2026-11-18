import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/identity-provider-link.ftl",
    ...createEmailStoryMeta("identity-provider-link")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
