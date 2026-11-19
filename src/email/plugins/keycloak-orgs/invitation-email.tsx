import { If } from "keycloakify-emails/jsx-email";
import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import type { TFunction } from "i18next";
import { EmailButton, EmailText } from "../../components";
import { EmailLayout } from "../../layout";
import i18n from "../../i18n";
import { emailValue } from "../../util/VariablesHelper";
import { renderEmail } from "../../util/renderEmail";
import { previewLocale } from "../../util/previewLocale";

type TemplateProps = GetTemplateProps & { t: TFunction };

export const templateName = "Phase Two Organization Invitation";
export const subjectParameters = ["realmName", "orgName", "inviterName"];
export const previewProps: TemplateProps = {
    locale: previewLocale,
    themeName: "Tailcloakify",
    plainText: false,
    t: i18n.getFixedT(previewLocale)
};

export const Template = ({ locale, plainText, t }: TemplateProps) => (
    <EmailLayout
        locale={locale}
        title={t("organizationInvitation.subject", {
            orgName: emailValue("orgName", plainText)
        })}
        preview={t("organizationInvitation.subject", {
            orgName: emailValue("orgName", plainText)
        })}
        disclaimer={t("organizationInvitation.disclaimer")}
    >
        <EmailText>
            {t("organizationInvitation.body", {
                realmName: emailValue("realmName", plainText),
                orgName: emailValue("orgName", plainText)
            })}
        </EmailText>
        <If condition="inviterName?? && inviterName?has_content">
            <EmailText>
                {t("organizationInvitation.inviter", {
                    inviterName: emailValue("inviterName", plainText)
                })}
            </EmailText>
        </If>
        <EmailText>
            {t("organizationInvitation.recipient", {
                email: emailValue("email", plainText)
            })}
        </EmailText>
        <If condition="link?? && link?has_content">
            <EmailButton href={emailValue("link", plainText)}>
                {t("organizationInvitation.button")}
            </EmailButton>
        </If>
        <If condition="!(link?? && link?has_content)">
            <EmailText>{t("organizationInvitation.noLink")}</EmailText>
        </If>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props =>
    renderEmail(
        <Template {...props} t={i18n.getFixedT(props.locale)} />,
        props.plainText
    );

export const getSubject: GetSubject = async props =>
    i18n
        .getFixedT(props.locale)("organizationInvitation.subject", { orgName: "{1}" })
        .replace(/'/g, "''");
