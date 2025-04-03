import { fetchData } from "../Base/baseApi";
import { StaticPage } from "./types";
import { getLocale } from "next-intl/server";

export async function getStaticPageBySlug(slug: string) {
    const locale = await getLocale();
    return fetchData<StaticPage>(`/static-pages/${slug}/`, locale);
}
