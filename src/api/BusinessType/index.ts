import { baseApi } from "../Base"
import { Type } from "../Types/types"
import { ParallaxData } from "./types"
import { fetchData } from "../Base/baseApi"
import { getLocale } from "next-intl/server" // 👈 used only on server

export const businessTypes = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getBusinessTypes: build.query<Type[], void>({
                query: () => ({
                    url: "/business-types/",
                }),
                // Optional: provide tagTypes: ['BusinessTypes']
            }),
        }
    },
})

export const { useGetBusinessTypesQuery } = businessTypes

// ✅ Locale-aware version, works in server components or loaders
export async function getBusinessCards() {
    const locale = await getLocale()
    return fetchData<ParallaxData>("/business-cards/", locale)
}

export async function getBusinessTypes(cache: RequestCache = "force-cache") {
    const locale = await getLocale()
    return fetchData<Type[]>("/business-types/", locale, cache)
}
