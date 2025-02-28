import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../../KcContext";
import type { I18n } from "../../../i18n";
import { clsx } from "keycloakify/tools/clsx";

export default function P2MagicLinkOtpForm(
    props: PageProps<Extract<KcContext, { pageId: "otp-form.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { auth, url, messagesPerField } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            headerNode={
                <div
                    id="kc-username"
                    className={kcClsx("kcFormGroupClass")}
                    style={{ fontSize: "16px" }}
                >
                    <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                    <a
                        id="reset-login"
                        href={url.loginRestartFlowUrl}
                        aria-label={msgStr("restartLoginTooltip")}
                    >
                        <div className="kc-login-tooltip">
                            <i className={kcClsx("kcResetFlowIcon")}></i>
                            <span className="kc-tooltip-text">
                                {msg("restartLoginTooltip")}
                            </span>
                        </div>
                    </a>
                </div>
            }
        >
            <p>Enter access code</p>
            <form
                id="kc-otp-login-form"
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
            >
                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="otp" className={kcClsx("kcLabelClass")}>
                            {msg("loginOtpOneTime")}
                        </label>
                    </div>

                    <div className={kcClsx("kcInputWrapperClass")}>
                        <input
                            id="otp"
                            name="otp"
                            autoComplete="off"
                            type="text"
                            className={clsx(
                                kcClsx("kcInputClass"),
                                "block focus:outline-none border-secondary-200 mt-1 rounded-md w-full focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 sm:text-sm"
                            )}
                            autoFocus
                            aria-invalid={
                                messagesPerField.existsError("totp") ? "true" : undefined
                            }
                        />
                        {messagesPerField.existsError("totp") && (
                            <span
                                id="input-error-otp-code"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("totp")
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>

                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <div
                            className={clsx(
                                kcClsx("kcFormButtonsWrapperClass"),
                                "grid grid-cols-2 gap-10"
                            )}
                        >
                            <input
                                className={
                                    "rounded-md bg-primary-600 text-white focus:ring-primary-600 hover:bg-primary-700 px-4 py-2 text-sm max-w-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                                }
                                name="submit"
                                id="kc-submit"
                                type="submit"
                                value={msgStr("doSubmit")}
                            />
                            <input
                                className={
                                    "rounded-md bg-secondary-600 text-white focus:ring-secondary-600 hover:bg-secondary-700 px-4 py-2 text-sm max-w-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                                }
                                name="resend"
                                id="kc-resend"
                                type="submit"
                                value={msgStr("doResend")}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
