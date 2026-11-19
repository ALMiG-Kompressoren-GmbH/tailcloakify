import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/verifiable-credential-offer.ftl",
    ...createEmailStoryMeta("verifiable-credential-offer")
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const LongContent: Story = { args: { scenario: "long-content" } };
