import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["ru", "en", "uz"],
    defaultLocale: "ru",
    pathnames: {
        "/:path*": {
            en: "/:path*",
            ru: "/:path*",
            uz: "/:path*",
        },
    },
});

export type Locale = (typeof routing.locales)[number];

export type AppPathnames = keyof typeof routing.pathnames | (string & {});
