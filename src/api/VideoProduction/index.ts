import { baseApi } from "../Base";
import { VideoProductionResponse } from "./types";


export const videoProductionApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getVideoProduction: build.query<VideoProductionResponse, void>({
                query: () => ({
                    url: '/video-production/',
                })
            }),

        }
    }
})

export const { useGetVideoProductionQuery } = videoProductionApi