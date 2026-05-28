import { useState } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginResetOtp(props: PageProps<Extract<KcContext, { pageId: "login-reset-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, configuredOtpCredentials } = kcContext;

    const { msg, msgStr } = i18n;
    const [selectedCredentialId, setSelectedCredentialId] = useState<string>(
        configuredOtpCredentials.selectedCredentialId ?? configuredOtpCredentials.userOtpCredentials[0]?.id ?? ""
    );

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-reset-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcInputWrapperClass")}>
                    <div className={clsx(kcClsx("kcInfoAreaWrapperClass"), "space-y-4")}>
                        <p id="kc-otp-reset-form-description" className="text-sm text-secondary-600">
                            {msg("otp-reset-description")}
                        </p>

                        {configuredOtpCredentials.userOtpCredentials.length > 1 ? (
                            <div className={kcClsx("kcFormGroupClass")}>
                                <div className={clsx(kcClsx("kcLabelWrapperClass"), "text-center font-bold text-lg p-4")}>
                                    <label className={kcClsx("kcLabelClass")}>{msg("loginChooseAuthenticator")}</label>
                                </div>
                                <div className="flex flex-col gap-2 px-4 pb-2">
                                    {configuredOtpCredentials.userOtpCredentials.map(otpCredential => (
                                        <label
                                            key={otpCredential.id}
                                            className={clsx(
                                                "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                                                selectedCredentialId === otpCredential.id
                                                    ? "border-primary-500 bg-primary-50 text-primary-700"
                                                    : "border-secondary-200 bg-white text-secondary-700 hover:border-primary-300 hover:bg-primary-50/50"
                                            )}
                                        >
                                            <input
                                                type="radio"
                                                name="selectedCredentialId"
                                                value={otpCredential.id}
                                                checked={selectedCredentialId === otpCredential.id}
                                                onChange={() => setSelectedCredentialId(otpCredential.id)}
                                                className="h-4 w-4 shrink-0 accent-primary-600"
                                            />
                                            <span className="text-sm font-medium">{otpCredential.userLabel}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <input type="hidden" name="selectedCredentialId" value={selectedCredentialId} />
                        )}

                        {configuredOtpCredentials.userOtpCredentials.length === 1 && configuredOtpCredentials.userOtpCredentials[0] !== undefined && (
                            <div className="px-4 pb-2">
                                <label
                                    className="flex items-center gap-3 rounded-lg border border-secondary-200 bg-white px-4 py-3 text-secondary-700"
                                >
                                    <input type="radio" checked readOnly className="h-4 w-4 shrink-0 accent-primary-600" />
                                    <span className="text-sm font-medium">{configuredOtpCredentials.userOtpCredentials[0].userLabel}</span>
                                </label>
                            </div>
                        )}

                        <div className={kcClsx("kcFormGroupClass")}>
                            <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                                <input
                                    id="kc-otp-reset-form-submit"
                                    className={clsx(
                                        kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"),
                                        "rounded-md bg-primary-600 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 hover:bg-primary-700"
                                    )}
                                    type="submit"
                                    value={msgStr("doSubmit")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
