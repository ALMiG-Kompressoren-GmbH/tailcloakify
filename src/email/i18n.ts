import { GetMessages } from "keycloakify-emails";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import esTranslation from "./locales/es/translation.json";
import deTranslation from "./locales/de/translation.json";
import ruTranslation from "./locales/ru/translation.json";
import czTranslation from "./locales/cs/translation.json";
import frTranslation from "./locales/fr/translation.json";
import itTranslation from "./locales/it/translation.json";
import ICU from "i18next-icu";

const resources = {
    en: {
        translation: enTranslation
    },
    es: {
        translation: esTranslation
    },
    de: {
        translation: deTranslation
    },
    ru: {
        translation: ruTranslation
    },
    cs: {
        translation: czTranslation
    },
    fr: {
        translation: frTranslation
    },
    it: {
        translation: itTranslation
    }
};

if (!i18n.isInitialized) {
    i18n.use(ICU)
        .use(initReactI18next)
        .init({
            resources,
            fallbackLng: "en",
            debug: true,
            interpolation: { escapeValue: false }
        });
}

export default i18n;

export const getMessages: GetMessages = props => {
    const t = i18n.getFixedT(props.locale);
    const message = (key: string, values: Record<string, string> = {}) =>
        t(key, values).replace(/'/g, "''");
    return {
        magicLinkSubject: message("magic-link-email.messageSubject", {
            realmName: "{0}"
        }),
        magicLinkContinuationSubject: message("magicLinkContinuation.subject", {
            realmName: "{0}"
        }),
        otpSubject: message("otpEmail.messageSubject", { realmName: "{0}" }),
        otpSubjectWithCode:
            "{2} " + message("otpEmail.messageSubject", { realmName: "{0}" }),
        accountNotificationSubject: message("workflowNotification.subject"),
        accountDisableNotificationSubject: message("workflowNotification.disableSubject"),
        accountDeleteNotificationSubject: message("workflowNotification.deleteSubject"),
        accountNotificationBody: message("workflowNotification.body"),
        accountDisableNotificationBody: message("workflowNotification.disableBody", {
            days: "{0}",
            reason: "{1}"
        }),
        accountDeleteNotificationBody: message("workflowNotification.deleteBody", {
            days: "{0}",
            reason: "{1}"
        }),
        accountNotificationGreeting: message("workflowNotification.greeting", {
            name: "{0}"
        }),
        accountNotificationTimeRemaining: message("workflowNotification.timeRemaining", {
            days: "{0}"
        }),
        accountNotificationQuestions: message("workflowNotification.questions", {
            realmName: "{0}"
        }),
        accountNotificationSignatureFrom: message("workflowNotification.signature", {
            realmName: "{0}"
        }),
        "requiredAction.CONFIGURE_TOTP": t("execute-actions.configureTOTP"),
        "requiredAction.UPDATE_PASSWORD": t("execute-actions.updatePassword"),
        "requiredAction.UPDATE_PROFILE": t("execute-actions.updateProfile"),
        "requiredAction.VERIFY_PROFILE": t("execute-actions.verifyProfile"),
        "requiredAction.VERIFY_EMAIL": t("execute-actions.verifyEmail"),
        "requiredAction.UPDATE_EMAIL": t("execute-actions.updateEmail"),
        "requiredAction.TERMS_AND_CONDITIONS": t("execute-actions.termsAndConditions"),
        "requiredAction.delete_account": t("execute-actions.deleteAccount"),
        "requiredAction.verifiable_credential_offer": t(
            "execute-actions.verifiableCredentialOffer"
        ),
        "requiredAction.CONFIGURE_RECOVERY_AUTHN_CODES": t(
            "execute-actions.recoveryAuthenticationCodes"
        ),
        "requiredAction.LINKING_IDP": t("execute-actions.linkingIdentityProvider"),
        "requiredAction.idp_link": t("execute-actions.linkingIdentityProvider"),
        "requiredAction.webauthn-register": t("execute-actions.webAuthnRegister"),
        "requiredAction.webauthn-register-passwordless": t(
            "execute-actions.webAuthnRegisterPasswordless"
        ),
        "requiredAction.delete_credential": t("execute-actions.deleteCredential"),
        "requiredAction.recovery-authn-codes": t(
            "execute-actions.recoveryAuthenticationCodes"
        ),
        "requiredAction.update_user_locale": t("execute-actions.updateUserLocale"),
        "requiredAction.invitation-required-action": t("execute-actions.invitation"),

        "requiredAction.DEFAULT": t("execute-actions.welcome")
    };
};
