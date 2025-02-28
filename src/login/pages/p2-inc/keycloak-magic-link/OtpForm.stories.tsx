import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../../../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "otp-form.ftl" });

const meta = {
    title: "login/plugins/p2-inc/keycloak-magic-link/otp-form.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

/**
 * WithOtpError:
 * - Purpose: Tests the behavior when an error occurs with the OTP field (e.g., invalid OTP code).
 * - Scenario: Simulates an invalid OTP code scenario where an error message is displayed.
 * - Key Aspect: Ensures that the OTP input displays error messages correctly and the error is visible.
 */
export const WithOtpError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                url: {
                    loginAction: "/mock-login-action"
                },
                messagesPerField: {
                    existsError: (field: string) => field === "totp",
                    get: () => "Invalid access code"
                }
            }}
        />
    )
};