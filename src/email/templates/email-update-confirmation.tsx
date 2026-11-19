import { renderEmail } from "../util/renderEmail";
import { EmailButton, EmailText } from "../components";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";
import i18n, { TFunction } from "i18next";
import { previewLocale } from "../util/previewLocale.ts";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Email Update Confirmation";

const { exp } = createVariablesHelper("email-update-confirmation.ftl");

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        title={t("email-update-confirmation.messageSubject")}
        preview={t("email-update-confirmation.messagePreview", {
            realmName: exp("realmName")
        })}
        locale={locale}
        disclaimer={t("email-update-confirmation.disclaimer")}
    >
        <EmailText>
            {t("email-update-confirmation.messageBody", {
                realmName: exp("realmName"),
                newEmail: exp("newEmail")
            })}
        </EmailText>
        <EmailButton href={exp("link")}>
            {t("email-verification.messageLink")}
        </EmailButton>
        <EmailText>
            {t("email-update-confirmation.linkExpiry", {
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
    return t("email-update-confirmation.messageSubject");
};
