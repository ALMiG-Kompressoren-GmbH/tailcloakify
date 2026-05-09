import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../../KcContext";
import type { I18n } from "../../../i18n";
import { clsx } from "keycloakify/tools/clsx";
import { primaryButtonClass } from "../../../buttonClasses";

export default function AccountChooser(
    props: PageProps<Extract<KcContext, { pageId: "account-chooser.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, chosenUser, client } = kcContext;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const displayName = chosenUser.firstName?.trim()
        ? chosenUser.firstName
        : (chosenUser.email ?? chosenUser.username);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={<>Continue to {client.name ?? client.clientId}</>}
        >
            <div id="kc-account-chooser" className="space-y-6">
                <div className="text-center">
                    <p className="text-sm text-gray-600">You're signed in as</p>
                    <div className="mt-2 inline-flex flex-col items-center px-4 py-3 rounded-lg bg-gray-50 border border-gray-200">
                        {(chosenUser.firstName || chosenUser.lastName) && (
                            <strong className="text-gray-900">
                                {[chosenUser.firstName, chosenUser.lastName].filter(Boolean).join(" ")}
                            </strong>
                        )}
                        {chosenUser.email && (
                            <span className="text-sm text-gray-600">{chosenUser.email}</span>
                        )}
                        {!chosenUser.email && chosenUser.username && (
                            <span className="text-sm text-gray-600">{chosenUser.username}</span>
                        )}
                    </div>
                </div>

                <form action={url.loginAction} method="post" className="space-y-2">
                    <button
                        type="submit"
                        name="action"
                        value="continue"
                        className={clsx(primaryButtonClass, "w-full cursor-pointer")}
                    >
                        Continue as {displayName}
                    </button>
                    <button
                        type="submit"
                        name="action"
                        value="switch"
                        className={clsx(
                            kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass"),
                            "w-full cursor-pointer"
                        )}
                    >
                        Use a different account
                    </button>
                </form>
            </div>
        </Template>
    );
}
