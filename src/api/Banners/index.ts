
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
