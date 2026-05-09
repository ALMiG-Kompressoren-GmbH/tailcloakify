import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../../../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "account-chooser.ftl" });

const meta = {
    title: "login/plugins/corespeed-io/keycloak-account-chooser/account-chooser.ftl",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                chosenUser: {
                    username: "alice",
                    firstName: "Alice",
                    lastName: "Anderson",
                    email: "alice@example.com",
                },
            }}
        />
    ),
};

export const NoEmail: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                chosenUser: {
                    username: "alice",
                    firstName: "Alice",
                },
            }}
        />
    ),
};

export const EmailOnly: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                chosenUser: {
                    username: "alice@example.com",
                    email: "alice@example.com",
                },
            }}
        />
    ),
};
