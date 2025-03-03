import { baseApi } from "../Base";
import { CRMServiceResponse } from "./types";


export const CRMApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getCRMServices: build.query<CRMServiceResponse, void>({
                query: () => ({
                    url: '/crm-service/',
                })
            }),

        }
    }
})

export const { useGetCRMServicesQuery } = CRMApi