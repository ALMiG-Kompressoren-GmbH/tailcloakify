import { renderEmail } from "../util/renderEmail";
import { EmailButton, EmailText } from "../components";
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

export const templateName = "Password Reset";

const { exp } = createVariablesHelper("password-reset.ftl");

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        title={t("password-reset.messageSubject")}
        preview={t("password-reset.messagePreview", { realmName: exp("realmName") })}
        locale={locale}
        disclaimer={t("password-reset.disclaimer")}
    >
        <EmailText>
            {t("password-reset.messageBody", { realmName: exp("realmName") })}
        </EmailText>
        <EmailButton href={exp("link")}>
            {t("password-reset.passwordResetLink")}
        </EmailButton>
        <EmailText>
            {t("password-reset.linkExpiration", {
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
    return t("password-reset.messageSubject");
};
