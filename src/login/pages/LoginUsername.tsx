import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import useProviderLogos from "../useProviderLogos";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const providerLogos = useProviderLogos();

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            headerNode={msg("doLogIn")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container" className={"space-y-4"}>
                    <div id="kc-registration" className={"text-center"}>
                        <span>
                            {msg("noAccount")}{" "}
                            <a
                                tabIndex={8}
                                href={url.registrationUrl}
                                className={"text-primary-600 hover:text-primary-500 inline-flex no-underline hover:no-underline"}
                            >
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <hr />
                            <h2 className={"pt-4 separate text-secondary-600 text-sm"}>{msg("identity-provider-login-label")}</h2>
                            <ul
                                className={clsx(
                                    kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass"),
                                    "gap-4 grid pt-4",
                                    social.providers.length === 1 ? 'grid-cols-1' : social.providers.length % 3 === 0 && social.providers.length <= 6 ? 'grid-cols-3' : social.providers.length % 2 === 0 && social.providers.length <= 6 ? 'grid-cols-2' : 'grid-cols-4'
                                )}
                            >
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <a
                                            id={`social-${p.alias}`}
                                            className={clsx(
                                                kcClsx("kcFormSocialAccountListButtonClass", providers.length > 3 && "kcFormSocialAccountGridItem"),
                                                `border border-secondary-200 flex justify-center py-2 rounded-lg hover:border-opacity-30 hover:bg-provider-${p.alias}/10`
                                            )}
                                            style={{ textDecoration: "none" }}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            {providerLogos[p.alias] ? (
                                                <div className={"h-6 w-6"}>
                                                    <img src={providerLogos[p.alias]} alt={`${p.displayName} logo`} className={"h-full w-auto"} />
                                                </div>
                                            ) :
                                                // Fallback to the original iconClasses if the logo is not defined
                                                p.iconClasses ? (
                                                    <div className={"h-6 w-6"}>
                                                        <i
                                                            className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses, `text-provider-${p.alias}`)}
                                                            aria-hidden="true"
                                                        ></i>
                                                    </div>
                                                ) : (<div className="h-6 mx-1 pt-1 font-bold">{(p.displayName || p.alias)}</div>)
                                            }
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper" className={"space-y-4"}>
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                            className={"m-0 space-y-4"}
                        >
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
                                            "block focus:outline-none border-secondary-200 mt-1 rounded-md w-full focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 sm:text-sm"
                                        )}
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username")}
                                    />
                                    {messagesPerField.existsError("username") && (
                                        <span
                                            id="input-error"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username"))
                                            }}
                                        />
                                    )}
                                </div>
                            )}

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
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input
                                    tabIndex={4}
                                    disabled={isLoginButtonDisabled}
                                    className={
                                        "rounded-md bg-primary-600 text-white focus:ring-primary-600 hover:bg-primary-700 px-4 py-2 text-sm flex justify-center relative w-full focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    }
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
