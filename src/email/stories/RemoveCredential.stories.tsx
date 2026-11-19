import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/event-remove_credential.ftl",
    ...createEmailStoryMeta("event-remove_credential", [
        "default",
        "unknown-credential",
        "no-contact",
        "no-branding",
        "long-content"
    ])
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const UnknownCredential: Story = { args: { scenario: "unknown-credential" } };
