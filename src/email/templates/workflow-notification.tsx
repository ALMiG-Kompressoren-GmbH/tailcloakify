import { Raw } from "jsx-email";
import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import type { TFunction } from "i18next";
import { EmailNotice, EmailText } from "../components";
import { EmailLayout } from "../layout";
import i18n from "../i18n";
import { renderEmail } from "../util/renderEmail";
import { previewLocale } from "../util/previewLocale";

type TemplateProps = GetTemplateProps & { t: TFunction };

export const templateName = "Workflow Notification";
export const previewProps: TemplateProps = {
    locale: previewLocale,
    themeName: "Tailcloakify",
    plainText: false,
    t: i18n.getFixedT(previewLocale)
};

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        locale={locale}
        title={
            <Raw content="${kcSanitize(msg(subjectKey, daysRemaining, reason))?no_esc}" />
        }
        preview={t("workflowNotification.preview")}
        disclaimer=""
        showContactHelp={false}
    >
        <Raw content="<#if messageKey == 'customMessage'>" />
        <EmailNotice>
            <Raw content="${kcSanitize(customMessage)?no_esc}" />
        </EmailNotice>
        <Raw content="<#else>" />
        <EmailText>
            <Raw content="${kcSanitize(msg('accountNotificationGreeting', user.firstName!user.username))?no_esc}" />
        </EmailText>
        <EmailNotice>
            <EmailText>
                <Raw content="${kcSanitize(msg(messageKey, daysRemaining, reason))?no_esc}" />
            </EmailText>
            <Raw content="<#if daysRemaining gt 0>" />
            <EmailText>
                <strong>
                    <Raw content="${kcSanitize(msg('accountNotificationTimeRemaining', daysRemaining))?no_esc}" />
                </strong>
            </EmailText>
            <Raw content="</#if>" />
        </EmailNotice>
        <Raw content="<#if messageKey != 'accountDeleteNotificationBody'>" />
        <EmailText>
            <Raw content="${kcSanitize(msg('accountNotificationQuestions', realmName))?no_esc}" />
        </EmailText>
        <Raw content="</#if>" />
        <EmailText>
            <Raw content="${kcSanitize(msg('accountNotificationSignatureFrom', realmName))?no_esc}" />
        </EmailText>
        <Raw content="</#if>" />
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props =>
    renderEmail(
        <Template {...props} t={i18n.getFixedT(props.locale)} />,
        props.plainText
    );

export const getSubject: GetSubject = async props =>
    i18n.getFixedT(props.locale)("workflowNotification.subject").replace(/'/g, "''");
