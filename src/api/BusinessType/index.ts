import { baseApi } from "../Base";
import { Type } from "../Types/types";

export const businessTypes = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getBusinessTypes: build.query<Type[], void>({
                query: () => ({
                    url: '/business-types/',
                })
            })
        }
    }
})

export const { useGetBusinessTypesQuery } = businessTypes 