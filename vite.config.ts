import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

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
                { name: "TAILCLOAKIFY_BACKGROUND_LOGO_URL", default: "" },
                { name: "TAILCLOAKIFY_BACKGROUND_VIDEO_URL", default: "" },
                { name: "TAILCLOAKIFY_FAVICON_URL", default: "" },
                { name: "TAILCLOAKIFY_FOOTER_IMPRINT_URL", default: "" },
                { name: "TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL", default: "" },
                { name: "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT", default: "" },
            ],
            kcContextExclusionsFtl: [
                '<@addToXKeycloakifyMessagesIfMessageKey str="footerImprintUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="footerDataprotectionUrl" />',
            ].join(".\n")
        })
    ]
});
