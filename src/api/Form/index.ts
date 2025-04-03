import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const formAPI = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        credentials: "include",
        prepareHeaders: (headers) => {
            if (typeof window !== "undefined") {
                const locale = localStorage.getItem("locale") || "ru";
                headers.set("Accept-Language", locale);
                headers.set("Content-Type", "application/json");
            }
            return headers;
        }
    }),
    reducerPath: "formApi",
    tagTypes: [], // ✅ fixed
    endpoints(build) {
        return {
            sendForm: build.mutation({
                query: (params) => ({
                    url: "/form",
                    method: "POST",
                    body: params
                })
            }),
        };
    }
});

export const { useSendFormMutation } = formAPI;
