import { baseApi } from "../Base";
import { Type } from "./types";


export const typesApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getPromotionTypes: build.query<Type[], void>({
                query: () => ({
                    url: '/promotion-types/'
                })
            }),
            getPurposeTypes: build.query<Type[], void>({
                query: () => ({
                    url: '/purpose-types/'
                })
            }),
            getServiceTypes: build.query<Type[], void>({
                query: () => ({
                    url: '/service-types/'
                })
            }),
            getSiteTypes: build.query<Type[], void>({
                query: () => ({
                    url: '/site-types/'
                })
            }),
            getSiteStatus: build.query<Type[], void>({
                query: () => ({
                    url: '/site-status/'
                })
            }),
            getTaskTypes: build.query<Type[], void>({
                query: () => ({
                    url: '/task-types/'
                })
            }),
            getVideoTypes: build.query<Type[], void>({
                query: () => ({
                    url: '/video-types/'
                })
            }),
            getSocialTypes: build.query<Type[], void>({
                query: () => ({
                    url: '/social-types/'
                })
            }),
        }
    }
})

export const {
    useGetPromotionTypesQuery,
    useGetPurposeTypesQuery,
    useGetServiceTypesQuery,
    useGetSiteTypesQuery,
    useGetSiteStatusQuery,
    useGetTaskTypesQuery,
    useGetVideoTypesQuery,
    useGetSocialTypesQuery,
} = typesApi