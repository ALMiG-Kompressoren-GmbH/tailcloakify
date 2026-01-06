import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { advancedMsgStr, msg } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messageHeader ?? message.summary)
                    }}
                />
            }
        >
            <div id="kc-info-message">
                <p
                    className="instruction"
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                            (() => {
                                let html = message.summary?.trim();

                                if (requiredActions) {
                                    html += " <b>";

                                    html += requiredActions
                                        .map(requiredAction => `<li class="ml-5">${advancedMsgStr(`requiredAction.${requiredAction}`)}</li>`)
                                        .join("");

                                    html += "</b>";
                                }

                                return html;
                            })()
                        )
                    }}
                />
                {(() => {
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <p className={"text-center"}>
                                <a href={pageRedirectUri} className={"no-underline hover:no-underline text-secondary-600 text-sm"}>
                                    {msg("backToApplication")}
                                </a>
                            </p>
                        );
                    }
                    if (actionUri) {
                        return (
                            <p className={"text-center"}>
                                <a
                                    href={actionUri}
                                    className={
                                        "rounded-md bg-primary-600 text-white hover:!text-white hover:no-underline hover:!bg-primary-700 px-4 py-2 text-sm flex justify-center relative w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 focus:!text-white focus:no-underline mt-4"
                                    }
                                >
                                    {msg("proceedWithAction")}
                                </a>
                            </p>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <p className={"text-center"}>
                                <a href={client.baseUrl} className={"no-underline hover:no-underline text-secondary-600 text-sm"}>
                                    {msg("backToApplication")}
                                </a>
                            </p>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
