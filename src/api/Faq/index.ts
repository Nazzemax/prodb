

import { baseApi } from "../Base";
import { Faq } from "./types";


export const FaqApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getFaqs: build.query<Faq[], void>({
                query: () => ({
                    url: '/faq/',
                })
            }),

        }
    }
})

export const { useGetFaqsQuery } = FaqApi