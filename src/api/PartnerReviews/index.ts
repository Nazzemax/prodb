import { baseApi } from "../Base";
import { PartnersReviewsResponse } from "./types";


export const partnersReviewsApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getPartnersReviews: build.query<PartnersReviewsResponse, void>({
                query: () => ({
                    url: '/partners-reviews/',
                })
            }),

        }
    }
})

export const { useGetPartnersReviewsQuery } = partnersReviewsApi