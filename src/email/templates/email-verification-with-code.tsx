import { renderEmail } from "../util/renderEmail";
import { EmailCode, EmailText } from "../components";
import { EmailLayout } from "../layout";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { variablesHelper } from "../util/VariablesHelper.ts";
import i18n, { TFunction } from "i18next";
import { previewLocale } from "../util/previewLocale";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Email Verification With Code";

const { exp } = variablesHelper("email-verification-with-code.ftl");

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        title={t("email-verification-with-code.messageSubject")}
        preview={t("email-verification-with-code.messagePreview")}
        locale={locale}
        disclaimer={t("email-verification-with-code.disclaimer")}
    >
        <EmailText>{t("email-verification-with-code.messageBody")}</EmailText>
        <EmailCode>
            {t("email-verification-with-code.verificationCode", { code: exp("code") })}
        </EmailCode>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await renderEmail(<Template {...props} t={t} />, props.plainText);
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("email-verification-with-code.messageSubject");
};
