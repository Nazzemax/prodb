import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://api.boldbrands.pro/api/v1'

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: "include"
    }),
    reducerPath: "baseApi",
    endpoints: () => ({}),
    tagTypes: [""],
});