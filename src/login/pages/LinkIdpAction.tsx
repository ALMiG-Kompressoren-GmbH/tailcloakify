import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LinkIdpAction(props: PageProps<Extract<KcContext, { pageId: "link-idp-action.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { idpDisplayName, url } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("linkIdpActionTitle", idpDisplayName)}
            displayMessage={false}
        >
            <div id="kc-link-text" className={clsx(kcClsx("kcContentWrapperClass"), "mb-6 text-sm text-secondary-600 text-center")}>
                {msg("linkIdpActionMessage", idpDisplayName)}
            </div>
            <form className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-buttons" className="flex flex-col gap-3 px-4 sm:px-0">
                        <input
                            className={clsx(
                                kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass"),
                                "rounded-md bg-primary-600 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 hover:bg-primary-700"
                            )}
                            name="continue"
                            id="kc-continue"
                            type="submit"
                            value={msgStr("doContinue")}
                        />
                        <input
                            className={clsx(
                                kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass"),
                                "rounded-md bg-secondary-100 px-4 py-2 text-sm text-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 hover:bg-secondary-200 hover:text-secondary-900"
                            )}
                            name="cancel-aia"
                            id="kc-cancel"
                            type="submit"
                            value={msgStr("doCancel")}
                        />
                    </div>
                </div>
            </form>
        </Template>
    );
}
