import type { StoryObj } from "@storybook/react-vite";
import { createEmailStoryMeta } from "../EmailPreview";

const meta = {
    title: "emails/email-test.ftl",
    ...createEmailStoryMeta("email-test", [
        "default",
        "no-contact",
        "no-branding",
        "long-content",
        "white-background",
        "gradient-orange"
    ])
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WhiteBackground: Story = { args: { scenario: "white-background" } };
export const GradientOrange: Story = { args: { scenario: "gradient-orange" } };
