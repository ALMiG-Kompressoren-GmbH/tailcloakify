import { render, Text } from "jsx-email";
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

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        preview={t("identity-provider-link.messagePreview")}
        locale={locale}
        disclaimer={t("identity-provider-link.disclaimer", {
            realmName: exp("realmName"),
            identityProviderDisplayName: exp("identityProviderDisplayName")
        })}
    >
        <Text style={paragraph}>
            <p>
                <p>
                    {t("identity-provider-link.messageBody", {
                        realmName: exp("realmName"),
                        identityProviderDisplayName: exp("identityProviderDisplayName"),
                        username: exp("identityProviderContext.username")
                    })}
                </p>
                <p>
                    <a href={exp("link")}>{t("identity-provider-link.messageLink")}</a>
                </p>
                <p>
                    {t("identity-provider-link.linkExpiry", {
                        linkExpiration: "${linkExpirationFormatter(linkExpiration)}",
                        interpolation: { escapeValue: false }
                    })}
                </p>
            </p>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await render(<Template {...props} t={t} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("identity-provider-link.messageSubject");
};
