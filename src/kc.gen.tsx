// This file is auto-generated by the `update-kc-gen` command. Do not edit it manually.
// Hash: 82af859cac09b2dda6f2cb56f52745ab99e214e2edde99d7c502b11dcff3ac31

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import { lazy, Suspense, type ReactNode } from "react";

export type ThemeName = "Tailcloakify";

export const themeNames: ThemeName[] = ["Tailcloakify"];

export type KcEnvName =
    | "TAILCLOAKIFY_ADDITIONAL_SCRIPTS"
    | "TAILCLOAKIFY_BACKGROUND_LOGO_URL"
    | "TAILCLOAKIFY_BACKGROUND_VIDEO_URL"
    | "TAILCLOAKIFY_FOOTER_IMPRINT_URL"
    | "TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL"
    | "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT"
    | "TAILCLOAKIFY_FAVICON_URL";

export const kcEnvNames: KcEnvName[] = [
    "TAILCLOAKIFY_ADDITIONAL_SCRIPTS",
    "TAILCLOAKIFY_BACKGROUND_LOGO_URL",
    "TAILCLOAKIFY_BACKGROUND_VIDEO_URL",
    "TAILCLOAKIFY_FOOTER_IMPRINT_URL",
    "TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL",
    "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT",
    "TAILCLOAKIFY_FAVICON_URL"
];

export const kcEnvDefaults: Record<KcEnvName, string> = {
    TAILCLOAKIFY_ADDITIONAL_SCRIPTS: "",
    TAILCLOAKIFY_BACKGROUND_LOGO_URL: "",
    TAILCLOAKIFY_BACKGROUND_VIDEO_URL: "",
    TAILCLOAKIFY_FOOTER_IMPRINT_URL: "",
    TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL: "",
    TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT: "",
    TAILCLOAKIFY_FAVICON_URL: ""
};

/**
 * NOTE: Do not import this type except maybe in your entrypoint.
 * If you need to import the KcContext import it either from src/login/KcContext.ts or src/account/KcContext.ts.
 * Depending on the theme type you are working on.
 */
export type KcContext = import("./login/KcContext").KcContext;

declare global {
    interface Window {
        kcContext?: KcContext;
    }
}

export const KcLoginPage = lazy(() => import("./login/KcPage"));

export function KcPage(props: { kcContext: KcContext; fallback?: ReactNode }) {
    const { kcContext, fallback } = props;
    return (
        <Suspense fallback={fallback}>
            {(() => {
                switch (kcContext.themeType) {
                    case "login":
                        return <KcLoginPage kcContext={kcContext} />;
                }
            })()}
        </Suspense>
    );
}
