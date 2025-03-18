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