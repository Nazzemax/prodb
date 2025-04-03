import { baseApi } from "../Base";
import { fetchData } from "../Base/baseApi";
import { PrintingServicesResponse, ServiceOfferingResponse } from "./types";
import { getLocale } from "next-intl/server";

export const serviceOfferingApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getServiceOffering: build.query<ServiceOfferingResponse, void>({
                query: () => ({
                    url: '/service-offering/',
                })
            }),
            getPrintingServices: build.query<PrintingServicesResponse, void>({
                query: () => ({
                    url: '/printing-service/'
                })
            })
        }
    }
})

export const {
    useGetServiceOfferingQuery,
    useGetPrintingServicesQuery,
} = serviceOfferingApi

export async function getPrintingServices() {
    const locale = await getLocale();
    return fetchData<PrintingServicesResponse>("/printing-service/", locale);
}