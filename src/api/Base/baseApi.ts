import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseUrl = 'https://api.boldbrands.pro/api/v1'

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: "include",
        prepareHeaders: (headers) => {
            if (typeof window !== "undefined") {
                const locale = localStorage.getItem("locale") || "ru";
                headers.set("Accept-Language", locale);
            }
            return headers;
        }
    }),
    reducerPath: "baseApi",
    endpoints: () => ({}),
    tagTypes: [""],
});

export async function fetchData<T>(endpoint: string, cache: RequestCache = "force-cache"): Promise<T> {
    try {
        let acceptLanguage = "ru"

        if(typeof window !== "undefined") {
            acceptLanguage = localStorage.getItem('locale') || "ru"
        } else {
            const { cookies } = await import("next/headers")
            const cookieStore = await cookies();
            acceptLanguage = cookieStore.get("NEXT_LOCALE")?.value || "ru";
        }

        const res = await fetch(`${baseUrl}${endpoint}`, {
            cache,
            headers: {
                "Accept-Language": acceptLanguage,
            }
        })

        if(!res.ok) {
            console.log("Ошибка загрузки:", res.status, res.statusText)
            throw new Error(`Failed to fetch ${endpoint}`)
        }
        
        return res.json()
    } catch (error) {
        console.error(`Ошибка в ${endpoint}:`, error);
        throw error;
    }
}