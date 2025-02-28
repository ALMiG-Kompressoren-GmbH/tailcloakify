import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/i18n */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            footerImprintTitle: "Imprint",
            footerDataProtectionTitle: "Data Protection",
            footerCookiePreferencesTitle: "Cookie Preferences",
            doResend: "Resend",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Please Input your One-time code",
        },
        de: {
            footerImprintTitle: "Impressum",
            footerDataProtectionTitle: "Datenschutz",
            footerCookiePreferencesTitle: "Cookie Einstellungen",
            doResend: "Erneut Senden",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Bitte geben Sie Ihren Einmalcode",
        },
        fr: {
            footerImprintTitle: "Mentions Légales",
            footerDataProtectionTitle: "Protection des Données",
            footerCookiePreferencesTitle: "Paramètres des Cookies",
            doResend: "Renvoyer",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Veuillez saisir votre Code à usage unique",
        },
        it: {
            footerImprintTitle: "Impronta",
            footerDataProtectionTitle: "Informativa sulla Privacy",
            footerCookiePreferencesTitle: "Impostazioni dei Cookie",
            doResend: "Invia di nuovo",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Si prega di inserire il tuo one-time password",
        },
        es: {
            footerImprintTitle: "Aviso Legal",
            footerDataProtectionTitle: "Protección de Datos",
            footerCookiePreferencesTitle: "Preferencias de Cookies",
            doResend: "Reenviar",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Por favor ingrese su Código de un solo uso",
        },
        cs: {
            footerImprintTitle: "Tiráž",
            footerDataProtectionTitle: "Ochrana Osobních Údajů",
            footerCookiePreferencesTitle: "Nastavení Cookies",
            doResend: "Znovu odeslat",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Zadejte prosím svůj jednorázový kód",
        },
        nl: {
            footerImprintTitle: "Colofon",
            footerDataProtectionTitle: "Gegevensbescherming",
            footerCookiePreferencesTitle: "Cookievoorkeuren",
            doResend: "Opnieuw verzenden",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Voer uw eenmalige code in",
        },
        pl: {
            footerImprintTitle: "Nota Prawna",
            footerDataProtectionTitle: "Ochrona Danych",
            footerCookiePreferencesTitle: "Preferencje Plików Cookie",
            doResend: "Wyślij ponownie",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Proszę wpisać kod jednorazowy",
        },
        ru: {
            footerImprintTitle: "Выходные Данные",
            footerDataProtectionTitle: "Защита Данных",
            footerCookiePreferencesTitle: "Настройки Файлов Cookie",
            doResend: "Отправить снова",
            p2incMagicLinkOtpFormTitle: "емейл OTP",
            loginOtpOneTimeLabel: "Пожалуйста, введите свой одноразовый код",
        },
        sv: {
            footerImprintTitle: "Impressum",
            footerDataProtectionTitle: "Dataskydd",
            footerCookiePreferencesTitle: "Cookie-inställningar",
            doResend: "Skicka igen",
            p2incMagicLinkOtpFormTitle: "E-post OTP",
            loginOtpOneTimeLabel: "Vänligen ange din engångskod",
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
