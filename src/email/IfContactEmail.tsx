import type { PropsWithChildren } from "react";
import { If } from "keycloakify-emails/jsx-email";

export function IfContactEmail({ children }: PropsWithChildren) {
    return (
        <If condition="properties.TAILCLOAKIFY_EMAIL_CONTACT?? && properties.TAILCLOAKIFY_EMAIL_CONTACT?has_content">
            {children}
        </If>
    );
}
