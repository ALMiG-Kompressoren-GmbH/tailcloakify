import { Raw } from "jsx-email";
import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import type { TFunction } from "i18next";
import { EmailNotice, EmailText } from "../components";
import { EmailLayout } from "../layout";
import i18n from "../i18n";
import { renderEmail } from "./renderEmail";
import { previewLocale } from "./previewLocale";

type SecurityEvent =
    "removeCredential" | "updateCredential" | "permanentLockout" | "temporaryLockout";
type TemplateProps = GetTemplateProps & { t: TFunction };

export function createSecurityEventEmail(event: SecurityEvent, templateName: string) {
    const key = `securityEvents.${event}`;
    const hasCredential = event === "removeCredential" || event === "updateCredential";
    const previewProps: TemplateProps = {
        locale: previewLocale,
        themeName: "Tailcloakify",
        plainText: false,
        t: i18n.getFixedT(previewLocale)
    };
    const Template = ({ locale, plainText, t }: TemplateProps) => (
        <EmailLayout
            locale={locale}
            title={t(`${key}.subject`)}
            preview={t(`${key}.subject`)}
            disclaimer={t(`${key}.disclaimer`)}
            showContactHelp={false}
        >
            <EmailNotice>
                <EmailText>
                    {t(`${key}.body`, {
                        date: "${event.date}",
                        ipAddress: "${event.ipAddress}"
                    })}
                </EmailText>
                {hasCredential && (
                    <EmailText>
                        {t("securityEvents.credentialType")}
                        {": "}
                        <Raw
                            content={
                                plainText
                                    ? "${event.getDetail('credential_type')!'unknown'}"
                                    : "${(event.getDetail('credential_type')!'unknown')?esc}"
                            }
                        />
                    </EmailText>
                )}
            </EmailNotice>
        </EmailLayout>
    );
    const getTemplate: GetTemplate = async props =>
        renderEmail(
            <Template {...props} t={i18n.getFixedT(props.locale)} />,
            props.plainText
        );
    const getSubject: GetSubject = async props =>
        i18n.getFixedT(props.locale)(`${key}.subject`);
    return { Template, previewProps, getTemplate, getSubject, templateName };
}
