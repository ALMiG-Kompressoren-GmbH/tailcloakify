import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Raw,
    Row,
    Text
} from "jsx-email";
import { PropsWithChildren, ReactNode } from "react";
import { If } from "keycloakify-emails/jsx-email";
import { createVariablesHelper } from "keycloakify-emails/variables";
import i18n from "./i18n";
import { IfContactEmail } from "./IfContactEmail";
import { ContactHelp } from "./ContactHelp";
import { emailFontFamily, EmailSection } from "./components";

const { exp } = createVariablesHelper("email-test.ftl");
const currentYear = new Date().getFullYear();
const backgroundImage = exp("properties.TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE_URL");
const emailLogo = exp("properties.TAILCLOAKIFY_EMAIL_LOGO");
const emailLogoWidth = exp("properties.TAILCLOAKIFY_EMAIL_LOGO_WIDTH");
const emailLogoHeight = exp("properties.TAILCLOAKIFY_EMAIL_LOGO_HEIGHT");
const templateFont = exp("properties.TAILCLOAKIFY_EMAIL_FONT_FAMILY");
const contactEmail = exp("properties.TAILCLOAKIFY_EMAIL_CONTACT");
const backgroundColor =
    "${(properties.TAILCLOAKIFY_EMAIL_BACKGROUND_COLOR!'#f3f4f6')?esc}";
const backgroundStyle = "${(properties.TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE_URL!'none')?esc}";
const dividerColor = "${(properties.TAILCLOAKIFY_EMAIL_DIVIDER_COLOR!'#d1d5db')?esc}";

export const EmailLayout = ({
    locale,
    children,
    preview,
    title,
    disclaimer,
    showContactHelp = true
}: PropsWithChildren<{
    preview: ReactNode;
    locale: string;
    title?: ReactNode;
    disclaimer: ReactNode;
    showContactHelp?: boolean;
}>) => {
    const t = i18n.getFixedT(locale);

    return (
        <Html lang={locale}>
            <Head>
                <title>{t("header.title", { realmName: exp("realmName") })}</title>
                <meta name="color-scheme" content="light" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Raw
                    content={`<style><#if properties.TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE_URL?? && properties.TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE_URL?has_content>body { background-image: url('${backgroundImage}') !important; background-size: cover !important; }</#if><#if properties.TAILCLOAKIFY_EMAIL_FONT_FAMILY?? && properties.TAILCLOAKIFY_EMAIL_FONT_FAMILY?has_content>body, table, td, p, a, h1 { font-family: '${templateFont}', Arial, sans-serif !important; }</#if></style>`}
                />
            </Head>
            <Preview>{preview}</Preview>
            <Body
                style={{
                    margin: 0,
                    padding: 0,
                    backgroundColor,
                    backgroundImage: backgroundStyle,
                    backgroundRepeat: "no-repeat",
                    color: "#262626",
                    fontFamily: emailFontFamily,
                    WebkitTextSizeAdjust: "100%",
                    overflowWrap: "anywhere"
                }}
            >
                <EmailSection style={{ padding: "56px 8px 24px" }}>
                    <Container
                        style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
                    >
                        <EmailSection
                            bgColor="#ffffff"
                            style={{
                                padding: "24px",
                                borderRadius: "8px",
                                border: "1px solid #e5e7eb",
                                overflowWrap: "anywhere"
                            }}
                        >
                            <If condition="properties.TAILCLOAKIFY_EMAIL_LOGO?? && properties.TAILCLOAKIFY_EMAIL_LOGO?has_content">
                                <EmailSection align="center" style={{ padding: "8px 0" }}>
                                    <Img
                                        src={emailLogo}
                                        alt={exp("realmName")}
                                        width={emailLogoWidth}
                                        height={emailLogoHeight}
                                        style={{
                                            display: "block",
                                            width: `${emailLogoWidth}px`,
                                            height: "auto",
                                            maxWidth: "100%"
                                        }}
                                    />
                                </EmailSection>
                            </If>
                            <Heading
                                as="h1"
                                style={{
                                    fontFamily: emailFontFamily,
                                    color: "#0078b9",
                                    textAlign: "center",
                                    fontSize: "24px",
                                    lineHeight: "32px",
                                    margin: "20px 0",
                                    fontWeight: 700
                                }}
                            >
                                {title ??
                                    t("header.title", { realmName: exp("realmName") })}
                            </Heading>
                            <Hr
                                style={{
                                    border: "none",
                                    borderTop: `3px solid ${dividerColor}`,
                                    margin: "20px 0"
                                }}
                            />
                            {children}
                            {disclaimer && (
                                <Text
                                    style={{
                                        fontFamily: emailFontFamily,
                                        color: "#595959",
                                        fontSize: "12px",
                                        lineHeight: "18px",
                                        margin: "24px 0 0"
                                    }}
                                >
                                    {disclaimer}
                                </Text>
                            )}
                        </EmailSection>
                        <EmailSection style={{ padding: "12px 25px 16px" }}>
                            <span className="email-footer-separator" />
                            <Row>
                                <Column
                                    width="50%"
                                    valign="top"
                                    style={{
                                        textAlign: "left",
                                        paddingRight: "12px",
                                        fontFamily: emailFontFamily,
                                        fontSize: "10px",
                                        lineHeight: "16px",
                                        overflowWrap: "anywhere"
                                    }}
                                >
                                    <If condition="properties.TAILCLOAKIFY_FOOTER_IMPRINT_URL?? && properties.TAILCLOAKIFY_FOOTER_IMPRINT_URL?has_content">
                                        <span className="email-footer-link">
                                            <Link
                                                href={
                                                    "${properties.TAILCLOAKIFY_FOOTER_IMPRINT_URL}"
                                                }
                                                style={{
                                                    fontFamily: emailFontFamily,
                                                    color: "#6b7280",
                                                    fontSize: "10px",
                                                    marginRight: "12px"
                                                }}
                                            >
                                                {t("footer.imprint")}
                                            </Link>
                                        </span>
                                    </If>
                                    <If condition="properties.TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL?? && properties.TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL?has_content">
                                        <span className="email-footer-link">
                                            <Link
                                                href={
                                                    "${properties.TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL}"
                                                }
                                                style={{
                                                    fontFamily: emailFontFamily,
                                                    color: "#6b7280",
                                                    fontSize: "10px",
                                                    marginRight: "12px"
                                                }}
                                            >
                                                {t("footer.dataProtection")}
                                            </Link>
                                        </span>
                                    </If>
                                </Column>
                                <Column
                                    width="50%"
                                    valign="top"
                                    style={{
                                        textAlign: "right",
                                        overflowWrap: "anywhere"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: emailFontFamily,
                                            color: "#6b7280",
                                            fontSize: "10px",
                                            lineHeight: "16px",
                                            margin: 0,
                                            textAlign: "right"
                                        }}
                                    >
                                        {t("footer.year", {
                                            currentYear,
                                            realmName: exp("realmName")
                                        })}
                                    </Text>
                                </Column>
                            </Row>
                        </EmailSection>
                        <EmailSection style={{ padding: "0 25px 16px" }}>
                            <Text
                                style={{
                                    fontFamily: emailFontFamily,
                                    color: "#595959",
                                    fontSize: "10px",
                                    lineHeight: "16px",
                                    textAlign: "center",
                                    margin: 0
                                }}
                            >
                                {t("footer.disclaimer", { realmName: exp("realmName") })}
                                {showContactHelp && (
                                    <IfContactEmail>
                                        {" "}
                                        <ContactHelp email={contactEmail}>
                                            {t("contactHelp")}
                                        </ContactHelp>
                                    </IfContactEmail>
                                )}
                            </Text>
                        </EmailSection>
                    </Container>
                </EmailSection>
            </Body>
        </Html>
    );
};
