import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { render, Text } from "jsx-email";
import { EmailLayout } from "../layout";
import { createVariablesHelper } from "keycloakify-emails/variables";
import i18n, { TFunction } from "i18next";
import { previewLocale } from "../util/previewLocale.ts";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

const paragraph = {
    color: '#777',
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
}

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify",
}

export const templateName = "Email Test";

const { exp } = createVariablesHelper("email-test.ftl");

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        preview={t("email-test.messagePreview")}
        locale={locale}
        disclaimer={t("email-test.disclaimer")}
    >
        <Text style={paragraph}>
            {" "}
            {t("email-test.messageBody", { realmName: exp("realmName") })}
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
    const t = i18n.getFixedT(props.locale);
    return await render(<Template {...props} t={t} />, { plainText: props.plainText });
}

export const getSubject: GetSubject = async (_props) => {
    const t = i18n.getFixedT(_props.locale);
    return t('email-test.messageSubject');
};

