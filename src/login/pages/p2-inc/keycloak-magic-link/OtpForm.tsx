import React, { useEffect, useRef, useState } from "react";
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

    const { url, messagesPerField } = kcContext;
    const otpLength = 6;
    const inputRef = useRef<HTMLInputElement[]>(Array(otpLength).fill(null));

    const [otpValues, setOtpValues] = useState<string[]>(Array(otpLength).fill(""));

    useEffect(() => {
        if (otpValues.every(Boolean)) {
            (document.getElementById("kc-otp-login-form") as HTMLFormElement)?.submit();
        }
    }, [otpValues]);

    const handleInput = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        // Only accept single digit input
        if (target.value.length > 1) {
            target.value = target.value.slice(-1);
        }

        if (isNaN(Number(target.value))) {
            target.value = "";
            return;
        }

        const newOtpValues = [...otpValues];
        newOtpValues[index] = target.value;
        setOtpValues(newOtpValues);

        // Move focus to the next input field if the current one is filled
        if (target.value !== "" && index < otpLength - 1) {
            const next = inputRef.current[index + 1];
            if (next) {
                next.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData("text").trim();

        if (!/^\d+$/.test(pasteData)) return; // Ensure only numbers are pasted

        const values = pasteData.split("").slice(0, otpLength);
        const newOtpValues = [...otpValues];

        values.forEach((value, i) => {
            newOtpValues[i] = value;
            if (inputRef.current[i]) {
                inputRef.current[i].value = value;
            }
        });

        setOtpValues(newOtpValues);

        // Focus the last filled input after pasting
        const lastIndex = Math.min(values.length, otpLength);
        if (inputRef.current[lastIndex]) {
            inputRef.current[lastIndex].focus();
        } else inputRef.current[otpLength - 1].focus();

        e.preventDefault(); // Prevent default paste action
    };

    const handleKeyUp = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const key = e.key.toLowerCase();

        if (key === "backspace" || key === "delete") {
            target.value = "";
            const prev = inputRef.current[index - 1];
            if (prev) {
                prev.focus();
            }

            const newOtpValues = [...otpValues];
            newOtpValues[index] = "";
            setOtpValues(newOtpValues);
        }
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            headerNode={msg("p2incMagicLinkOtpFormTitle")}
        >
            <form
                id="kc-otp-login-form"
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
            >
                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={clsx(kcClsx("kcLabelWrapperClass"), "text-center font-bold text-lg p-4")}>
                        <label htmlFor="otp" className={kcClsx("kcLabelClass")}>
                            {msg("p2incMagicLinkOtpFormTitle")}<br />
                            {msg("loginOtpOneTimeLabel")}
                        </label>
                    </div>

                    <div className={kcClsx("kcInputWrapperClass")}>
                        <div className={"flex justify-center items-center"}>
                            {Array.from({ length: otpLength }).map((_, index) => (
                                <input
                                    key={index}
                                    className={"otp-input"}
                                    type="text"
                                    autoFocus={index === 0}
                                    autoComplete="off"
                                    name={`otp-${index}`}
                                    id={`otp-${index}`}
                                    inputMode="numeric"
                                    value={otpValues[index]}
                                    onChange={handleInput(index)}
                                    ref={el => (inputRef.current[index] = el as HTMLInputElement)}
                                    onKeyDown={handleKeyUp(index)}
                                    onPaste={handlePaste}
                                />
                            ))}
                        </div>
                        <input
                            id={"otp"}
                            name={"otp"}
                            autoComplete="off"
                            type={"hidden"}
                            value={otpValues.join("")}
                            className={clsx(
                                kcClsx("kcInputClass"),
                                "block focus:outline-none border-secondary-200 mt-1 rounded-md w-full focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 sm:text-sm"
                            )}
                            autoFocus={true}
                            aria-invalid={messagesPerField.existsError("totp")}
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
