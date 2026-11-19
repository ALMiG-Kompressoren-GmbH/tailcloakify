import { renderEmail } from "../../util/renderEmail";
import { EmailCode, EmailText } from "../../components";
import { EmailLayout } from "../../layout";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { variablesHelper } from "../../util/VariablesHelper.ts";
import i18n, { TFunction } from "i18next";
import { previewLocale } from "../../util/previewLocale";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Email OTP";

const { exp } = variablesHelper("otp-email.ftl");

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        title={t("otpEmail.messageSubject", { realmName: exp("realmName") })}
        preview={t("otpEmail.messagePreview", {
            realmName: exp("realmName")
        })}
        locale={locale}
        disclaimer={t("otpEmail.disclaimer")}
    >
        <EmailText>{t("otpEmail.messageBody")}</EmailText>
        <EmailCode>{t("otpEmail.verificationCode", { code: exp("code") })}</EmailCode>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await renderEmail(<Template {...props} t={t} />, props.plainText);
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("otpEmail.messageSubject", { realmName: exp("realmName") });
};