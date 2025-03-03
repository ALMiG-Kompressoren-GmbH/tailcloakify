import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../../../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "view-email-continuation.ftl" });

const meta = {
    title: "login/plugins/p2-inc/keycloak-magic-link/view-email-continuation.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};