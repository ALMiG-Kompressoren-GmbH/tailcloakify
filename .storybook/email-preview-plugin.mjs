import { Buffer } from "node:buffer";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { locales, resolveEmailPreview } from "./email-fixtures.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const emailDirectory = path.join(root, "src/email");
const virtualId = "virtual:email-previews";
const resolvedId = `\0${virtualId}`;

export async function renderEmailPreviews(
    onProgress = () => {},
    selectedLocales = locales
) {
    const files = (await readdir(path.join(emailDirectory, "templates")))
        .filter(file => file.endsWith(".tsx"))
        .sort();
    const imports = files.map(
        (file, index) =>
            `import * as template${index} from ${JSON.stringify(`../src/email/templates/${file}`)};`
    );
    const result = await build({
        absWorkingDir: root,
        stdin: {
            contents: [
                ...imports,
                'import i18n, { getMessages } from "../src/email/i18n.ts";',
                "export { getMessages };",
                "export const ready = i18n.isInitialized ? Promise.resolve() : new Promise(resolve => i18n.on('initialized', resolve));",
                `export const templates = [${files.map((_file, index) => `template${index}`).join(",")}];`
            ].join("\n"),
            resolveDir: path.join(root, ".storybook"),
            loader: "ts"
        },
        bundle: true,
        write: false,
        platform: "node",
        format: "esm",
        jsx: "automatic",
        metafile: true,
        plugins: [
            {
                name: "email-preview-node-dependencies",
                setup(builder) {
                    builder.onResolve({ filter: /^[\w@]/ }, args => ({
                        path: import.meta.resolve(args.path),
                        external: true
                    }));
                    builder.onLoad(
                        { filter: /[/\\]email[/\\]i18n\.ts$/ },
                        async args => ({
                            contents:
                                (await readFile(args.path, "utf8")).replace(
                                    "debug: true",
                                    "debug: false"
                                ) +
                                '\nfor (const [locale, resource] of Object.entries(resources)) { i18n.addResourceBundle(locale, "translation", resource.translation, false, true); }',
                            loader: "ts"
                        })
                    );
                }
            }
        ]
    });
    onProgress("Templates compiled");
    const compiled = await import(
        `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`
    );
    onProgress("Templates imported");
    await compiled.ready;
    onProgress("Translations ready");
    const logo = `data:image/png;base64,${(await readFile(path.join(root, "public/favicon-32x32.png"))).toString("base64")}`;
    const previews = {};
    for (const [index, template] of compiled.templates.entries()) {
        const id = files[index].slice(0, -4);
        onProgress(`Rendering ${id}`);
        previews[id] = {};
        for (const locale of selectedLocales) {
            const props = { locale, themeName: "Tailcloakify", plainText: false };
            const html = await template.getTemplate(props);
            const subject = await template.getSubject(props);
            const messages = await compiled.getMessages(props);
            const scenarios = ["default", "no-contact"];
            if (id === "executeActions") scenarios.push("admin", "no-actions");
            if (id === "org-invite") scenarios.push("anonymous");
            previews[id][locale] = Object.fromEntries(
                scenarios.map(scenario => {
                    const options = { locale, scenario, messages, logo };
                    return [
                        scenario,
                        {
                            html: resolveEmailPreview(html, options),
                            subject: resolveEmailPreview(subject, {
                                ...options,
                                plainText: true
                            })
                        }
                    ];
                })
            );
        }
    }
    return {
        previews,
        inputs: Object.keys(result.metafile.inputs)
            .filter(input => input !== "<stdin>")
            .map(input => path.resolve(root, input))
    };
}

export function emailPreviewPlugin() {
    const pending = new Map();
    return {
        name: "storybook-email-previews",
        resolveId(id) {
            if (
                id === virtualId ||
                locales.some(locale => id === `${virtualId}/${locale}`)
            )
                return `\0${id}`;
        },
        async load(id) {
            if (id === resolvedId) {
                return `export default {${locales.map(locale => `${JSON.stringify(locale)}: () => import(${JSON.stringify(`${virtualId}/${locale}`)}).then(module => module.default)`).join(",")}};`;
            }
            const locale = locales.find(locale => id === `${resolvedId}/${locale}`);
            if (!locale) return;
            if (!pending.has(locale)) {
                pending.set(
                    locale,
                    renderEmailPreviews(undefined, [locale]).catch(error => {
                        pending.delete(locale);
                        throw error;
                    })
                );
            }
            const { previews, inputs } = await pending.get(locale);
            for (const input of inputs) this.addWatchFile(input);
            return `export default ${JSON.stringify(Object.fromEntries(Object.entries(previews).map(([id, translations]) => [id, translations[locale]])))};`;
        },
        configureServer(server) {
            server.watcher.add(emailDirectory);
            const invalidate = file => {
                if (!path.resolve(file).startsWith(`${emailDirectory}${path.sep}`))
                    return;
                pending.clear();
                for (const id of [
                    resolvedId,
                    ...locales.map(locale => `${resolvedId}/${locale}`)
                ]) {
                    const module = server.moduleGraph.getModuleById(id);
                    if (module) server.moduleGraph.invalidateModule(module);
                }
                server.ws.send({ type: "full-reload" });
            };
            server.watcher.on("all", (_event, file) => invalidate(file));
        }
    };
}
