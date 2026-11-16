import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    email: string;
}>;

export function ContactHelp({ email, children }: Props) {
    return (
        <>
            {children} <a href={`mailto:${email}`}>{email}</a>.
        </>
    );
}
