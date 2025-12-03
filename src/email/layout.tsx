import { Body, Container, Head, Html, Preview, Tailwind } from "jsx-email";
import { PropsWithChildren, ReactNode } from "react";
import { createVariablesHelper } from "keycloakify-emails/variables";
import i18n from "./i18n";

const { exp } = createVariablesHelper("email-test.ftl");
const currentYear = new Date().getFullYear();
const backgroundImage = exp("properties.TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE_URL");
const emailLogo = exp("properties.TAILCLOAKIFY_EMAIL_LOGO");
const templateFont = exp("properties.TAILCLOAKIFY_EMAIL_FONT_FAMILY");
const contactEmail = exp("properties.TAILCLOAKIFY_EMAIL_CONTACT");

export const EmailLayout = ({
    locale,
    children,
    preview,
    disclaimer
}: PropsWithChildren<{ preview: ReactNode; locale: string; disclaimer: ReactNode }>) => {
    const t = i18n.getFixedT(locale);

    return (
        <Html lang={locale}>
            <Head>
                <title> {t("header.title", { realmName: exp("realmName") })} </title>
            </Head>
            <Preview>{preview}</Preview>
            <Body
                style={{
                    margin: 0,
                    padding: 0,
                    backgroundColor: "#ecf9ff",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    ...(backgroundImage
                        ? {
                              backgroundImage: `url('${backgroundImage}')`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover"
                          }
                        : {}),
                    fontFamily: templateFont
                        ? `'${templateFont}'`
                        : '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'
                }}
            >
                <Tailwind>
                    <Container>
                        <table
                            cellPadding={0}
                            cellSpacing={0}
                            border={0}
                            align="center"
                            style={{
                                paddingTop: "2.5rem",
                                paddingBottom: "2.5rem",
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                                maxWidth: "512px",
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td align="center">
                                        {/* Card */}
                                        <table
                                            cellPadding={0}
                                            cellSpacing={0}
                                            border={0}
                                            width="100%"
                                            style={{
                                                backgroundColor: "#ffffff",
                                                padding: "2.5rem 1rem",
                                                borderRadius: "0.5rem",
                                                boxShadow:
                                                    "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)"
                                            }}
                                        >
                                            <tbody>
                                                <tr>
                                                    <td align="center">
                                                        {/* Logo */}
                                                        <img
                                                            src={emailLogo}
                                                            alt={exp("realmName")}
                                                            style={{ height: "40px" }}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        align="left"
                                                        style={{
                                                            marginTop: "2.5rem",
                                                            paddingTop: "1.5rem"
                                                        }}
                                                    >
                                                        {children}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>{disclaimer}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Footer */}
                        <table
                            cellPadding={0}
                            cellSpacing={0}
                            border={0}
                            align="center"
                            style={{
                                width: "100%",
                                margin: "0.5rem",
                                fontSize: "0.875rem",
                                opacity: 0.8,
                                color: "black"
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            textAlign: "left",
                                            fontSize: "0.5rem"
                                        }}
                                    >
                                        {t("footer.disclaimer", {
                                            realmName: exp("realmName"),
                                            contactEmail: contactEmail
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ color: "black", textAlign: "center" }}>
                                        <br />
                                        {t("footer.year", {
                                            currentYear,
                                            realmName: exp("realmName")
                                        })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </Tailwind>
            </Body>
        </Html>
    );
};
