import type { Preview } from "@storybook/react";
import { LoginLocaleDecorator, loginStoryLanguages } from "../src/login/KcPageStory";

const preview: Preview = {
    decorators: [LoginLocaleDecorator],
    args: { locale: "en" },
    argTypes: {
        locale: {
            name: "Language",
            control: {
                type: "select",
                labels: Object.fromEntries(loginStoryLanguages.map(language => [language.languageTag, language.label]))
            },
            options: loginStoryLanguages.map(language => language.languageTag)
        }
    },
    parameters: {
        options: {
            storySort: {
                order: ["login", ["login.ftl", ["Default"]], "*"]
            }
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
};

export default preview;
