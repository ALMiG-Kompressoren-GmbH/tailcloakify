import { renderEmail } from "../util/renderEmail";
import { EmailNotice, EmailText } from "../components";
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

export const templateName = "Event Update Password";

const { exp } = createVariablesHelper("event-update_password.ftl");
export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        title={t("event-update-password.messageSubject")}
        preview={t("event-update-password.messagePreview", {
            realmName: exp("realmName")
        })}
        locale={locale}
        disclaimer={t("event-update-password.disclaimer")}
    >
        <EmailNotice>
            <EmailText>
                {t("event-update-password.messageBody", {
                    date: exp("event.date"),
                    ipAddress: exp("event.ipAddress")
                })}
            </EmailText>
        </EmailNotice>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await renderEmail(<Template {...props} t={t} />, props.plainText);
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("event-update-password.messageSubject");
};
