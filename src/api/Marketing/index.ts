import { baseApi } from "../Base";
import { fetchData } from "../Base/baseApi";
import { MarketingDepartmentResponse, MarketingSupportResponse } from "./types";


export const MarketingApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getMarketingDepartment: build.query<MarketingDepartmentResponse, void>({
                query: () => ({
                    url: '/marketing-department/',
                })
            }),
            getMarketingSupport: build.query<MarketingSupportResponse, void>({
                query: () => ({
                    url: '/marketing-support/'
                })
            }),
            getDesignSupport: build.query<MarketingDepartmentResponse, void>({
                query: () => ({
                    url: '/design-development/'
                })
            })

        }
    }
})

export const {
    useGetDesignSupportQuery,
    useGetMarketingDepartmentQuery,
    useGetMarketingSupportQuery
} = MarketingApi

export async function getMarketingDepartment(cache: RequestCache = "force-cache") {
    return fetchData<MarketingDepartmentResponse>("/marketing-department/", cache)
}