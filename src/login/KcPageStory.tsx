import { createContext, useContext } from "react";
import type { Decorator } from "@storybook/react";
import { useArgs, useChannel, useRef } from "storybook/preview-api";
import { STORY_ARGS_UPDATED } from "storybook/internal/core-events";
import { buildArgsParam } from "storybook/internal/router";
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

const loginStoryLanguageTags = ["en", "de", "fr", "it", "es", "cs", "nl", "pl", "ru", "sv"];

export const loginStoryLanguages = getKcContextMock({ pageId: "login.ftl" }).locale!.supported
    .filter(language => loginStoryLanguageTags.includes(language.languageTag))
    .sort((first, second) => loginStoryLanguageTags.indexOf(first.languageTag) - loginStoryLanguageTags.indexOf(second.languageTag));

const StoryLocaleContext = createContext<{
    locale: string;
    setLocale: (locale: string) => void;
} | undefined>(undefined);

export const LoginLocaleDecorator: Decorator = (Story, context) => {
    const [args, updateArgs] = useArgs();
    const initialLocale = useRef(args.locale);
    useChannel({
        [STORY_ARGS_UPDATED]: ({ storyId, args: updatedArgs }) => {
            if (storyId !== context.id || !context.title.startsWith("login/") || updatedArgs.locale === initialLocale.current) {
                return;
            }
            const url = new URL(window.location.href);
            url.searchParams.set("args", buildArgsParam(context.initialArgs, updatedArgs));
            window.history.replaceState(window.history.state, "", url);
            window.location.reload();
        }
    });

    if (!context.title.startsWith("login/")) {
        return <Story />;
    }

    const locale = loginStoryLanguages.some(language => language.languageTag === args.locale)
        ? String(args.locale)
        : "en";

    return (
        <StoryLocaleContext.Provider value={{ locale, setLocale: locale => updateArgs({ locale }) }}>
            <Story />
        </StoryLocaleContext.Provider>
    );
};

export function createKcPageStory<PageId extends KcContext["pageId"]>(params: {
    pageId: PageId;
}) {
    const { pageId } = params;

    function KcPageStory(props: {
        kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
    }) {
        const { kcContext: overrides } = props;
        const storyLocale = useContext(StoryLocaleContext);

        const kcContextMock = getKcContextMock({
            pageId,
            overrides
        });

        if (storyLocale !== undefined && kcContextMock.locale !== undefined) {
            kcContextMock.locale.currentLanguageTag = storyLocale.locale;
            kcContextMock.locale.supported = loginStoryLanguages.filter(language =>
                kcContextMock.locale?.supported.some(supported => supported.languageTag === language.languageTag)
            ).map(language => ({
                ...language,
                url: `#storybook-locale-${language.languageTag}`
            }));
        }

        return (
            <div onClick={event => {
                if (storyLocale === undefined || !(event.target instanceof Element)) {
                    return;
                }
                const link = event.target.closest("#kc-locale a[href]");
                const language = kcContextMock.locale?.supported.find(language => language.url === link?.getAttribute("href"));
                if (language === undefined) {
                    return;
                }
                event.preventDefault();
                storyLocale.setLocale(language.languageTag);
            }}>
                <KcPage kcContext={kcContextMock} />
            </div>
        );
    }

    return { KcPageStory };
}
