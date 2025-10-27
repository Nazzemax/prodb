import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { unstable_cache } from "next/cache"

export const baseUrl = 'https://api.boldbrands.pro/api/v1'

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: "include",
        prepareHeaders: (headers) => {
            if (typeof window !== "undefined") {
                const locale = localStorage.getItem("locale") || "ru"
                headers.set("Accept-Language", locale)
            }
            return headers
        }
    }),
    reducerPath: "baseApi",
    endpoints: () => ({}),
    tagTypes: []
})

async function requestData<T>(endpoint: string, locale: string, cache: RequestCache) {
    try {
        const shouldShareCache = cache === "force-cache" || cache === "default"
        let nextOptions: { revalidate: number; tags: string[] } | undefined

        if (shouldShareCache) {
            nextOptions = {
                revalidate: 3600,
                tags: [`api:${endpoint}`],
            }
        }

        const response = await fetch(`${baseUrl}${endpoint}`, {
            cache,
            headers: {
                "Accept-Language": locale,
            },
            next: nextOptions,
        })

        if (!response.ok) {
            console.error("Ошибка загрузки:", response.status, response.statusText)
            throw new Error(`Failed to fetch ${endpoint}`)
        }

        return (await response.json()) as T
    } catch (error) {
        console.error(`Ошибка в ${endpoint}:`, error)
        throw error
    }
}

const cachedRequestData = unstable_cache(
    async (endpoint: string, locale: string, cache: RequestCache) =>
        requestData(endpoint, locale, cache),
    ["fetchData"],
    { revalidate: 3600 }
)

export async function fetchData<T>(
    endpoint: string,
    locale: string = 'ru',
    cache: RequestCache = "force-cache"
): Promise<T> {
    const shouldShareCache = cache === "force-cache" || cache === "default"

    if (!shouldShareCache) {
        return requestData<T>(endpoint, locale, cache)
    }

    return cachedRequestData(endpoint, locale, cache) as Promise<T>
}
