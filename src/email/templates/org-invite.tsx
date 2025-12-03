import { Raw, render, Text } from "jsx-email";
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

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        preview={t("organization-invite.messagePreview", {
            "0": exp("organization.name")
        })}
        locale={locale}
        disclaimer={t("organization-invite.disclaimer", {
            "0": exp("organization.name")
        })}
    >
        <Text style={paragraph}>
            <Raw content="<#if firstName?? && lastName??>" />
            <p>
                {t("organization-invite.messageBodySalutation", {
                    firstName: exp("firstName"),
                    lastName: exp("lastName")
                })}
            </p>
            <p>
                {t("organization-invite.messageBody", {
                    "0": exp("organization.name")
                })}
            </p>
            <p>
                <a href={exp("link")}>{t("organization-invite.invitationLink")}</a>
            </p>
            <p>
                {t("organization-invite.linkExpiration", {
                    linkExpiration: "${linkExpirationFormatter(linkExpiration)}",
                    interpolation: { escapeValue: false }
                })}
            </p>
            <Raw content="<#else>" />
            <p>
                {t("organization-invite.messageBody", {
                    "0": exp("organization.name")
                })}
            </p>
            <p>
                <a href={exp("link")}>{t("organization-invite.invitationLink")}</a>
            </p>
            <p>
                {t("organization-invite.linkExpiration", {
                    linkExpiration: "${linkExpirationFormatter(linkExpiration)}",
                    interpolation: { escapeValue: false }
                })}
            </p>
            <Raw content="</#if>" />
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await render(<Template {...props} t={t} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("organization-invite.messageSubject");
};
