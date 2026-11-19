import { render } from "jsx-email";
import type { ReactElement } from "react";
import { emailFontFamily } from "../components";
import { wrapEmailPlainText } from "./plainText.mjs";

export async function renderEmail(template: ReactElement, plainText: boolean) {
    const rendered = await render(template, {
        plainText: plainText
            ? {
                  wordwrap: false,
                  selectors: [
                      { selector: "img", format: "skip" },
                      { selector: '[data-skip="true"]', format: "skip" },
                      { selector: "a", options: { linkBrackets: false } },
                      {
                          selector: 'a[href^="mailto:"]',
                          format: "anchor",
                          options: { ignoreHref: true }
                      },
                      {
                          selector: "span.email-footer-link",
                          format: "block",
                          options: { leadingLineBreaks: 1, trailingLineBreaks: 1 }
                      },
                      {
                          selector: "span.email-footer-separator",
                          format: "horizontalLine",
                          options: {
                              length: 40,
                              leadingLineBreaks: 2,
                              trailingLineBreaks: 2
                          }
                      },
                      { selector: "jsx-email-raw", format: "raw" },
                      { selector: "h1", options: { uppercase: false } }
                  ]
              }
            : false
    });
    return plainText
        ? wrapEmailPlainText(rendered)
        : rendered.replace(
              /(<center style=")(font-size:)/g,
              `$1font-family:${emailFontFamily};$2`
          );
}
