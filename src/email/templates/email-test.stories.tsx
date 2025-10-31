import { Meta, StoryObj } from "@storybook/react";
import { previewProps, Template } from "./email-test.tsx";

const meta = {
    title: "email/email-test.ftl",
    component: Template
} satisfies Meta<typeof Template>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { ...previewProps }
};
