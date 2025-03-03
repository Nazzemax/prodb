import { baseApi } from "../Base";
import { ServiceOfferingResponse } from "./types";


export const serviceOfferingApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getServiceOffering: build.query<ServiceOfferingResponse, void>({
                query: () => ({
                    url: '/service-offering/',
                })
            }),

        }
    }
})

export const { useGetServiceOfferingQuery } = serviceOfferingApi