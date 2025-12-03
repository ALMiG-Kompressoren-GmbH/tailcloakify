import { render, Text } from "jsx-email";
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

export const templateName = "Email Verification";

const { exp } = createVariablesHelper("email-verification.ftl");

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        preview={t("email-verification.messagePreview", { realmName: exp("realmName") })}
        locale={locale}
        disclaimer={t("email-verification.disclaimer")}
    >
        <Text style={paragraph}>
            <p>{t("email-verification.messageBody", { realmName: exp("realmName") })}</p>
            <p>
                <a href={exp("link")}>{t("email-verification.messageLink")}</a>
            </p>
            <p>
                {t("email-verification.linkExpiry", {
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
    return t("email-verification.messageSubject");
};
