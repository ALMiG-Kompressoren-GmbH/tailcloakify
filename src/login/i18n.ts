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
        },
        de: {
            footerImprintTitle: "Impressum",
            footerDataProtectionTitle: "Datenschutz",
            footerCookiePreferencesTitle: "Cookie Einstellungen",
            doResend: "Erneut Senden",
        },
        fr: {
            footerImprintTitle: "Mentions Légales",
            footerDataProtectionTitle: "Protection des Données",
            footerCookiePreferencesTitle: "Paramètres des Cookies",
            doResend: "Renvoyer",
        },
        it: {
            footerImprintTitle: "Impronta",
            footerDataProtectionTitle: "Informativa sulla Privacy",
            footerCookiePreferencesTitle: "Impostazioni dei Cookie",
            doResend: "Resend",
        },
        es: {
            footerImprintTitle: "Aviso Legal",
            footerDataProtectionTitle: "Protección de Datos",
            footerCookiePreferencesTitle: "Preferencias de Cookies",
            doResend: "Resend",
        },
        cs: {
            footerImprintTitle: "Tiráž",
            footerDataProtectionTitle: "Ochrana Osobních Údajů",
            footerCookiePreferencesTitle: "Nastavení Cookies",
            doResend: "Resend",
        },
        nl: {
            footerImprintTitle: "Colofon",
            footerDataProtectionTitle: "Gegevensbescherming",
            footerCookiePreferencesTitle: "Cookievoorkeuren",
            doResend: "Resend",
        },
        pl: {
            footerImprintTitle: "Nota Prawna",
            footerDataProtectionTitle: "Ochrona Danych",
            footerCookiePreferencesTitle: "Preferencje Plików Cookie",
            doResend: "Resend",
        },
        ru: {
            footerImprintTitle: "Выходные Данные",
            footerDataProtectionTitle: "Защита Данных",
            footerCookiePreferencesTitle: "Настройки Файлов Cookie",
            doResend: "Resend",
        },
        sv: {
            footerImprintTitle: "Impressum",
            footerDataProtectionTitle: "Dataskydd",
            footerCookiePreferencesTitle: "Cookie-inställningar",
            doResend: "Resend",
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
