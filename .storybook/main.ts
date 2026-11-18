import type { StorybookConfig } from "@storybook/react-vite";
import { emailPreviewPlugin } from "./email-preview-plugin.mjs";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: ["@chromatic-com/storybook"],

    framework: {
        name: "@storybook/react-vite",
        options: {}
    },

    staticDirs: ["../public"],

    async viteFinal(config) {
        config.plugins = [...(config.plugins ?? []), emailPreviewPlugin()];
        return config;
    },

    docs: {},

    typescript: {
        reactDocgen: "react-docgen-typescript"
    }
};
export default config;
