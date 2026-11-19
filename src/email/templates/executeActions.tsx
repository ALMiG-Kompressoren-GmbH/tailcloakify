import { Raw } from "jsx-email";
import { renderEmail } from "../util/renderEmail";
import { EmailButton, EmailNotice, EmailText } from "../components";
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

export const Template = ({ locale, t }: TemplateProps) => {
    return (
        <EmailLayout
            title={t("execute-actions.messageSubject")}
            preview={t("execute-actions.messagePreview", { realmName: exp("realmName") })}
            locale={locale}
            disclaimer={""}
        >
            <Raw content="<#if (requiredActions![])?seq_contains('UPDATE_PASSWORD') && (requiredActions![])?seq_contains('UPDATE_PROFILE')>" />
            <EmailText>
                {t("execute-actions.messageBody", {
                    realmName: exp("realmName")
                })}
            </EmailText>
            <EmailButton href={exp("link")}>
                {t("execute-actions.messageLink")}
            </EmailButton>
            <EmailText>
                {t("execute-actions.linkExpiry", {
                    linkExpiration: "${linkExpirationFormatter(linkExpiration)}",
                    interpolation: { escapeValue: false }
                })}
            </EmailText>
            <EmailText>{t("execute-actions.resetPassword")}</EmailText>

            <Raw content="<#else>" />

            <EmailText>
                {t("execute-actions.adminMessageBody", {
                    realmName: exp("realmName")
                })}
            </EmailText>

            <Raw content="<#if (requiredActions![])?size gt 0>" />
            <EmailNotice>
                <ul
                    style={{
                        paddingLeft: "20px",
                        fontSize: "14px",
                        lineHeight: "24px",
                        fontWeight: 600
                    }}
                >
                    <Raw content="<#list (requiredActions![]) as r><li>${msg('requiredAction.' + r)}</li></#list>" />
                </ul>
            </EmailNotice>
            <Raw content="</#if>" />

            <EmailText>{t("execute-actions.adminMessageLink")}</EmailText>
            <EmailButton href={exp("link")}>
                {t("execute-actions.adminLinkToAccountUpdate")}
            </EmailButton>
            <EmailText>
                {t("execute-actions.linkExpiry", {
                    linkExpiration: "${linkExpirationFormatter(linkExpiration)}",
                    interpolation: { escapeValue: false }
                })}
            </EmailText>
            <EmailText>{t("execute-actions.adminIgnoreMessage")}</EmailText>
            <Raw content="</#if>" />
        </EmailLayout>
    );
};

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await renderEmail(<Template {...props} t={t} />, props.plainText);
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("execute-actions.messageSubject");
};
