import { renderEmail } from "../../util/renderEmail";
import { EmailButton, EmailText } from "../../components";
import { EmailLayout } from "../../layout";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { variablesHelper } from "../../util/VariablesHelper";
import i18n, { TFunction } from "i18next";
import { previewLocale } from "../../util/previewLocale";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Magic Link";

const { exp } = variablesHelper("magic-link-email.ftl");

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        title={t("magic-link-email.messageSubject", { realmName: exp("realmName") })}
        preview={t("magic-link-email.messagePreview", {
            realmName: exp("realmName")
        })}
        locale={locale}
        disclaimer={t("magic-link-email.disclaimer")}
    >
        <EmailText>
            {t("magic-link-email.messageBody", { realmName: exp("realmName") })}
        </EmailText>
        <EmailButton href={exp("magicLink")}>
            {t("magic-link-email.magicLink")}
        </EmailButton>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await renderEmail(<Template {...props} t={t} />, props.plainText);
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("magic-link-email.messageSubject", { realmName: exp("realmName") });
};