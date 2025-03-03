import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../../../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "email-confirmation-error.ftl" });

const meta = {
    title: "login/plugins/p2-inc/keycloak-magic-link/email-confirmation-error.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};