import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../../../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "invitations.ftl" });

const meta = {
    title: "login/plugins/p2-inc/keycloak-orgs/invitations.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};