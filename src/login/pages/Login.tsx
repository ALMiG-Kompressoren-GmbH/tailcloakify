import { useEffect, useReducer, useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import useProviderLogos from "../useProviderLogos";
import { useScript } from "keycloakify/login/pages/Login.useScript";
import { primaryButtonClass } from "../buttonClasses";
import { Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type LoginStep = "email" | "password";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const {
        social,
        realm,
        url,
        usernameHidden,
        login,
        auth,
        registrationDisabled,
        messagesPerField,
        enableWebAuthnConditionalUI,
        authenticators,
        captchaRequired,
        captchaSiteKey,
        captchaAction,
        captchaLanguage
    } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const providerLogos = useProviderLogos();

    const webAuthnButtonId = "authenticateWebAuthnButton";

    useScript({ webAuthnButtonId, kcContext, i18n });

    const hasSocialProviders = realm.password && social?.providers !== undefined && social.providers.length > 0;
    const hasLoginError = messagesPerField.existsError("username", "password");
    const hasPrefilledUsername = !!login.username;

    const getInitialStep = (): LoginStep => {
        if (hasLoginError || hasPrefilledUsername) return "password";
        return "email";
    };

    const [loginStep, setLoginStep] = useState<LoginStep>(getInitialStep);

    const handleContinue = () => {
        const usernameInput = document.getElementById("username") as HTMLInputElement | null;
        if (usernameInput && !usernameInput.value.trim()) {
            usernameInput.focus();
            return;
        }
        setLoginStep("password");
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (loginStep === "email") {
            e.preventDefault();
            handleContinue();
            return;
        }
        setIsLoginButtonDisabled(true);
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container" className={"space-y-4"}>
                    <div id="kc-registration" className={"text-center"}>
                        <span className="text-gray-600">
                            {msg("noAccount")}{" "}
                            <a
                                tabIndex={8}
                                href={url.registrationUrl}
                                className={"text-black font-semibold inline-flex no-underline hover:no-underline"}
                            >
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={null}
        >
            {/* Social providers - full-width stacked buttons */}
            {hasSocialProviders && social.providers !== undefined && (
                <div id="kc-social-providers" className="space-y-3">
                    {social.providers.map(p => (
                        <a
                            key={p.alias}
                            id={`social-${p.alias}`}
                            href={p.loginUrl}
                            className={clsx(
                                "flex items-center justify-center gap-3 w-full py-3 rounded-lg border border-secondary-200 text-sm font-medium transition-colors duration-200",
                                `hover:bg-provider-${p.alias}/10 hover:border-provider-${p.alias}/30`
                            )}
                            style={{ textDecoration: "none" }}
                        >
                            {providerLogos[p.alias] ? (
                                <img src={providerLogos[p.alias]} alt="" className="h-5 w-5" />
                            ) : p.iconClasses ? (
                                <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true" />
                            ) : null}
                            <span>{msgStr("continueWithProvider", p.displayName || p.alias)}</span>
                        </a>
                    ))}
                </div>
            )}

            {/* Divider */}
            {hasSocialProviders && kcContext.properties["TAILCLOAKIFY_HIDE_LOGIN_FORM"]?.toUpperCase() !== "TRUE" && (
                <div className="w-full pt-4 separate text-secondary-600 text-sm">
                    {msgStr("orSignInWithEmail")}
                </div>
            )}

            {/* Two-step email/password form */}
            {kcContext.properties["TAILCLOAKIFY_HIDE_LOGIN_FORM"]?.toUpperCase() !== "TRUE" && realm.password && (
                            <form
                                id="kc-form-login"
                                onSubmit={handleFormSubmit}
                                action={url.loginAction}
                                method="post"
                                className="m-0 space-y-4 pt-4"
                            >
                                {/* Email/username input */}
                                {!usernameHidden && (
                                    <div className={kcClsx("kcFormGroupClass")}>
                                        <label htmlFor="username" className={clsx(kcClsx("kcLabelClass"), "sr-only")}>
                                            {!realm.loginWithEmailAllowed
                                                ? msg("username")
                                                : !realm.registrationEmailAsUsername
                                                  ? msg("usernameOrEmail")
                                                  : msg("email")}
                                        </label>
                                        <input
                                            placeholder={
                                                !realm.loginWithEmailAllowed
                                                    ? msgStr("username")
                                                    : !realm.registrationEmailAsUsername
                                                      ? msgStr("usernameOrEmail")
                                                      : msgStr("email")
                                            }
                                            tabIndex={2}
                                            id="username"
                                            className={clsx(
                                                kcClsx("kcInputClass"),
                                                "block focus:outline-none border-border border-secondary-200 mt-1 rounded-md w-full focus:border-gray-500 focus:ring focus:ring-gray-400 focus:ring-opacity-50 sm:text-sm"
                                            )}
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                        {messagesPerField.existsError("username", "password") && (
                                            <span
                                                id="input-error"
                                                className={kcClsx("kcInputErrorMessageClass")}
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                }}
                                            />
                                        )}
                                    </div>
                                )}

                                {/* Continue button - only in email step */}
                                {loginStep === "email" && (
                                    <div className="flex flex-col pt-2">
                                        <button
                                            type="button"
                                            tabIndex={3}
                                            className={clsx(primaryButtonClass, "w-full cursor-pointer")}
                                            onClick={handleContinue}
                                        >
                                            {msgStr("doContinue")}
                                        </button>
                                    </div>
                                )}

                                {/* Password section - only in password step */}
                                <AnimatePresence>
                                    {loginStep === "password" && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden space-y-4"
                                        >
                                            <div className={clsx(kcClsx("kcFormGroupClass"), "relative")}>
                                                <label htmlFor="password" className={clsx(kcClsx("kcLabelClass"), "sr-only")}>
                                                    {msg("password")}
                                                </label>
                                                <PasswordWrapper
                                                    kcClsx={kcClsx}
                                                    i18n={i18n}
                                                    passwordInputId="password"
                                                    withError={messagesPerField.existsError("username", "password")}
                                                >
                                                    <input
                                                        placeholder="Password"
                                                        tabIndex={3}
                                                        id="password"
                                                        className={clsx(
                                                            kcClsx("kcInputClass"),
                                                            "block focus:outline-none border-border border-secondary-200 mt-1 rounded-md w-full focus:ring focus:ring-gray-400 focus:border-gray-500 focus:ring-opacity-50 sm:text-sm aria-[invalid=true]:pr-[calc(2rem+26px)] pr-10"
                                                        )}
                                                        name="password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                                    />
                                                </PasswordWrapper>
                                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                                    <span
                                                        id="input-error"
                                                        className={kcClsx("kcInputErrorMessageClass")}
                                                        aria-live="polite"
                                                        dangerouslySetInnerHTML={{
                                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                                <div id="kc-form-options">
                                                    {realm.rememberMe && !usernameHidden && (
                                                        <div className="checkbox">
                                                            <label>
                                                                <input
                                                                    tabIndex={5}
                                                                    id="rememberMe"
                                                                    name="rememberMe"
                                                                    type="checkbox"
                                                                    className={"accent-primary-600"}
                                                                    defaultChecked={!!login.rememberMe}
                                                                />{" "}
                                                                {msg("rememberMe")}
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                                    {realm.resetPasswordAllowed && (
                                                        <span>
                                                            <a
                                                                tabIndex={6}
                                                                href={url.loginResetCredentialsUrl}
                                                                className={"text-primary-600 hover:text-primary-500 inline-flex no-underline hover:no-underline"}
                                                            >
                                                                {msg("doForgotPassword")}
                                                            </a>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {captchaRequired && (
                                                <div className="form-group">
                                                    <div className={kcClsx("kcInputWrapperClass")}>
                                                        <div
                                                            className="cf-turnstile"
                                                            data-sitekey={captchaSiteKey}
                                                            data-action={captchaAction}
                                                            data-language={captchaLanguage}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}

                                            <div id="kc-form-buttons" className={clsx(kcClsx("kcFormGroupClass"), "flex flex-col pt-4 space-y-2")}>
                                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                                <input
                                                    tabIndex={7}
                                                    disabled={isLoginButtonDisabled}
                                                    className={clsx(primaryButtonClass, "w-full cursor-pointer")}
                                                    name="login"
                                                    id="kc-login"
                                                    type="submit"
                                                    value={msgStr("doLogIn")}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
            )}

            {/* WebAuthn section - unchanged */}
            {enableWebAuthnConditionalUI && (
                <>
                    <form id="webauth" action={url.loginAction} method="post">
                        <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                        <input type="hidden" id="authenticatorData" name="authenticatorData" />
                        <input type="hidden" id="signature" name="signature" />
                        <input type="hidden" id="credentialId" name="credentialId" />
                        <input type="hidden" id="userHandle" name="userHandle" />
                        <input type="hidden" id="error" name="error" />
                    </form>

                    {authenticators !== undefined && authenticators.authenticators.length !== 0 && (
                        <>
                            <form id="authn_select" className={kcClsx("kcFormClass")}>
                                {authenticators.authenticators.map((authenticator, i) => (
                                    <input key={i} type="hidden" name="authn_use_chk" readOnly value={authenticator.credentialId} />
                                ))}
                            </form>
                        </>
                    )}

                    <input
                        id={webAuthnButtonId}
                        type="button"
                        className={
                            "rounded-md text-primary-600 border-2 border-primary-600 border-solid px-4 py-2 text-sm flex justify-center relative w-full mt-4 no-underline hover:no-underline hover:border-3 hover:text-primary-300"
                        }
                        value={msgStr("passkey-doAuthenticate")}
                    />
                </>
            )}
        </Template>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element; withError?: boolean }) {
    const { kcClsx, i18n, passwordInputId, children, withError } = props;

    const { msgStr } = i18n;

    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);

        assert(passwordInputElement instanceof HTMLInputElement);

        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);

    return (
        <div className={kcClsx("kcInputGroup")}>
            {children}
            <button
                type="button"
                className={clsx("absolute inset-y-0 right-3 flex items-center text-secondary-400", withError && "right-8")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? <EyeOff className="h-5 w-5" aria-hidden={true} /> : <Eye className="h-5 w-5" aria-hidden={true} />}
            </button>
        </div>
    );
}
