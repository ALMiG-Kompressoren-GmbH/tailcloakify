import { renderEmail } from "../util/renderEmail";
import { EmailNotice, EmailText } from "../components";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { previewLocale } from "../util/previewLocale.ts";
import { TFunction } from "i18next";
import i18n from "../i18n";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Event Remove Totp";

const { exp } = createVariablesHelper("event-remove_totp.ftl");
export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        title={t("event-remove-totp.messageSubject")}
        preview={t("event-remove-totp.messagePreview", { realmName: exp("realmName") })}
        locale={locale}
        disclaimer={t("event-remove-totp.disclaimer")}
    >
        <EmailNotice>
            <EmailText>
                {t("event-remove-totp.messageBody", {
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
    return t("event-remove-totp.messageSubject");
};
