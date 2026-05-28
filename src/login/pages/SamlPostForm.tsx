import { useEffect, useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function SamlPostForm(props: PageProps<Extract<KcContext, { pageId: "saml-post-form.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msgStr, msg } = i18n;

    const { samlPost } = kcContext;

    const [htmlFormElement, setHtmlFormElement] = useState<HTMLFormElement | null>(null);

    useEffect(() => {
        if (htmlFormElement === null) {
            return;
        }

        if (samlPost.url === "#") {
            alert("In a real Keycloak the user would be redirected immediately");
            return;
        }

        htmlFormElement.requestSubmit();
    }, [htmlFormElement]);
    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("saml.post-form.title")}>
            <div className="space-y-4 text-center">
                <p className="text-sm text-secondary-600">{msg("saml.post-form.message")}</p>
                <form name="saml-post-binding" method="post" action={samlPost.url} ref={setHtmlFormElement}>
                    {samlPost.SAMLRequest && <input type="hidden" name="SAMLRequest" value={samlPost.SAMLRequest} />}
                    {samlPost.SAMLResponse && <input type="hidden" name="SAMLResponse" value={samlPost.SAMLResponse} />}
                    {samlPost.relayState && <input type="hidden" name="RelayState" value={samlPost.relayState} />}
                    <noscript>
                        <div className="space-y-4">
                            <p className="rounded-lg bg-orange-100 p-4 text-sm text-orange-700">{msg("saml.post-form.js-disabled")}</p>
                            <div className="flex justify-center">
                                <input
                                    type="submit"
                                    value={msgStr("doContinue")}
                                    className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 hover:bg-primary-700"
                                />
                            </div>
                        </div>
                    </noscript>
                </form>
            </div>
        </Template>
    );
}
