import { renderEmail } from "../util/renderEmail";
import { If } from "keycloakify-emails/jsx-email";
import { EmailButton, EmailText } from "../components";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { variablesHelper } from "../util/VariablesHelper";
import i18n, { TFunction } from "i18next";
import { previewLocale } from "../util/previewLocale.ts";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Invitation Email";

const { exp } = variablesHelper("org-invite.ftl");

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        title={t("organization-invite.messageSubject", { "0": exp("organization.name") })}
        preview={t("organization-invite.messagePreview", {
            "0": exp("organization.name")
        })}
        locale={locale}
        disclaimer={t("organization-invite.disclaimer", {
            "0": exp("organization.name")
        })}
    >
        <If condition="firstName?? && lastName??">
            <EmailText>
                {t("organization-invite.messageBodySalutation", {
                    firstName: exp("firstName"),
                    lastName: exp("lastName")
                })}
            </EmailText>
        </If>
        <EmailText>
            {t("organization-invite.messageBody", { "0": exp("organization.name") })}
        </EmailText>
        <EmailButton href={exp("link")}>
            {t("organization-invite.invitationLink")}
        </EmailButton>
        <EmailText>
            {t("organization-invite.linkExpiration", {
                linkExpiration: "${linkExpirationFormatter(linkExpiration)}",
                interpolation: { escapeValue: false }
            })}
        </EmailText>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await renderEmail(<Template {...props} t={t} />, props.plainText);
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("organization-invite.messageSubject", { "0": exp("organization.name") });
};
