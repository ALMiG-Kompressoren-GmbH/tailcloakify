import { Button, Column, Link, Row, Text } from "jsx-email";
import { If } from "keycloakify-emails/jsx-email";
import type { ComponentProps, PropsWithChildren } from "react";

export const emailFontFamily = "Arial, sans-serif";

export function EmailSection({
    children,
    style,
    ...props
}: ComponentProps<typeof Column>) {
    return (
        <Row>
            <Column
                {...props}
                style={{
                    fontFamily: emailFontFamily,
                    color: "#262626",
                    fontSize: "14px",
                    lineHeight: "22px",
                    ...style
                }}
            >
                {children}
            </Column>
        </Row>
    );
}

export function EmailText({ children }: PropsWithChildren) {
    return (
        <Text
            style={{
                fontFamily: emailFontFamily,
                color: "#262626",
                fontSize: "14px",
                lineHeight: "22px",
                margin: "16px 0",
                overflowWrap: "anywhere"
            }}
        >
            {children}
        </Text>
    );
}

export function EmailButton({ href, children }: PropsWithChildren<{ href: string }>) {
    const caption =
        typeof children === "string"
            ? children.trim().replace(/\.+$/, "").trimEnd()
            : children;

    return (
        <EmailSection style={{ padding: "20px 0" }}>
            <Button
                href={href}
                width={550}
                height={40}
                borderRadius={6}
                backgroundColor="#2563eb"
                textColor="#ffffff"
                fontSize={14}
                borderSize={0}
                style={{
                    fontFamily: emailFontFamily,
                    display: "block",
                    boxSizing: "border-box",
                    padding: "8px 16px",
                    lineHeight: "24px",
                    fontWeight: 400,
                    whiteSpace: "normal",
                    overflowWrap: "anywhere"
                }}
            >
                {caption}
            </Button>
            <If condition="(properties.TAILCLOAKIFY_EMAIL_SHOW_BUTTON_LINK!'false')?lower_case == 'true'">
                <Text
                    data-skip="true"
                    style={{
                        fontFamily: emailFontFamily,
                        margin: "8px 0 0",
                        fontSize: "11px",
                        lineHeight: "16px",
                        textAlign: "left",
                        overflowWrap: "anywhere",
                        wordBreak: "break-all"
                    }}
                >
                    <Link
                        href={href}
                        style={{
                            fontFamily: emailFontFamily,
                            color: "#737373",
                            fontSize: "11px",
                            lineHeight: "16px",
                            textDecoration: "underline",
                            overflowWrap: "anywhere",
                            wordBreak: "break-all"
                        }}
                    >
                        {href}
                    </Link>
                </Text>
            </If>
        </EmailSection>
    );
}

export function EmailNotice({
    children,
    highlight = false
}: PropsWithChildren<{ highlight?: boolean }>) {
    if (!highlight) return <>{children}</>;

    return (
        <EmailSection style={{ padding: "16px 0" }}>
            <EmailSection bgColor="#f1f1f1" style={{ padding: "8px 16px" }}>
                {children}
            </EmailSection>
        </EmailSection>
    );
}

export function EmailCode({ children }: PropsWithChildren) {
    return (
        <EmailNotice highlight>
            <Text
                style={{
                    fontFamily: emailFontFamily,
                    color: "#0078b9",
                    fontSize: "28px",
                    lineHeight: "36px",
                    fontWeight: 700,
                    textAlign: "center",
                    margin: "12px 0",
                    overflowWrap: "anywhere"
                }}
            >
                {children}
            </Text>
        </EmailNotice>
    );
}
