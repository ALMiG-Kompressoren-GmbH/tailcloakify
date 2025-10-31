import { render, Text } from "jsx-email";
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

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        preview={t("password-reset.messagePreview", { realmName: exp("realmName") })}
        locale={locale}
        disclaimer={t("password-reset.disclaimer")}
    >
        <Text style={paragraph}>
            <p>{t("password-reset.messageBody", { realmName: exp("realmName") })}</p>
            <p>
                <a href={exp("link")}>{t("password-reset.passwordResetLink")}</a>
            </p>
            <p>
                {t("password-reset.linkExpiration", {
                    linkExpiration: "${linkExpirationFormatter(linkExpiration)}",
                    interpolation: { escapeValue: false }
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
    return t("password-reset.messageSubject");
};
