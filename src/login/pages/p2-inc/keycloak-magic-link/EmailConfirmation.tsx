import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../../KcContext";
import type { I18n } from "../../../i18n";

export default function EmailConfirmation(props: PageProps<Extract<KcContext, { pageId: "email-confirmation.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { magicLinkContinuation } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            displayMessage={false}
            displayRequiredFields={false}
            headerNode={<></>}
        >
            {magicLinkContinuation.sameBrowser && (
                <div>
                    <div style={{ marginBottom: ".5rem" }}>{msg("magicLinkSuccessfulLogin")}</div>
                    <a href={magicLinkContinuation.url} id="mode-barcode" className={"no-underline hover:no-underline text-secondary-600 text-sm"}>
                        {msg("loginPage")}
                    </a>
                </div>
            )}
        </Template>
    );
}