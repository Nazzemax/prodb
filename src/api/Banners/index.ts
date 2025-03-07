
import { baseApi } from "../Base";
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
// export const getBanners = async (): Promise<Banner[]> => {
//     const res = await fetch(`https://api.boldbrands.pro/api/v1/banners/`, {
//         cache: "force-cache", // Данные кэшируются при билде (SSG)
//     });

//     if (!res.ok) throw new Error("Ошибка загрузки баннеров");
//     return res.json();
// }