
import { baseApi } from "../Base";
import { baseUrl } from "../Base/baseApi";
import { Banner } from "./types";

const bannersApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getBanners: build.query<Banner[], void>({
                query: () => ({
                    url: "/banners/",
                    method: "GET",
                }),
            }),
        };
    },
});

export const { useGetBannersQuery } = bannersApi;


export async function getBanners(cache: RequestCache = "force-cache") {
    try {
        let acceptLanguage = "ru";

        if (typeof window !== "undefined") {
            acceptLanguage = localStorage.getItem("i18nextLng") || "ru";
        } else {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies(); // Нужно дождаться промиса
            acceptLanguage = cookieStore.get("NEXT_LOCALE")?.value || "ru";
        }

        const res = await fetch(`${baseUrl}/banners/`, {
            cache,
            headers: {
                "Accept-Language": acceptLanguage,
            },
        });

        if (!res.ok) {
            console.error(`Ошибка загрузки баннеров: ${res.status} ${res.statusText}`);
            throw new Error("Failed to fetch home page data");
        }

        return res.json();
    } catch (error) {
        console.error("Ошибка в getBanners:", error);
        throw error;
    }
}