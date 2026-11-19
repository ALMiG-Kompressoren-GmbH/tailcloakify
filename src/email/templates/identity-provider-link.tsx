import { renderEmail } from "../util/renderEmail";
import { EmailButton, EmailText } from "../components";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { previewLocale } from "../util/previewLocale.ts";
import { TFunction } from "i18next";
import i18n from "../i18n.ts";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Identity Provider Link";

const { exp } = createVariablesHelper("identity-provider-link.ftl");

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        title={t("identity-provider-link.messageSubject")}
        preview={t("identity-provider-link.messagePreview", {
            realmName: exp("realmName")
        })}
        locale={locale}
        disclaimer={t("identity-provider-link.disclaimer", {
            realmName: exp("realmName"),
            identityProviderDisplayName: exp("identityProviderDisplayName")
        })}
    >
        <EmailText>
            {t("identity-provider-link.messageBody", {
                realmName: exp("realmName"),
                identityProviderDisplayName: exp("identityProviderDisplayName"),
                username: exp("identityProviderContext.username")
            })}
        </EmailText>
        <EmailButton href={exp("link")}>
            {t("identity-provider-link.messageLink")}
        </EmailButton>
        <EmailText>
            {t("identity-provider-link.linkExpiry", {
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
    return t("identity-provider-link.messageSubject");
};
