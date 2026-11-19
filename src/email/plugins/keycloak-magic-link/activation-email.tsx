import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import type { TFunction } from "i18next";
import { EmailButton, EmailText } from "../../components";
import { EmailLayout } from "../../layout";
import i18n from "../../i18n";
import { emailValue } from "../../util/VariablesHelper";
import { renderEmail } from "../../util/renderEmail";
import { previewLocale } from "../../util/previewLocale";

type TemplateProps = GetTemplateProps & { t: TFunction };

export const templateName = "Account Activation";
export const subjectParameters = ["realmName", "clientName"];
export const previewProps: TemplateProps = {
    locale: previewLocale,
    themeName: "Tailcloakify",
    plainText: false,
    t: i18n.getFixedT(previewLocale)
};

export const Template = ({ locale, plainText, t }: TemplateProps) => (
    <EmailLayout
        locale={locale}
        title={t("activationEmail.subject", {
            realmName: emailValue("realmName", plainText)
        })}
        preview={t("activationEmail.subject", {
            realmName: emailValue("realmName", plainText)
        })}
        disclaimer={t("activationEmail.disclaimer")}
    >
        <EmailText>
            {t("activationEmail.body", { realmName: emailValue("realmName", plainText) })}
        </EmailText>
        <EmailButton href={emailValue("activationLink", plainText)}>
            {t("activationEmail.button")}
        </EmailButton>
        <EmailText>
            {t("activationEmail.expiry", {
                minutes: emailValue("linkExpirationMinutes", plainText)
            })}
        </EmailText>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props =>
    renderEmail(
        <Template {...props} t={i18n.getFixedT(props.locale)} />,
        props.plainText
    );

export const getSubject: GetSubject = async props =>
    i18n
        .getFixedT(props.locale)("activationEmail.subject", { realmName: "{0}" })
        .replace(/'/g, "''");
