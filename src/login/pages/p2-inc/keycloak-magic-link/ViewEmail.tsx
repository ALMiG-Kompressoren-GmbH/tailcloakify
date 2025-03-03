import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../../KcContext";
import type { I18n } from "../../../i18n";

export default function ViewEmail(props: PageProps<Extract<KcContext, { pageId: "view-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, auth } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            displayRequiredFields={false}
            displayMessage={false}
            headerNode={
                <div id="kc-username" className={kcClsx("kcFormGroupClass")} style={{ display: "flex", justifyContent: "center" }}>
                    <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                    <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                        <div className="kc-login-tooltip">
                            <i className={kcClsx("kcResetFlowIcon")}></i>
                            <span className="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                        </div>
                    </a>
                </div>
            }
        >
            {msg("magicLinkConfirmation")}
        </Template>
    );
}