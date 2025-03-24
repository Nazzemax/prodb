
import { baseApi, baseUrl } from "../Base/baseApi";
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
        const { cookies } = await import("next/headers");
        const cookieStore = cookies();
        const acceptLanguage = (await cookieStore).get("NEXT_LOCALE")?.value || "ru";

        const res = await fetch(`${baseUrl}/banners/`, {
            cache,
            headers: {
                "Accept-Language": acceptLanguage,
            },
        });

        if (!res.ok) {
            console.error(`Ошибка загрузки баннеров: ${res.status} ${res.statusText}`);
            throw new Error("Failed to fetch banners");
        }

        return res.json();
    } catch (error) {
        console.error("Ошибка в getBanners:", error);
        throw error;
    }
}