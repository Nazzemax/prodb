import { getLocale } from "next-intl/server"
import { fetchData } from "../Base/baseApi"
import { ArticlesResponse } from "./types"

export async function getArticles() {
    const locale = await getLocale()
    return fetchData<ArticlesResponse>("/articles/", locale)
}
