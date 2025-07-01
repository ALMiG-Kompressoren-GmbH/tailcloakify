import type { DeepPartial } from "keycloakify/tools/DeepPartial";
import type { KcContext } from "./KcContext";
import KcPage from "./KcPage";
import { createGetKcContextMock } from "keycloakify/login/KcContext";
import type { KcContextExtension, KcContextExtensionPerPage } from "./KcContext";
import { themeNames, kcEnvDefaults } from "../kc.gen";

const kcContextExtension: KcContextExtension = {
    themeName: themeNames[0],
    properties: {
        ...kcEnvDefaults
    }
};

const { getKcContextMock: getKcContextMock_base } = createGetKcContextMock({
    kcContextExtension,
    kcContextExtensionPerPage: {},
    overrides: {},
    overridesPerPage: {}
});

const kcContextExtensionPerPage: KcContextExtensionPerPage = {
    // 👉 P2-INC => Magic Link Extension
    "otp-form.ftl": {
        auth: {
            attemptedUsername: "user@user.com"
        },
        url: {
            loginRestartFlowUrl: "#",
            loginAction: "#"
        }
    },
    "email-confirmation.ftl": {
        magicLinkContinuation: {
            sameBrowser: true,
            url: "#"
        }
    },
    "email-confirmation-error.ftl": {},
    "view-email.ftl": {
        auth: {
            attemptedUsername: "user@user.com"
        }
    },
    "view-email-continuation.ftl": {
        auth: {
            attemptedUsername: "user@user.com"
        }
    },
    // 👉 P2-INC => Orgs Extension
    "invitations.ftl": {
        invitations: {
            orgs: [{ id: 'test', displayName: 'test' }]
        }
    },
    // 👉 Social providers on register page
    "register.ftl": {
        social: getKcContextMock_base({ pageId: "login.ftl" }).social
    }
};

export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtension,
    kcContextExtensionPerPage,
    overrides: {},
    overridesPerPage: {}
});

export function createKcPageStory<PageId extends KcContext["pageId"]>(params: {
    pageId: PageId;
}) {
    const { pageId } = params;

    function KcPageStory(props: {
        kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
    }) {
        const { kcContext: overrides } = props;

        const kcContextMock = getKcContextMock({
            pageId,
            overrides
        });

        return <KcPage kcContext={kcContextMock} />;
    }

    return { KcPageStory };
}
