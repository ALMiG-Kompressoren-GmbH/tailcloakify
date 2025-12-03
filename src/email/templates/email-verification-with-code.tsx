import { render, Text } from "jsx-email";
import { EmailLayout } from "../layout";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { variablesHelper } from "../util/VariablesHelper.ts";
import i18n, { TFunction } from "i18next";
import { previewLocale } from "../util/previewLocale";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Email Verification With Code";

const { exp } = variablesHelper("email-verification-with-code.ftl");

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        preview={t("email-verification-with-code.messagePreview")}
        locale={locale}
        disclaimer={t("email-verification-with-code.disclaimer")}
    >
        <Text style={paragraph}>
            <p>
                {t("email-verification-with-code.messageBody")}
                <b>
                    {t("email-verification-with-code.verificationCode", {
                        code: exp("code")
                    })}
                </b>
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
    return t("email-verification-with-code.messageSubject");
};
