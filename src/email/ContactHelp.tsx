import type { PropsWithChildren } from "react";
import { emailFontFamily } from "./components";

type Props = PropsWithChildren<{
    email: string;
}>;

export function ContactHelp({ email, children }: Props) {
    return (
        <>
            {children}{" "}
            <a
                href={`mailto:${email}`}
                style={{
                    fontFamily: emailFontFamily,
                    color: "#0078b9",
                    textDecoration: "underline",
                    overflowWrap: "anywhere"
                }}
            >
                {email}
            </a>
            .
        </>
    );
}
