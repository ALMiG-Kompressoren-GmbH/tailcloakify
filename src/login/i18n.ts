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
            magicLinkConfirmation:
                "Check your email, and click on the link to log in!",
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
            p2incOrgsTitle: "Invitations",
            p2incOrgsText:
                "You have been invited to join the following organizations. Uncheck those you wish to decline.",
            loginOtpOneTimeLabel: "Please Input your One-time code",
            // OAuth Grant / Consent page
            oauthGrantTitle: "Permissions requested",
            oauthGrantSubtitle: "Accept for your account",
            oauthGrantAppWouldLikeTo: "This app would like to:",
            oauthGrantPermSignIn: "Sign in and read user profile",
            oauthGrantPermMcp: "Access MCP servers and tools on your behalf",
            oauthGrantPermBilling: "Charge your account based on usage",
            oauthGrantAccessMcpServer: "Access MCP server",
            oauthGrantMcpServer: "MCP Server",
            oauthGrantPricing: "Pricing",
            oauthGrantInfoText1:
                "If you accept, {0} will be able to make API requests on your behalf. You will be billed for all usage according to your plan.",
            oauthGrantInfoText1NoBilling:
                "If you accept, {0} will be able to access your account on your behalf.",
            oauthGrantInfoText2:
                "Accepting these permissions means that you allow this app to use your account.",
            oauthGrantSee: "See",
            oauthGrantAnd: "and",
            oauthGrantTermsOfService: "terms of service",
            oauthGrantPrivacyPolicy: "privacy policy",
            oauthGrantRevokeAnytime:
                "You can revoke these permissions at any time.",
            oauthGrantViewPricing: "View pricing",
            oauthGrantPricingSummary: "Pricing Summary",
            doAccept: "Accept",
            // Payment Required page
            paymentRequiredTitle: "Payment Info Needed",
            paymentRequiredDescription:
                "To continue, please add a payment method to your account.",
            paymentRequiredExplanation:
                "This app uses MCP servers that charge based on usage. Adding a payment method allows you to access these services and be billed according to your plan.",
            paymentRequiredAddMethod: "Add Payment Method",
            paymentRequiredRedirectNote:
                "You will be redirected back after adding your payment method.",
            paymentRequiredVerify: "I've completed payment - Verify",
            paymentRequiredRestart: "Restart Login",
            // Login page redesign
            orSignInWithEmail: "Or sign in with email",
            continueWithProvider: "Continue with {0}",
            doContinue: "Continue",
        },
        "zh-CN": {
            footerImprintTitle: "版权信息",
            footerDataProtectionTitle: "数据保护",
            footerCookiePreferencesTitle: "Cookie 设置",
            doResend: "重新发送",
            magicLinkConfirmation: "请查收邮件，点击链接登录！",
            magicLinkContinuationConfirmation:
                "请查收邮件，点击链接登录！请勿关闭此标签页。",
            magicLinkSuccessfulLogin: "身份验证已确认。请返回登录页面标签页。",
            magicLinkFailLogin:
                "身份验证会话已过期。请关闭此标签页并重新登录。",
            loginPage: "登录页面",
            multipleSessionsError:
                "同一浏览器中打开了多个登录会话。请关闭并重新登录。",
            p2incMagicLinkOtpFormTitle: "邮箱验证码",
            p2incOrgsTitle: "邀请",
            p2incOrgsText: "您已被邀请加入以下组织。取消勾选您想拒绝的组织。",
            loginOtpOneTimeLabel: "请输入一次性验证码",
            // OAuth Grant / Consent page
            oauthGrantTitle: "权限请求",
            oauthGrantSubtitle: "为您的账户授权",
            oauthGrantAppWouldLikeTo: "此应用请求以下权限：",
            oauthGrantPermSignIn: "登录并读取用户资料",
            oauthGrantPermMcp: "代表您访问 MCP 服务器和工具",
            oauthGrantPermBilling: "根据使用量向您的账户收费",
            oauthGrantAccessMcpServer: "访问 MCP 服务器",
            oauthGrantMcpServer: "MCP 服务器",
            oauthGrantPricing: "定价",
            oauthGrantInfoText1:
                "如果您接受，{0} 将能够代表您发起 API 请求。您将根据您的计划为所有使用付费。",
            oauthGrantInfoText1NoBilling:
                "如果您接受，{0} 将能够代表您访问您的账户。",
            oauthGrantInfoText2: "接受这些权限意味着您允许此应用使用您的账户。",
            oauthGrantSee: "查看",
            oauthGrantAnd: "和",
            oauthGrantTermsOfService: "服务条款",
            oauthGrantPrivacyPolicy: "隐私政策",
            oauthGrantRevokeAnytime: "您可以随时撤销这些权限。",
            oauthGrantViewPricing: "查看定价",
            oauthGrantPricingSummary: "价格摘要",
            doAccept: "接受",
            // Payment Required page
            paymentRequiredTitle: "需要支付信息",
            paymentRequiredDescription: "请添加支付方式以继续。",
            paymentRequiredExplanation:
                "此应用使用按使用量收费的 MCP 服务器。添加支付方式后，您可以访问这些服务并根据您的计划付费。",
            paymentRequiredAddMethod: "添加支付方式",
            paymentRequiredRedirectNote: "添加支付方式后，您将被重定向回来。",
            paymentRequiredVerify: "我已完成支付 - 验证",
            paymentRequiredRestart: "重新登录",
            // Login page redesign
            orSignInWithEmail: "或者使用电子邮箱登录",
            continueWithProvider: "继续使用 {0}",
            doContinue: "继续",
        },
        de: {
            footerImprintTitle: "Impressum",
            footerDataProtectionTitle: "Datenschutz",
            footerCookiePreferencesTitle: "Cookie Einstellungen",
            doResend: "Erneut Senden",
            magicLinkConfirmation:
                "Überprüfen Sie Ihre E-Mails und klicken Sie auf den Link, um sich anzumelden!",
            magicLinkContinuationConfirmation:
                "Überprüfen Sie Ihre E-Mails und klicken Sie auf den Link, um sich anzumelden! Bitte schließen Sie diesen Tab nicht.",
            magicLinkSuccessfulLogin:
                "Authentifizierungssitzung bestätigt. Bitte kehren Sie zum Anmeldeseiten-Tab zurück.",
            magicLinkFailLogin:
                "Authentifizierungssitzung abgelaufen. Bitte schließen Sie diesen Tab und starten Sie den Anmeldevorgang neu.",
            loginPage: "Anmeldeseite",
            multipleSessionsError:
                "Mehrere Anmeldesitzungen im selben Browser geöffnet. Bitte schließen Sie sie und starten Sie die Anmeldung neu.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            p2incOrgsTitle: "Einladungen",
            p2incOrgsText:
                "Sie wurden eingeladen, den folgenden Organisationen beizutreten. Deaktivieren Sie diejenigen, die Sie ablehnen möchten.",
            loginOtpOneTimeLabel: "Bitte geben Sie Ihren Einmalcode",
            // OAuth Grant / Consent page
            oauthGrantTitle: "Berechtigungen angefordert",
            oauthGrantSubtitle: "Für Ihr Konto akzeptieren",
            oauthGrantAppWouldLikeTo: "Diese App möchte:",
            oauthGrantPermSignIn: "Anmelden und Benutzerprofil lesen",
            oauthGrantPermMcp:
                "Auf MCP-Server und Tools in Ihrem Namen zugreifen",
            oauthGrantPermBilling: "Ihr Konto nutzungsbasiert belasten",
            oauthGrantAccessMcpServer: "Zugriff auf MCP-Server",
            oauthGrantMcpServer: "MCP-Server",
            oauthGrantPricing: "Preisgestaltung",
            oauthGrantInfoText1:
                "Wenn Sie akzeptieren, kann {0} API-Anfragen in Ihrem Namen stellen. Sie werden gemäß Ihrem Tarif für alle Nutzung abgerechnet.",
            oauthGrantInfoText1NoBilling:
                "Wenn Sie akzeptieren, kann {0} in Ihrem Namen auf Ihr Konto zugreifen.",
            oauthGrantInfoText2:
                "Das Akzeptieren dieser Berechtigungen bedeutet, dass Sie dieser App erlauben, Ihr Konto zu verwenden.",
            oauthGrantSee: "Siehe",
            oauthGrantAnd: "und",
            oauthGrantTermsOfService: "Nutzungsbedingungen",
            oauthGrantPrivacyPolicy: "Datenschutzrichtlinie",
            oauthGrantRevokeAnytime:
                "Sie können diese Berechtigungen jederzeit widerrufen.",
            oauthGrantViewPricing: "Preise anzeigen",
            oauthGrantPricingSummary: "Preisübersicht",
            doAccept: "Akzeptieren",
            // Payment Required page
            paymentRequiredTitle: "Zahlungsinformationen erforderlich",
            paymentRequiredDescription:
                "Um fortzufahren, fügen Sie bitte eine Zahlungsmethode zu Ihrem Konto hinzu.",
            paymentRequiredExplanation:
                "Diese App verwendet MCP-Server, die nutzungsbasiert abrechnen. Das Hinzufügen einer Zahlungsmethode ermöglicht Ihnen den Zugriff auf diese Dienste.",
            paymentRequiredAddMethod: "Zahlungsmethode hinzufügen",
            paymentRequiredRedirectNote:
                "Sie werden nach dem Hinzufügen Ihrer Zahlungsmethode zurückgeleitet.",
            paymentRequiredVerify: "Zahlung abgeschlossen - Überprüfen",
            paymentRequiredRestart: "Anmeldung neu starten",
            // Login page redesign
            orSignInWithEmail: "Oder mit E-Mail anmelden",
            continueWithProvider: "Weiter mit {0}",
            doContinue: "Weiter",
        },
        fr: {
            footerImprintTitle: "Mentions Légales",
            footerDataProtectionTitle: "Protection des Données",
            footerCookiePreferencesTitle: "Paramètres des Cookies",
            doResend: "Renvoyer",
            magicLinkConfirmation:
                "Vérifiez vos e-mails et cliquez sur le lien pour vous connecter !",
            magicLinkContinuationConfirmation:
                "Vérifiez vos e-mails et cliquez sur le lien pour vous connecter ! Veuillez ne pas fermer cet onglet.",
            magicLinkSuccessfulLogin:
                "Session d'authentification confirmée. Veuillez retourner à l'onglet de la page de connexion.",
            magicLinkFailLogin:
                "Session d'authentification expirée. Veuillez fermer cet onglet et relancer le processus de connexion.",
            loginPage: "Page de connexion",
            multipleSessionsError:
                "Plusieurs sessions de connexion ouvertes dans le même navigateur. Veuillez les fermer et relancer la connexion.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            p2incOrgsTitle: "Invitations",
            p2incOrgsText:
                "Vous avez été invité à rejoindre les organisations suivantes. Décochez celles que vous souhaitez refuser.",
            loginOtpOneTimeLabel: "Veuillez saisir votre Code à usage unique",
            // OAuth Grant / Consent page
            oauthGrantTitle: "Autorisations demandées",
            oauthGrantSubtitle: "Accepter pour votre compte",
            oauthGrantAppWouldLikeTo: "Cette application souhaite :",
            oauthGrantPermSignIn: "Se connecter et lire le profil utilisateur",
            oauthGrantPermMcp:
                "Accéder aux serveurs et outils MCP en votre nom",
            oauthGrantPermBilling: "Facturer votre compte selon l'utilisation",
            oauthGrantAccessMcpServer: "Accéder au serveur MCP",
            oauthGrantMcpServer: "Serveur MCP",
            oauthGrantPricing: "Tarification",
            oauthGrantInfoText1:
                "Si vous acceptez, {0} pourra effectuer des requêtes API en votre nom. Vous serez facturé pour toute utilisation selon votre forfait.",
            oauthGrantInfoText1NoBilling:
                "Si vous acceptez, {0} pourra accéder à votre compte en votre nom.",
            oauthGrantInfoText2:
                "Accepter ces autorisations signifie que vous permettez à cette application d'utiliser votre compte.",
            oauthGrantSee: "Voir",
            oauthGrantAnd: "et",
            oauthGrantTermsOfService: "conditions d'utilisation",
            oauthGrantPrivacyPolicy: "politique de confidentialité",
            oauthGrantRevokeAnytime:
                "Vous pouvez révoquer ces autorisations à tout moment.",
            oauthGrantViewPricing: "Voir les tarifs",
            oauthGrantPricingSummary: "Résumé des tarifs",
            doAccept: "Accepter",
            // Payment Required page
            paymentRequiredTitle: "Informations de paiement requises",
            paymentRequiredDescription:
                "Pour continuer, veuillez ajouter un mode de paiement à votre compte.",
            paymentRequiredExplanation:
                "Cette application utilise des serveurs MCP facturés à l'utilisation. L'ajout d'un mode de paiement vous permet d'accéder à ces services.",
            paymentRequiredAddMethod: "Ajouter un mode de paiement",
            paymentRequiredRedirectNote:
                "Vous serez redirigé après avoir ajouté votre mode de paiement.",
            paymentRequiredVerify: "Paiement effectué - Vérifier",
            paymentRequiredRestart: "Recommencer la connexion",
            // Login page redesign
            orSignInWithEmail: "Ou se connecter avec e-mail",
            continueWithProvider: "Continuer avec {0}",
            doContinue: "Continuer",
        },
        it: {
            footerImprintTitle: "Impronta",
            footerDataProtectionTitle: "Informativa sulla Privacy",
            footerCookiePreferencesTitle: "Impostazioni dei Cookie",
            doResend: "Invia di nuovo",
            magicLinkConfirmation:
                "Controlla la tua email e fai clic sul link per accedere!",
            magicLinkContinuationConfirmation:
                "Controlla la tua email e fai clic sul link per accedere! Non chiudere questa scheda.",
            magicLinkSuccessfulLogin:
                "Sessione di autenticazione confermata. Si prega di tornare alla scheda della pagina di accesso.",
            magicLinkFailLogin:
                "Sessione di autenticazione scaduta. Chiudi questa scheda e riavvia il processo di accesso.",
            loginPage: "Pagina di accesso",
            multipleSessionsError:
                "Più sessioni di accesso aperte nello stesso browser. Si prega di chiuderle e riavviare l'accesso.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            p2incOrgsTitle: "Inviti",
            p2incOrgsText:
                "Sei stato invitato a unirti alle seguenti organizzazioni. Deseleziona quelle che desideri rifiutare.",
            loginOtpOneTimeLabel:
                "Si prega di inserire il tuo one-time password",
            // OAuth Grant / Consent page
            oauthGrantTitle: "Autorizzazioni richieste",
            oauthGrantSubtitle: "Accetta per il tuo account",
            oauthGrantAppWouldLikeTo: "Questa app vorrebbe:",
            oauthGrantPermSignIn: "Accedere e leggere il profilo utente",
            oauthGrantPermMcp:
                "Accedere ai server e agli strumenti MCP per tuo conto",
            oauthGrantPermBilling:
                "Addebitare sul tuo account in base all'utilizzo",
            oauthGrantAccessMcpServer: "Accedere al server MCP",
            oauthGrantMcpServer: "Server MCP",
            oauthGrantPricing: "Prezzi",
            oauthGrantInfoText1:
                "Se accetti, {0} potrà effettuare richieste API per tuo conto. Ti verrà addebitato tutto l'utilizzo secondo il tuo piano.",
            oauthGrantInfoText1NoBilling:
                "Se accetti, {0} potrà accedere al tuo account per tuo conto.",
            oauthGrantInfoText2:
                "Accettare queste autorizzazioni significa consentire a questa app di utilizzare il tuo account.",
            oauthGrantSee: "Vedi",
            oauthGrantAnd: "e",
            oauthGrantTermsOfService: "termini di servizio",
            oauthGrantPrivacyPolicy: "informativa sulla privacy",
            oauthGrantRevokeAnytime:
                "Puoi revocare queste autorizzazioni in qualsiasi momento.",
            oauthGrantViewPricing: "Visualizza prezzi",
            oauthGrantPricingSummary: "Riepilogo prezzi",
            doAccept: "Accetta",
            // Payment Required page
            paymentRequiredTitle: "Informazioni di pagamento necessarie",
            paymentRequiredDescription:
                "Per continuare, aggiungi un metodo di pagamento al tuo account.",
            paymentRequiredExplanation:
                "Questa app utilizza server MCP con fatturazione a consumo. Aggiungere un metodo di pagamento ti consente di accedere a questi servizi.",
            paymentRequiredAddMethod: "Aggiungi metodo di pagamento",
            paymentRequiredRedirectNote:
                "Verrai reindirizzato dopo aver aggiunto il metodo di pagamento.",
            paymentRequiredVerify: "Pagamento completato - Verifica",
            paymentRequiredRestart: "Riavvia accesso",
            // Login page redesign
            orSignInWithEmail: "O accedi con email",
            continueWithProvider: "Continua con {0}",
            doContinue: "Continua",
        },
        es: {
            footerImprintTitle: "Aviso Legal",
            footerDataProtectionTitle: "Protección de Datos",
            footerCookiePreferencesTitle: "Preferencias de Cookies",
            doResend: "Reenviar",
            magicLinkConfirmation:
                "¡Revise su correo electrónico y haga clic en el enlace para iniciar sesión!",
            magicLinkContinuationConfirmation:
                "¡Revise su correo electrónico y haga clic en el enlace para iniciar sesión! Por favor, no cierre esta pestaña.",
            magicLinkSuccessfulLogin:
                "Sesión de autenticación confirmada. Por favor, vuelva a la pestaña de la página de inicio de sesión.",
            magicLinkFailLogin:
                "Sesión de autenticación caducada. Por favor, cierre esta pestaña y reinicie el flujo de inicio de sesión.",
            loginPage: "Página de inicio de sesión",
            multipleSessionsError:
                "Múltiples sesiones de inicio de sesión abiertas en el mismo navegador. Por favor, ciérrelas y reinicie el inicio de sesión.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            p2incOrgsTitle: "Invitaciones",
            p2incOrgsText:
                "Has sido invitado a unirte a las siguientes organizaciones. Desmarca aquellas que deseas rechazar.",
            loginOtpOneTimeLabel: "Por favor ingrese su Código de un solo uso",
            // OAuth Grant / Consent page
            oauthGrantTitle: "Permisos solicitados",
            oauthGrantSubtitle: "Aceptar para tu cuenta",
            oauthGrantAppWouldLikeTo: "Esta aplicación desea:",
            oauthGrantPermSignIn: "Iniciar sesión y leer el perfil de usuario",
            oauthGrantPermMcp:
                "Acceder a servidores y herramientas MCP en tu nombre",
            oauthGrantPermBilling: "Cargar a tu cuenta según el uso",
            oauthGrantAccessMcpServer: "Acceder al servidor MCP",
            oauthGrantMcpServer: "Servidor MCP",
            oauthGrantPricing: "Precios",
            oauthGrantInfoText1:
                "Si aceptas, {0} podrá realizar solicitudes API en tu nombre. Se te facturará todo el uso según tu plan.",
            oauthGrantInfoText1NoBilling:
                "Si aceptas, {0} podrá acceder a tu cuenta en tu nombre.",
            oauthGrantInfoText2:
                "Aceptar estos permisos significa que permites que esta aplicación use tu cuenta.",
            oauthGrantSee: "Ver",
            oauthGrantAnd: "y",
            oauthGrantTermsOfService: "términos de servicio",
            oauthGrantPrivacyPolicy: "política de privacidad",
            oauthGrantRevokeAnytime:
                "Puedes revocar estos permisos en cualquier momento.",
            oauthGrantViewPricing: "Ver precios",
            oauthGrantPricingSummary: "Resumen de precios",
            doAccept: "Aceptar",
            // Payment Required page
            paymentRequiredTitle: "Se requiere información de pago",
            paymentRequiredDescription:
                "Para continuar, agrega un método de pago a tu cuenta.",
            paymentRequiredExplanation:
                "Esta aplicación utiliza servidores MCP que cobran según el uso. Agregar un método de pago te permite acceder a estos servicios.",
            paymentRequiredAddMethod: "Agregar método de pago",
            paymentRequiredRedirectNote:
                "Serás redirigido después de agregar tu método de pago.",
            paymentRequiredVerify: "Pago completado - Verificar",
            paymentRequiredRestart: "Reiniciar inicio de sesión",
            // Login page redesign
            orSignInWithEmail: "O iniciar sesión con correo electrónico",
            continueWithProvider: "Continuar con {0}",
            doContinue: "Continuar",
        },
        cs: {
            footerImprintTitle: "Tiráž",
            footerDataProtectionTitle: "Ochrana Osobních Údajů",
            footerCookiePreferencesTitle: "Nastavení Cookies",
            doResend: "Znovu odeslat",
            magicLinkConfirmation:
                "Zkontrolujte svůj e-mail a klikněte na odkaz pro přihlášení!",
            magicLinkContinuationConfirmation:
                "Zkontrolujte svůj e-mail a klikněte na odkaz pro přihlášení! Nezavírejte prosím tuto záložku.",
            magicLinkSuccessfulLogin:
                "Ověřovací relace potvrzena. Vraťte se prosím na záložku přihlašovací stránky.",
            magicLinkFailLogin:
                "Ověřovací relace vypršela. Zavřete prosím tuto záložku a restartujte přihlašovací proces.",
            loginPage: "Přihlašovací stránka",
            multipleSessionsError:
                "Více přihlašovacích relací otevřeno ve stejném prohlížeči. Zavřete je prosím a restartujte přihlášení.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            p2incOrgsTitle: "Pozvánky",
            p2incOrgsText:
                "Byli jste pozváni k připojení k následujícím organizacím. Zrušte výběr těch, které chcete odmítnout.",
            loginOtpOneTimeLabel: "Zadejte prosím svůj jednorázový kód",
            // OAuth Grant / Consent page
            oauthGrantTitle: "Požadovaná oprávnění",
            oauthGrantSubtitle: "Přijmout pro váš účet",
            oauthGrantAppWouldLikeTo: "Tato aplikace by chtěla:",
            oauthGrantPermSignIn: "Přihlásit se a číst uživatelský profil",
            oauthGrantPermMcp:
                "Přístup k MCP serverům a nástrojům vaším jménem",
            oauthGrantPermBilling: "Účtovat váš účet podle využití",
            oauthGrantAccessMcpServer: "Přístup k MCP serveru",
            oauthGrantMcpServer: "MCP Server",
            oauthGrantPricing: "Ceník",
            oauthGrantInfoText1:
                "Pokud přijmete, {0} bude moci provádět API požadavky vaším jménem. Bude vám účtováno veškeré využití podle vašeho plánu.",
            oauthGrantInfoText1NoBilling:
                "Pokud přijmete, {0} bude moci přistupovat k vašemu účtu vaším jménem.",
            oauthGrantInfoText2:
                "Přijetí těchto oprávnění znamená, že povolujete této aplikaci používat váš účet.",
            oauthGrantSee: "Viz",
            oauthGrantAnd: "a",
            oauthGrantTermsOfService: "podmínky služby",
            oauthGrantPrivacyPolicy: "zásady ochrany osobních údajů",
            oauthGrantRevokeAnytime: "Tato oprávnění můžete kdykoli odvolat.",
            oauthGrantViewPricing: "Zobrazit ceník",
            oauthGrantPricingSummary: "Přehled cen",
            doAccept: "Přijmout",
            // Payment Required page
            paymentRequiredTitle: "Požadovány platební údaje",
            paymentRequiredDescription:
                "Pro pokračování přidejte platební metodu ke svému účtu.",
            paymentRequiredExplanation:
                "Tato aplikace používá MCP servery s účtováním podle využití. Přidání platební metody vám umožní přístup k těmto službám.",
            paymentRequiredAddMethod: "Přidat platební metodu",
            paymentRequiredRedirectNote:
                "Po přidání platební metody budete přesměrováni zpět.",
            paymentRequiredVerify: "Platba dokončena - Ověřit",
            paymentRequiredRestart: "Restartovat přihlášení",
            // Login page redesign
            orSignInWithEmail: "Nebo se přihlaste e-mailem",
            continueWithProvider: "Pokračovat přes {0}",
            doContinue: "Pokračovat",
        },
        nl: {
            footerImprintTitle: "Colofon",
            footerDataProtectionTitle: "Gegevensbescherming",
            footerCookiePreferencesTitle: "Cookievoorkeuren",
            doResend: "Opnieuw verzenden",
            magicLinkConfirmation:
                "Controleer je e-mail en klik op de link om in te loggen!",
            magicLinkContinuationConfirmation:
                "Controleer je e-mail en klik op de link om in te loggen! Sluit dit tabblad niet.",
            magicLinkSuccessfulLogin:
                "Authenticatiesessie bevestigd. Ga terug naar het tabblad van de loginpagina.",
            magicLinkFailLogin:
                "Authenticatiesessie verlopen. Sluit dit tabblad en start de loginprocedure opnieuw.",
            loginPage: "Loginpagina",
            multipleSessionsError:
                "Meerdere loginsessies geopend in dezelfde browser. Sluit deze en start de login opnieuw.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            p2incOrgsTitle: "Uitnodigingen",
            p2incOrgsText:
                "U bent uitgenodigd om lid te worden van de volgende organisaties. Vink degenen die u wilt weigeren uit.",
            loginOtpOneTimeLabel: "Voer uw eenmalige code in",
            // OAuth Grant / Consent page
            oauthGrantTitle: "Machtigingen gevraagd",
            oauthGrantSubtitle: "Accepteren voor uw account",
            oauthGrantAppWouldLikeTo: "Deze app wil graag:",
            oauthGrantPermSignIn: "Inloggen en gebruikersprofiel lezen",
            oauthGrantPermMcp: "Toegang tot MCP-servers en tools namens u",
            oauthGrantPermBilling: "Uw account belasten op basis van gebruik",
            oauthGrantAccessMcpServer: "Toegang tot MCP-server",
            oauthGrantMcpServer: "MCP-server",
            oauthGrantPricing: "Prijzen",
            oauthGrantInfoText1:
                "Als u accepteert, kan {0} API-verzoeken namens u doen. U wordt gefactureerd voor al het gebruik volgens uw abonnement.",
            oauthGrantInfoText1NoBilling:
                "Als u accepteert, kan {0} namens u toegang krijgen tot uw account.",
            oauthGrantInfoText2:
                "Het accepteren van deze machtigingen betekent dat u deze app toestaat uw account te gebruiken.",
            oauthGrantSee: "Zie",
            oauthGrantAnd: "en",
            oauthGrantTermsOfService: "servicevoorwaarden",
            oauthGrantPrivacyPolicy: "privacybeleid",
            oauthGrantRevokeAnytime:
                "U kunt deze machtigingen op elk moment intrekken.",
            oauthGrantViewPricing: "Bekijk prijzen",
            oauthGrantPricingSummary: "Prijsoverzicht",
            doAccept: "Accepteren",
            // Payment Required page
            paymentRequiredTitle: "Betalingsgegevens vereist",
            paymentRequiredDescription:
                "Voeg een betaalmethode toe aan uw account om door te gaan.",
            paymentRequiredExplanation:
                "Deze app maakt gebruik van MCP-servers die op basis van gebruik factureren. Het toevoegen van een betaalmethode geeft u toegang tot deze diensten.",
            paymentRequiredAddMethod: "Betaalmethode toevoegen",
            paymentRequiredRedirectNote:
                "U wordt teruggeleid nadat u uw betaalmethode heeft toegevoegd.",
            paymentRequiredVerify: "Betaling voltooid - Verifiëren",
            paymentRequiredRestart: "Inloggen opnieuw starten",
            // Login page redesign
            orSignInWithEmail: "Of inloggen met e-mail",
            continueWithProvider: "Doorgaan met {0}",
            doContinue: "Doorgaan",
        },
        pl: {
            footerImprintTitle: "Nota Prawna",
            footerDataProtectionTitle: "Ochrona Danych",
            footerCookiePreferencesTitle: "Preferencje Plików Cookie",
            doResend: "Wyślij ponownie",
            magicLinkConfirmation:
                "Sprawdź swoją pocztę e-mail i kliknij link, aby się zalogować!",
            magicLinkContinuationConfirmation:
                "Sprawdź swoją pocztę e-mail i kliknij link, aby się zalogować! Nie zamykaj tej karty.",
            magicLinkSuccessfulLogin:
                "Sesja uwierzytelniania potwierdzona. Wróć do karty strony logowania.",
            magicLinkFailLogin:
                "Sesja uwierzytelniania wygasła. Zamknij tę kartę i uruchom ponownie proces logowania.",
            loginPage: "Strona logowania",
            multipleSessionsError:
                "W tej samej przeglądarce otwarto wiele sesji logowania. Zamknij je i uruchom ponownie logowanie.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            p2incOrgsTitle: "Zaproszenia",
            p2incOrgsText:
                "Otrzymałeś zaproszenie do dołączenia do następujących organizacji. Odznacz te, które chcesz odrzucić.",
            loginOtpOneTimeLabel: "Proszę wpisać kod jednorazowy",
            // OAuth Grant / Consent page
            oauthGrantTitle: "Wymagane uprawnienia",
            oauthGrantSubtitle: "Zaakceptuj dla swojego konta",
            oauthGrantAppWouldLikeTo: "Ta aplikacja chciałaby:",
            oauthGrantPermSignIn: "Zalogować się i odczytać profil użytkownika",
            oauthGrantPermMcp:
                "Uzyskać dostęp do serwerów i narzędzi MCP w Twoim imieniu",
            oauthGrantPermBilling: "Obciążyć Twoje konto na podstawie użycia",
            oauthGrantAccessMcpServer: "Dostęp do serwera MCP",
            oauthGrantMcpServer: "Serwer MCP",
            oauthGrantPricing: "Cennik",
            oauthGrantInfoText1:
                "Jeśli zaakceptujesz, {0} będzie mógł wykonywać żądania API w Twoim imieniu. Zostaniesz obciążony za całe użycie zgodnie z Twoim planem.",
            oauthGrantInfoText1NoBilling:
                "Jeśli zaakceptujesz, {0} będzie mógł uzyskać dostęp do Twojego konta w Twoim imieniu.",
            oauthGrantInfoText2:
                "Zaakceptowanie tych uprawnień oznacza, że pozwalasz tej aplikacji na korzystanie z Twojego konta.",
            oauthGrantSee: "Zobacz",
            oauthGrantAnd: "i",
            oauthGrantTermsOfService: "warunki usługi",
            oauthGrantPrivacyPolicy: "polityka prywatności",
            oauthGrantRevokeAnytime:
                "Możesz cofnąć te uprawnienia w dowolnym momencie.",
            oauthGrantViewPricing: "Zobacz cennik",
            oauthGrantPricingSummary: "Podsumowanie cen",
            doAccept: "Akceptuj",
            // Payment Required page
            paymentRequiredTitle: "Wymagane dane płatności",
            paymentRequiredDescription:
                "Aby kontynuować, dodaj metodę płatności do swojego konta.",
            paymentRequiredExplanation:
                "Ta aplikacja korzysta z serwerów MCP, które rozliczają się na podstawie użycia. Dodanie metody płatności umożliwia dostęp do tych usług.",
            paymentRequiredAddMethod: "Dodaj metodę płatności",
            paymentRequiredRedirectNote:
                "Zostaniesz przekierowany po dodaniu metody płatności.",
            paymentRequiredVerify: "Płatność zakończona - Zweryfikuj",
            paymentRequiredRestart: "Uruchom ponownie logowanie",
            // Login page redesign
            orSignInWithEmail: "Lub zaloguj się przez email",
            continueWithProvider: "Kontynuuj z {0}",
            doContinue: "Kontynuuj",
        },
        ru: {
            footerImprintTitle: "Выходные Данные",
            footerDataProtectionTitle: "Защита Данных",
            footerCookiePreferencesTitle: "Настройки Файлов Cookie",
            doResend: "Отправить снова",
            magicLinkConfirmation:
                "Проверьте свою электронную почту и нажмите на ссылку для входа!",
            magicLinkContinuationConfirmation:
                "Проверьте свою электронную почту и нажмите на ссылку для входа! Пожалуйста, не закрывайте эту вкладку.",
            magicLinkSuccessfulLogin:
                "Сессия аутентификации подтверждена. Вернитесь на вкладку страницы входа.",
            magicLinkFailLogin:
                "Срок действия сессии аутентификации истек. Закройте эту вкладку и перезапустите процесс входа.",
            loginPage: "Страница входа",
            multipleSessionsError:
                "Несколько сеансов входа открыты в одном браузере. Закройте их и перезапустите вход.",
            p2incMagicLinkOtpFormTitle: "Email OTP",
            p2incOrgsTitle: "Приглашения",
            p2incOrgsText:
                "Вы были приглашены присоединиться к следующим организациям. Снимите отметку с тех, от которых вы хотите отказаться.",
            loginOtpOneTimeLabel: "Пожалуйста, введите свой одноразовый код",
            // OAuth Grant / Consent page
            oauthGrantTitle: "Запрошены разрешения",
            oauthGrantSubtitle: "Принять для вашей учётной записи",
            oauthGrantAppWouldLikeTo: "Это приложение хотело бы:",
            oauthGrantPermSignIn: "Войти и прочитать профиль пользователя",
            oauthGrantPermMcp:
                "Получить доступ к серверам и инструментам MCP от вашего имени",
            oauthGrantPermBilling:
                "Списывать средства с вашей учётной записи на основе использования",
            oauthGrantAccessMcpServer: "Доступ к серверу MCP",
            oauthGrantMcpServer: "MCP Сервер",
            oauthGrantPricing: "Цены",
            oauthGrantInfoText1:
                "Если вы примете, {0} сможет выполнять API-запросы от вашего имени. Вам будет выставлен счёт за всё использование согласно вашему плану.",
            oauthGrantInfoText1NoBilling:
                "Если вы примете, {0} сможет получить доступ к вашей учётной записи от вашего имени.",
            oauthGrantInfoText2:
                "Принятие этих разрешений означает, что вы разрешаете этому приложению использовать вашу учётную запись.",
            oauthGrantSee: "См.",
            oauthGrantAnd: "и",
            oauthGrantTermsOfService: "условия использования",
            oauthGrantPrivacyPolicy: "политика конфиденциальности",
            oauthGrantRevokeAnytime:
                "Вы можете отозвать эти разрешения в любое время.",
            oauthGrantViewPricing: "Посмотреть цены",
            oauthGrantPricingSummary: "Сводка цен",
            doAccept: "Принять",
            // Payment Required page
            paymentRequiredTitle: "Требуется платёжная информация",
            paymentRequiredDescription:
                "Для продолжения добавьте способ оплаты в свою учётную запись.",
            paymentRequiredExplanation:
                "Это приложение использует MCP-серверы с оплатой по использованию. Добавление способа оплаты позволит вам получить доступ к этим сервисам.",
            paymentRequiredAddMethod: "Добавить способ оплаты",
            paymentRequiredRedirectNote:
                "Вы будете перенаправлены после добавления способа оплаты.",
            paymentRequiredVerify: "Оплата завершена - Проверить",
            paymentRequiredRestart: "Перезапустить вход",
            // Login page redesign
            orSignInWithEmail: "Или войдите через электронную почту",
            continueWithProvider: "Продолжить через {0}",
            doContinue: "Продолжить",
        },
        sv: {
            footerImprintTitle: "Impressum",
            footerDataProtectionTitle: "Dataskydd",
            footerCookiePreferencesTitle: "Cookie-inställningar",
            doResend: "Skicka igen",
            magicLinkConfirmation:
                "Kontrollera din e-post och klicka på länken för att logga in!",
            magicLinkContinuationConfirmation:
                "Kontrollera din e-post och klicka på länken för att logga in! Stäng inte den här fliken.",
            magicLinkSuccessfulLogin:
                "Autentiseringssession bekräftad. Återgå till inloggningssidans flik.",
            magicLinkFailLogin:
                "Autentiseringssessionen har löpt ut. Stäng den här fliken och starta om inloggningsprocessen.",
            loginPage: "Inloggningssida",
            multipleSessionsError:
                "Flera inloggningssessioner öppnade i samma webbläsare. Stäng dem och starta om inloggningen.",
            p2incMagicLinkOtpFormTitle: "E-post OTP",
            p2incOrgsTitle: "Inbjudningar",
            p2incOrgsText:
                "Du har blivit inbjuden att gå med i följande organisationer. Avmarkera de du vill avböja.",
            loginOtpOneTimeLabel: "Vänligen ange din engångskod",
            // OAuth Grant / Consent page
            oauthGrantTitle: "Behörigheter begärda",
            oauthGrantSubtitle: "Acceptera för ditt konto",
            oauthGrantAppWouldLikeTo: "Denna app vill:",
            oauthGrantPermSignIn: "Logga in och läsa användarprofil",
            oauthGrantPermMcp:
                "Få åtkomst till MCP-servrar och verktyg å dina vägnar",
            oauthGrantPermBilling: "Debitera ditt konto baserat på användning",
            oauthGrantAccessMcpServer: "Åtkomst till MCP-server",
            oauthGrantMcpServer: "MCP-server",
            oauthGrantPricing: "Prissättning",
            oauthGrantInfoText1:
                "Om du accepterar kommer {0} att kunna göra API-förfrågningar å dina vägnar. Du debiteras för all användning enligt din plan.",
            oauthGrantInfoText1NoBilling:
                "Om du accepterar kommer {0} att kunna komma åt ditt konto å dina vägnar.",
            oauthGrantInfoText2:
                "Att acceptera dessa behörigheter innebär att du tillåter denna app att använda ditt konto.",
            oauthGrantSee: "Se",
            oauthGrantAnd: "och",
            oauthGrantTermsOfService: "användarvillkor",
            oauthGrantPrivacyPolicy: "integritetspolicy",
            oauthGrantRevokeAnytime:
                "Du kan återkalla dessa behörigheter när som helst.",
            oauthGrantViewPricing: "Visa priser",
            oauthGrantPricingSummary: "Prisöversikt",
            doAccept: "Acceptera",
            // Payment Required page
            paymentRequiredTitle: "Betalningsinformation krävs",
            paymentRequiredDescription:
                "För att fortsätta, lägg till en betalningsmetod till ditt konto.",
            paymentRequiredExplanation:
                "Denna app använder MCP-servrar som debiterar baserat på användning. Att lägga till en betalningsmetod ger dig åtkomst till dessa tjänster.",
            paymentRequiredAddMethod: "Lägg till betalningsmetod",
            paymentRequiredRedirectNote:
                "Du omdirigeras tillbaka efter att du lagt till din betalningsmetod.",
            paymentRequiredVerify: "Betalning slutförd - Verifiera",
            paymentRequiredRestart: "Starta om inloggning",
            // Login page redesign
            orSignInWithEmail: "Eller logga in med e-post",
            continueWithProvider: "Fortsätt med {0}",
            doContinue: "Fortsätt",
        },
    })
    .build();

type I18n = typeof ofTypeI18n;

export { type I18n, useI18n };
