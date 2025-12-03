import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import { buildEmailTheme } from "keycloakify-emails"
import path, { dirname } from "node:path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            themeName: "Tailcloakify",
            environmentVariables: [
                { name: "styles", default: "" },
                { name: "scripts", default: "" },
                { name: "meta", default: "" },
                { name: "TAILCLOAKIFY_ADDITIONAL_SCRIPTS", default: "" },
                { name: "TAILCLOAKIFY_ADDITIONAL_STYLES", default: "" },
                { name: "TAILCLOAKIFY_ADDITIONAL_META", default: "" },
                { name: "TAILCLOAKIFY_HIDE_LOGIN_FORM", default: "" },
                { name: "TAILCLOAKIFY_BACKGROUND_LOGO_URL", default: "" },
                { name: "TAILCLOAKIFY_BACKGROUND_IMAGE_URL", default: "" },
                { name: "TAILCLOAKIFY_BACKGROUND_VIDEO_URL", default: "" },
                { name: "TAILCLOAKIFY_HEADER_LOGO_URL", default: "" },
                { name: "TAILCLOAKIFY_FAVICON_URL", default: "" },
                { name: "TAILCLOAKIFY_FOOTER_IMPRINT_URL", default: "" },
                { name: "TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL", default: "" },
                { name: "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT", default: "" },
                { name: "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT_GOOGLE_CAPTCHA", default: "TRUE" },
                { name: "TAILCLOAKIFY_SHOW_SOCIAL_PROVIDERS_ON_REGISTER", default: "" },
                { name: "TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE_URL", default: "" },
                { name: "TAILCLOAKIFY_EMAIL_LOGO", default: "" },
                { name: "TAILCLOAKIFY_EMAIL_FONT_FAMILY", default: "" },
                { name: "TAILCLOAKIFY_EMAIL_CONTACT", default: "" },
            ],
            kcContextExclusionsFtl: [
                '<@addToXKeycloakifyMessagesIfMessageKey str="backgroundLogoUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="backgroundImageUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="backgroundVideoUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="headerLogoUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="faviconUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="footerImprintUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="footerDataprotectionUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="showSocialProvidersOnRegister" />',
            ].join(".\n"),
            startKeycloakOptions: {
                dockerImage: "quay.io/phasetwo/phasetwo-keycloak:26.3.2",
                keycloakExtraArgs: [
                    "--spi-email-template-provider=freemarker-plus-mustache",
                    "--spi-email-template-freemarker-plus-mustache-enabled=true",
                    "--spi-theme-cache-themes=false"
                ],
                extensionJars: [
                    "https://repo1.maven.org/maven2/io/phasetwo/keycloak/keycloak-magic-link/0.34/keycloak-magic-link-0.34.jar"
                ],
            },
            postBuild: async (buildContext) => {
                await buildEmailTheme({
                    templatesSrcDirPath: path.join(
                        buildContext.themeSrcDirPath,
                        "email",
                        "templates",
                    ),
                    i18nSourceFile: path.join(
                        buildContext.themeSrcDirPath,
                        "email",
                        "i18n.ts",
                    ),
                    themeNames: buildContext.themeNames,
                    keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
                    locales: ["en", "cs", "de", "es", "fr", "it","ru"],
                    cwd: __dirname,
                    environmentVariables: buildContext.environmentVariables,
                    esbuild: {},
                });
            },
        })
    ],
});
