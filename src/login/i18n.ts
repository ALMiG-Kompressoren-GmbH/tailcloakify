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
            magicLinkConfirmation: "Check your email, and click on the link to log in!",
            magicLinkContinuationConfirmation:
                "Check your email, and click on the link to log in! Please do not close this tab.",
            magicLinkSuccessfulLogin:
                "Authentication session confirmed. Please return to login page tab.",
            magicLinkFailLogin:
                "Authentication session expired. Please close this tab and restart the login flow.",
            loginPage: "Login page",
            multipleSessionsError:
                "Multiple login sessions opened on same browser. Please close it and restart login.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Please Input your One-time code",
        },
        de: {
            footerImprintTitle: "Impressum",
            footerDataProtectionTitle: "Datenschutz",
            footerCookiePreferencesTitle: "Cookie Einstellungen",
            doResend: "Erneut Senden",
            magicLinkConfirmation: "Überprüfen Sie Ihre E-Mails und klicken Sie auf den Link, um sich anzumelden!",
            magicLinkContinuationConfirmation: "Überprüfen Sie Ihre E-Mails und klicken Sie auf den Link, um sich anzumelden! Bitte schließen Sie diesen Tab nicht.",
            magicLinkSuccessfulLogin: "Authentifizierungssitzung bestätigt. Bitte kehren Sie zum Anmeldeseiten-Tab zurück.",
            magicLinkFailLogin: "Authentifizierungssitzung abgelaufen. Bitte schließen Sie diesen Tab und starten Sie den Anmeldevorgang neu.",
            loginPage: "Anmeldeseite",
            multipleSessionsError: "Mehrere Anmeldesitzungen im selben Browser geöffnet. Bitte schließen Sie sie und starten Sie die Anmeldung neu.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Bitte geben Sie Ihren Einmalcode"
        },
        fr: {
            footerImprintTitle: "Mentions Légales",
            footerDataProtectionTitle: "Protection des Données",
            footerCookiePreferencesTitle: "Paramètres des Cookies",
            doResend: "Renvoyer",
            magicLinkConfirmation: "Vérifiez vos e-mails et cliquez sur le lien pour vous connecter !",
            magicLinkContinuationConfirmation: "Vérifiez vos e-mails et cliquez sur le lien pour vous connecter ! Veuillez ne pas fermer cet onglet.",
            magicLinkSuccessfulLogin: "Session d'authentification confirmée. Veuillez retourner à l'onglet de la page de connexion.",
            magicLinkFailLogin: "Session d'authentification expirée. Veuillez fermer cet onglet et relancer le processus de connexion.",
            loginPage: "Page de connexion",
            multipleSessionsError: "Plusieurs sessions de connexion ouvertes dans le même navigateur. Veuillez les fermer et relancer la connexion.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Veuillez saisir votre Code à usage unique"
        },
        it: {
            footerImprintTitle: "Impronta",
            footerDataProtectionTitle: "Informativa sulla Privacy",
            footerCookiePreferencesTitle: "Impostazioni dei Cookie",
            doResend: "Invia di nuovo",
            magicLinkConfirmation: "Controlla la tua email e fai clic sul link per accedere!",
            magicLinkContinuationConfirmation: "Controlla la tua email e fai clic sul link per accedere! Non chiudere questa scheda.",
            magicLinkSuccessfulLogin: "Sessione di autenticazione confermata. Si prega di tornare alla scheda della pagina di accesso.",
            magicLinkFailLogin: "Sessione di autenticazione scaduta. Chiudi questa scheda e riavvia il processo di accesso.",
            loginPage: "Pagina di accesso",
            multipleSessionsError: "Più sessioni di accesso aperte nello stesso browser. Si prega di chiuderle e riavviare l'accesso.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Si prega di inserire il tuo one-time password"
        },
        es: {
            footerImprintTitle: "Aviso Legal",
            footerDataProtectionTitle: "Protección de Datos",
            footerCookiePreferencesTitle: "Preferencias de Cookies",
            doResend: "Reenviar",
            magicLinkConfirmation: "¡Revise su correo electrónico y haga clic en el enlace para iniciar sesión!",
            magicLinkContinuationConfirmation: "¡Revise su correo electrónico y haga clic en el enlace para iniciar sesión! Por favor, no cierre esta pestaña.",
            magicLinkSuccessfulLogin: "Sesión de autenticación confirmada. Por favor, vuelva a la pestaña de la página de inicio de sesión.",
            magicLinkFailLogin: "Sesión de autenticación caducada. Por favor, cierre esta pestaña y reinicie el flujo de inicio de sesión.",
            loginPage: "Página de inicio de sesión",
            multipleSessionsError: "Múltiples sesiones de inicio de sesión abiertas en el mismo navegador. Por favor, ciérrelas y reinicie el inicio de sesión.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Por favor ingrese su Código de un solo uso"
        },
        cs: {
            footerImprintTitle: "Tiráž",
            footerDataProtectionTitle: "Ochrana Osobních Údajů",
            footerCookiePreferencesTitle: "Nastavení Cookies",
            doResend: "Znovu odeslat",
            magicLinkConfirmation: "Zkontrolujte svůj e-mail a klikněte na odkaz pro přihlášení!",
            magicLinkContinuationConfirmation: "Zkontrolujte svůj e-mail a klikněte na odkaz pro přihlášení! Nezavírejte prosím tuto záložku.",
            magicLinkSuccessfulLogin: "Ověřovací relace potvrzena. Vraťte se prosím na záložku přihlašovací stránky.",
            magicLinkFailLogin: "Ověřovací relace vypršela. Zavřete prosím tuto záložku a restartujte přihlašovací proces.",
            loginPage: "Přihlašovací stránka",
            multipleSessionsError: "Více přihlašovacích relací otevřeno ve stejném prohlížeči. Zavřete je prosím a restartujte přihlášení.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Zadejte prosím svůj jednorázový kód"
        },
        nl: {
            footerImprintTitle: "Colofon",
            footerDataProtectionTitle: "Gegevensbescherming",
            footerCookiePreferencesTitle: "Cookievoorkeuren",
            doResend: "Opnieuw verzenden",
            magicLinkConfirmation: "Controleer je e-mail en klik op de link om in te loggen!",
            magicLinkContinuationConfirmation: "Controleer je e-mail en klik op de link om in te loggen! Sluit dit tabblad niet.",
            magicLinkSuccessfulLogin: "Authenticatiesessie bevestigd. Ga terug naar het tabblad van de loginpagina.",
            magicLinkFailLogin: "Authenticatiesessie verlopen. Sluit dit tabblad en start de loginprocedure opnieuw.",
            loginPage: "Loginpagina",
            multipleSessionsError: "Meerdere loginsessies geopend in dezelfde browser. Sluit deze en start de login opnieuw.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Voer uw eenmalige code in"
        },
        pl: {
            footerImprintTitle: "Nota Prawna",
            footerDataProtectionTitle: "Ochrona Danych",
            footerCookiePreferencesTitle: "Preferencje Plików Cookie",
            doResend: "Wyślij ponownie",
            magicLinkConfirmation: "Sprawdź swoją pocztę e-mail i kliknij link, aby się zalogować!",
            magicLinkContinuationConfirmation: "Sprawdź swoją pocztę e-mail i kliknij link, aby się zalogować! Nie zamykaj tej karty.",
            magicLinkSuccessfulLogin: "Sesja uwierzytelniania potwierdzona. Wróć do karty strony logowania.",
            magicLinkFailLogin: "Sesja uwierzytelniania wygasła. Zamknij tę kartę i uruchom ponownie proces logowania.",
            loginPage: "Strona logowania",
            multipleSessionsError: "W tej samej przeglądarce otwarto wiele sesji logowania. Zamknij je i uruchom ponownie logowanie.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Proszę wpisać kod jednorazowy"
        },
        ru: {
            footerImprintTitle: "Выходные Данные",
            footerDataProtectionTitle: "Защита Данных",
            footerCookiePreferencesTitle: "Настройки Файлов Cookie",
            doResend: "Отправить снова",
            magicLinkConfirmation: "Проверьте свою электронную почту и нажмите на ссылку для входа!",
            magicLinkContinuationConfirmation: "Проверьте свою электронную почту и нажмите на ссылку для входа! Пожалуйста, не закрывайте эту вкладку.",
            magicLinkSuccessfulLogin: "Сессия аутентификации подтверждена. Вернитесь на вкладку страницы входа.",
            magicLinkFailLogin: "Срок действия сессии аутентификации истек. Закройте эту вкладку и перезапустите процесс входа.",
            loginPage: "Страница входа",
            multipleSessionsError: "Несколько сеансов входа открыты в одном браузере. Закройте их и перезапустите вход.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            loginOtpOneTimeLabel: "Пожалуйста, введите свой одноразовый код"
        },
        sv: {
            footerImprintTitle: "Impressum",
            footerDataProtectionTitle: "Dataskydd",
            footerCookiePreferencesTitle: "Cookie-inställningar",
            doResend: "Skicka igen",
            magicLinkConfirmation: "Kontrollera din e-post och klicka på länken för att logga in!",
            magicLinkContinuationConfirmation: "Kontrollera din e-post och klicka på länken för att logga in! Stäng inte den här fliken.",
            magicLinkSuccessfulLogin: "Autentiseringssession bekräftad. Återgå till inloggningssidans flik.",
            magicLinkFailLogin: "Autentiseringssessionen har löpt ut. Stäng den här fliken och starta om inloggningsprocessen.",
            loginPage: "Inloggningssida",
            multipleSessionsError: "Flera inloggningssessioner öppnade i samma webbläsare. Stäng dem och starta om inloggningen.",
            p2incMagicLinkOtpFormTitle: "E-post OTP",
            loginOtpOneTimeLabel: "Vänligen ange din engångskod"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
