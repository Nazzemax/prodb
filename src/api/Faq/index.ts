import { fetchData } from "../Base/baseApi";
import { Faq } from "./types";
import { getLocale } from "next-intl/server";

export async function getFaqs() {
    const locale = await getLocale();
    return fetchData<Faq[]>("/faq/", locale);
}
