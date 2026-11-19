import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import type { TFunction } from "i18next";
import { EmailButton, EmailText } from "../components";
import { EmailLayout } from "../layout";
import i18n from "../i18n";
import { emailValue } from "../util/VariablesHelper";
import { renderEmail } from "../util/renderEmail";
import { previewLocale } from "../util/previewLocale";

type TemplateProps = GetTemplateProps & { t: TFunction };

export const templateName = "Verifiable Credential Offer";
export const previewProps: TemplateProps = {
    locale: previewLocale,
    themeName: "Tailcloakify",
    plainText: false,
    t: i18n.getFixedT(previewLocale)
};

export const Template = ({ locale, plainText, t }: TemplateProps) => (
    <EmailLayout
        locale={locale}
        title={t("verifiableCredentialOffer.subject")}
        preview={t("verifiableCredentialOffer.subject")}
        disclaimer={t("verifiableCredentialOffer.disclaimer")}
        showContactHelp={false}
    >
        <EmailText>
            {t("verifiableCredentialOffer.body", {
                realmName: emailValue("realmName", plainText),
                credentialName: emailValue("credentialScopeDisplayName", plainText)
            })}
        </EmailText>
        <EmailButton href={emailValue("link", plainText)}>
            {t("verifiableCredentialOffer.button")}
        </EmailButton>
        <EmailText>
            {t("verifiableCredentialOffer.expiry", {
                linkExpiration: emailValue(
                    "linkExpirationFormatter(linkExpiration)",
                    plainText
                )
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
    i18n.getFixedT(props.locale)("verifiableCredentialOffer.subject").replace(/'/g, "''");
