import { render, Text } from "jsx-email";
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
const contactEmail = exp("properties.TAILCLOAKIFY_EMAIL_CONTACT");
const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        preview={t("event-remove-totp.messagePreview", { realmName: exp("realmName") })}
        locale={locale}
        disclaimer={t("event-remove-totp.disclaimer", { contactEmail: contactEmail })}
    >
        <Text style={paragraph}>
            <p>
                {t("event-remove-totp.messageBody", {
                    date: exp("event.date"),
                    ipAddress: exp("event.ipAddress")
                })}
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
    return t("event-remove-totp.messageSubject");
};
