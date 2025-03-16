import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.boldbrands.pro/api/v1";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      let locale = "ru";
      if (typeof window !== "undefined") {
        locale = localStorage.getItem("locale") || "ru";
      }
      headers.set("Accept-Language", locale);
      return headers;
    },
  }),
  reducerPath: "baseApi",
  endpoints: () => ({}),
  tagTypes: [""],
});
