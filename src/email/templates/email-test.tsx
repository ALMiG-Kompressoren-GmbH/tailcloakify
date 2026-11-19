import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { renderEmail } from "../util/renderEmail";
import { EmailButton, EmailText } from "../components";
import { EmailLayout } from "../layout";
import { createVariablesHelper } from "keycloakify-emails/variables";
import i18n, { TFunction } from "i18next";
import { previewLocale } from "../util/previewLocale.ts";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Email Test";

const { exp } = createVariablesHelper("email-test.ftl");

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        title={t("email-test.messageSubject")}
        preview={t("email-test.messagePreview")}
        locale={locale}
        disclaimer={t("email-test.disclaimer")}
    >
        <EmailText>
            {t("email-test.messageBody", { realmName: exp("realmName") })}
        </EmailText>
        <EmailButton href="${url.loginUrl?keep_before_last('/login-actions/')}/account/">
            {t("email-test.messageLink")}
        </EmailButton>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await renderEmail(<Template {...props} t={t} />, props.plainText);
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("email-test.messageSubject");
};
