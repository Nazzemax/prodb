import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export async function fetchData<T>(
    endpoint: string,
    locale: string = 'ru',
    cache: RequestCache = "force-cache"
): Promise<T> {
    try {
        const res = await fetch(`${baseUrl}${endpoint}`, {
            next: { revalidate: 60 },
            cache,
            headers: {
                "Accept-Language": locale
            }
        })

        if (!res.ok) {
            console.error("Ошибка загрузки:", res.status, res.statusText)
            throw new Error(`Failed to fetch ${endpoint}`)
        }

        return res.json()
    } catch (error) {
        console.error(`Ошибка в ${endpoint}:`, error)
        throw error
    }
}
