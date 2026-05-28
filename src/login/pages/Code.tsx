import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Code(props: PageProps<Extract<KcContext, { pageId: "code.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { code } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", code.error)}
        >
            <div id="kc-code" className="space-y-4">
                {code.success ? (
                    <>
                        <p className="text-sm text-secondary-600">{msg("copyCodeInstruction")}</p>
                        <input
                            id="code"
                            readOnly
                            className={clsx(
                                kcClsx("kcTextareaClass"),
                                "block w-full rounded-md border border-secondary-200 bg-secondary-50 px-4 py-3 font-mono text-sm text-secondary-900 focus:border-primary-300 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                            )}
                            defaultValue={code.code}
                        />
                    </>
                ) : (
                    code.error && (
                        <p
                            id="error"
                            className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(code.error)
                            }}
                        />
                    )
                )}
            </div>
        </Template>
    );
}
