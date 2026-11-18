import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveEmailPreview } from "./email-fixtures.mjs";
import { renderEmailPreviews } from "./email-preview-plugin.mjs";

test("email preview resolves and escapes fixture values", () => {
    assert.equal(resolveEmailPreview("${realmName}: ${code}"), "Tailcloakify: 123456");
    assert.equal(
        resolveEmailPreview("${link}"),
        "https:&#x2F;&#x2F;example.com&#x2F;account&#x2F;verify"
    );
});

test("email preview selects nested action branches and localizes the list", () => {
    const source =
        "<#if (requiredActions![])?seq_contains('UPDATE_PASSWORD') && (requiredActions![])?seq_contains('UPDATE_PROFILE')>Welcome<#else>Admin<#if (requiredActions![])?size gt 0><#list (requiredActions![]) as r><li>${msg('requiredAction.' + r)}</li></#list></#if></#if>";
    assert.equal(resolveEmailPreview(source), "Welcome");
    assert.equal(resolveEmailPreview(source, { scenario: "no-actions" }), "Admin");
    assert.equal(
        resolveEmailPreview(source, {
            scenario: "admin",
            messages: {
                "requiredAction.VERIFY_EMAIL": "Verify email",
                "requiredAction.CONFIGURE_TOTP": "Configure OTP"
            }
        }),
        "Admin<li>Verify email</li><li>Configure OTP</li>"
    );
});

test("email preview selects anonymous invitations and optional contact", () => {
    assert.equal(
        resolveEmailPreview(
            "<#if firstName?? && lastName??>${firstName}<#else>Guest</#if>",
            { scenario: "anonymous" }
        ),
        "Guest"
    );
    assert.equal(
        resolveEmailPreview(
            "<#if properties.TAILCLOAKIFY_EMAIL_CONTACT?? && properties.TAILCLOAKIFY_EMAIL_CONTACT?has_content>Contact</#if>",
            { scenario: "no-contact" }
        ),
        ""
    );
});

test("email preview fails closed for unknown or unbalanced FreeMarker", () => {
    for (const source of [
        "${unknown}",
        "<#if unknown>test</#if>",
        "<#if firstName?? && lastName??>test",
        "<#list other as item>test</#list>",
        "<#else>"
    ]) {
        assert.throws(() => resolveEmailPreview(source), /email preview|FreeMarker/);
    }
});

test(
    "all email templates render in every locale and supported scenario",
    { timeout: 60000 },
    async () => {
        const { previews } = await renderEmailPreviews(message =>
            console.info(message)
        ).catch(error => {
            throw new Error(error.message);
        });
        assert.equal(Object.keys(previews).length, 14);
        let count = 0;
        for (const [template, translations] of Object.entries(previews)) {
            assert.equal(Object.keys(translations).length, 7, template);
            for (const [locale, scenarios] of Object.entries(translations)) {
                for (const [scenario, preview] of Object.entries(scenarios)) {
                    const label = `${template}/${locale}/${scenario}`;
                    assert.ok(preview.subject, label);
                    assert.match(preview.html, /<html/, label);
                    assert.ok(
                        /data:image(?:\/|&#x2F;)png;base64,/.test(preview.html),
                        `${label}: embedded logo`
                    );
                    assert.doesNotMatch(preview.html, /\$\{|<\/?#/, label);
                    count++;
                }
            }
        }
        assert.equal(count, 217);
        assert.match(previews["email-verification"].de.default.subject, /bestätigen/);
        assert.match(previews["email-verification"].en.default.subject, /[Vv]erif/);
    }
);
