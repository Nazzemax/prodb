

import { baseApi } from "../Base";
import { FaqResponse } from "./types";


export const FaqApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getFaqs: build.query<FaqResponse, void>({
                query: () => ({
                    url: '/faq/',
                })
            }),

        }
    }
})

export const { useGetFaqsQuery} = FaqApi