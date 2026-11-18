import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/executeActions.ftl",
    ...createEmailStoryMeta("executeActions", [
        "default",
        "admin",
        "no-actions",
        "no-contact"
    ])
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
