import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: any = await requestLocale;

  if (!locale || !routing.locales.includes(locale)) {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
