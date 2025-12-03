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
    cs : {
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
        interpolation: { escapeValue: false },
    });
}

export default i18n;

export const getMessages: GetMessages = props => {
    const t = i18n.getFixedT(props.locale);
    return {
        "requiredAction.CONFIGURE_TOTP": t('execute-actions.configureTOTP'),
        "requiredAction.UPDATE_PASSWORD": t('execute-actions.updatePassword'),
        "requiredAction.UPDATE_PROFILE": t('execute-actions.updateProfile'),
        "requiredAction.VERIFY_EMAIL": t('execute-actions.verifyEmail'),
        "requiredAction.CONFIGURE_RECOVERY_AUTHN_CODES": t('execute-actions.recoveryAuthenticationCodes'),
        "requiredAction.LINKING_IDP": t('execute-actions.linkingIdentityProvider'),
        "requiredAction.webauthn-register": t('execute-actions.webAuthnRegister'),
        "requiredAction.webauthn-register-passwordless": t('execute-actions.webAuthnRegisterPasswordless'),
        "requiredAction.delete_credential": t('execute-actions.deleteCredential'),
        "requiredAction.recovery-authn-codes": t('execute-actions.recoveryAuthenticationCodes'),
        "requiredAction.update_user_locale": t('execute-actions.updateUserLocale'),
        "requiredAction.invitation-required-action": t('execute-actions.invitation'),

        "requiredAction.DEFAULT": t('execute-actions.welcome'),
    }
};
