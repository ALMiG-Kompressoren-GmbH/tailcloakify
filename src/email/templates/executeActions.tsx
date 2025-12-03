import { Raw, render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";
import i18n from "../i18n.ts";
import { previewLocale } from "../util/previewLocale.ts";
import { TFunction } from "i18next";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Execute Actions";

const { exp } = createVariablesHelper("executeActions.ftl");
const contactEmail = exp("properties.TAILCLOAKIFY_EMAIL_CONTACT");

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const Template = ({ locale, t }: TemplateProps) => {
    return (
        <EmailLayout
            preview={t("execute-actions.messagePreview", { realmName: exp("realmName") })}
            locale={locale}
            disclaimer={""}
        >
            <Text style={paragraph}>
                <Raw content="<#if (requiredActions![])?seq_contains('UPDATE_PASSWORD') && (requiredActions![])?seq_contains('UPDATE_PROFILE')>" />
                <p>
                    {t("execute-actions.messageBody", {
                        realmName: exp("realmName")
                    })}
                </p>
                <p>
                    <a href={exp("link")}>{t("execute-actions.messageLink")}</a>
                </p>
                <p>
                    {t("execute-actions.linkExpiry", {
                        linkExpiration: "${linkExpirationFormatter(linkExpiration)}",
                        interpolation: { escapeValue: false }
                    })}
                </p>
                <p>
                    {t("execute-actions.resetPassword")}
                    <br />
                    {t("execute-actions.furtherActions", {
                        contactEmail: contactEmail
                    })}
                </p>

                <Raw content="<#else>" />

                <p>
                    {t("execute-actions.adminMessageBody", {
                        realmName: exp("realmName")
                    })}
                </p>

                {/* Required actions list (only if present) */}
                <Raw content="<#if (requiredActions![])?size gt 0>" />
                <ul>
                    <strong>
                        <Raw content="<#list (requiredActions![]) as r><li>${msg('requiredAction.' + r)}</li></#list>" />
                    </strong>
                </ul>
                <Raw content="</#if>" />

                <p>{t("execute-actions.adminMessageLink")}</p>
                <p>
                    <a href={exp("link")}>
                        {t("execute-actions.adminLinkToAccountUpdate")}
                    </a>
                </p>
                <p>
                    {t("execute-actions.linkExpiry", {
                        linkExpiration: "${linkExpirationFormatter(linkExpiration)}",
                        interpolation: { escapeValue: false }
                    })}
                </p>
                <p>{t("execute-actions.adminIgnoreMessage")}</p>
                <Raw content="</#if>" />
            </Text>
        </EmailLayout>
    );
};

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await render(<Template {...props} t={t} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("execute-actions.messageSubject");
};