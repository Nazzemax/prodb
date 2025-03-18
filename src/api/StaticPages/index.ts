

import { baseApi } from "../Base";
import { StaticPage } from "./types";


export const staticPagesApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getStaticPages: build.query<StaticPage[], void>({
                query: () => ({
                    url: '/static-pages/',
                })
            }),
            getStaticPageBySlug: build.query<StaticPage, string>({
                query: (slug) => ({
                    url: `/static-pages/${slug}/`
                })
            })
        }
    }
})

export const {
    useGetStaticPagesQuery,
    useGetStaticPageBySlugQuery,
} = staticPagesApi