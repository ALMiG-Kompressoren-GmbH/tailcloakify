import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../../KcContext";
import type { I18n } from "../../../i18n";

export default function EmailConfirmationError(props: PageProps<Extract<KcContext, { pageId: "email-confirmation-error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            displayRequiredFields={false}
            displayMessage={false}
            headerNode={<></>}
        >
            <p>{msg("magicLinkFailLogin")}</p>
        </Template>
    );
}