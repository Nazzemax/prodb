import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["ru", "en", "uz"],
    defaultLocale: "ru",
    pathnames: {
        "/home": {
            en: "/home",
            ru: "/home",
            uz: "/home",
        },
        "/about": {
            en: "/about",
            ru: "/about",
            uz: "/about",
        },
        "/cases": {
            en: "/cases",
            ru: "/cases",
            uz: "/cases",
        },
        "/contacts": {
            en: "/contacts",
            ru: "/contacts",
            uz: "/contacts",
        },
        "/services/branding": {
            en: "/services/branding",
            ru: "/services/branding",
            uz: "/services/branding",
        },
        "/services/smm": {
            en: "/services/smm",
            ru: "/services/smm",
            uz: "/services/smm",
        },
        "/services/video-production": {
            en: "/services/video-production",
            ru: "/services/video-production",
            uz: "/services/video-production",
        },
        "/services/site-creating": {
            en: "/services/site-creating",
            ru: "/services/site-creating",
            uz: "/services/site-creating",
        },
        "/services/marketing-support": {
            en: "/services/marketing-support",
            ru: "/services/marketing-support",
            uz: "/services/marketing-support",
        },
        "/services/crm": {
            en: "/services/crm",
            ru: "/services/crm",
            uz: "/services/crm",
        },
        "/services/seo": {
            en: "/services/seo",
            ru: "/services/seo",
            uz: "/services/seo",
        },
        "/:path*": {
            en: "/:path*",
            ru: "/:path*",
            uz: "/:path*",
        },
    },
});

export type Locale = (typeof routing.locales)[number];

export type AppPathnames =
  | "/home"
  | "/about"
  | "/cases"
  | "/contacts"
  | "/services/branding"
  | "/services/smm"
  | "/services/video-production"
  | "/services/site-creating"
  | "/services/marketing-support"
  | "/services/crm"
  | "/services/seo"
  | "/:path*";
