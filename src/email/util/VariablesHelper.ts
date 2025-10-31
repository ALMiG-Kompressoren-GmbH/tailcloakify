import { BaseVars, LinkVars, OrganizationModel, ProfileBean } from "keycloakify-emails/variables";

type UnknownObject = "object";

type Path<T, K extends keyof T = keyof T> = K extends string // Ensure keys are strings
    ? T[K] extends (...args: never[]) => never // Check if the property is a function
        ? `${K}()` | `${K}().${string}` // Append () and handle unknown return types
        : T[K] extends UnknownObject // Special handling for UnknownObject
          ? `${K}.${string}` // Produce `parent.${string}` for UnknownObject
          : T[K] extends object // If it's an object, recurse
            ? `${K}` | `${K}.${Path<T[K]>}` // Combine current key with sub-paths
            : `${K}` // For primitives or other types, just return the key
    : never;

interface CodeVars {
    code: string;
}

/*
* Phase Two
* */
type OtpEmail = {
    emailId: "otp-email.ftl";
    vars: Path<CodeVars & BaseVars>;
};

/**
 * Phase Two
 */
type EmailVerificationWithCode = {
    emailId: "email-verification-with-code.ftl";
    vars: Path<CodeVars>;
};

/**
 * https://github.com/keycloak/keycloak/commit/97cd5f3b8dc3920532903b28c5043e517d90961b
 */
type OrganizationInvite = {
    emailId: "org-invite.ftl";
    vars: Path<
        BaseVars &
            LinkVars & ProfileBean & {
        organization: OrganizationModel
    }
    >;
};

/*
* Phase Two
* */
type MagicLinkEmail = {
    emailId: "magic-link-email.ftl";
    vars: Path<
        BaseVars & LinkVars
    >;
};

type KcEmailVars =
    | OtpEmail
    | EmailVerificationWithCode
    | OrganizationInvite
    | MagicLinkEmail;

function variablesHelper<EmailId extends KcEmailVars["emailId"]>(_emailId: EmailId) {
    return {
        exp: (
            name: (
                | Extract<
                      OtpEmail,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      EmailVerificationWithCode,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      OrganizationInvite,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      MagicLinkEmail,
                      {
                          emailId: EmailId;
                      }
                  >
            )["vars"]
        ) => "${" + name + "}",

        v: (
            name: (
                | Extract<
                      OtpEmail,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      EmailVerificationWithCode,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      OrganizationInvite,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      MagicLinkEmail,
                      {
                          emailId: EmailId;
                      }
                  >
            )["vars"]
        ) => name
    };
}

export {
    type OtpEmail,
    type EmailVerificationWithCode,
    type OrganizationInvite,
    type MagicLinkEmail,
    variablesHelper
};
