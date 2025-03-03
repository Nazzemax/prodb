import { baseApi } from "../Base";
import {
    ContactFormRequest,
    CrmServiceFormRequest,
    ServiceFormRequest,
    SiteServiceFormRequest,
    SiteStatusFormRequest,
    SmmServiceFormRequest,
    VideoServiceFormRequest
} from "./types";


export const formApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            //главная страница
            sendContactsForm: build.mutation<void, ContactFormRequest>({
                query: (data) => ({
                    url: '/application-form/contacts/',
                    method: "POST",
                    body: data
                })
            }),
            //Страница "О нас"
            sendServiceForm: build.mutation<void, ServiceFormRequest>({
                query: (data) => ({
                    url: '/application-form/service/',
                    method: "POST",
                    body: data
                })
            }),
            //Страница "СММ"
            sendSmmServiceForm: build.mutation<void, SmmServiceFormRequest>({
                query: (data) => ({
                    url: '/application-form/publication/',
                    method: 'POST',
                    body: data
                })
            }),
            //Страница "Видеопродакшн"
            sendVideoServiceForm: build.mutation<void, VideoServiceFormRequest>({
                query: (data) => ({
                    url: '/application-form/video/',
                    method: 'POST',
                    body: data
                })
            }),
            //Страница "Сайтов"
            sendSiteServiceForm: build.mutation<void, SiteServiceFormRequest>({
                query: (data) => ({
                    url: '/application-form/site-type/',
                    method: 'POST',
                    body: data
                })
            }),
            //Страница "СЕО оптимизация"
            sendSiteSeoForm: build.mutation<void, SiteStatusFormRequest>({
                query: (data) => ({
                    url: '/application-form/site-status/',
                    method: 'POST',
                    body: data
                })
            }),
            //Страница "CRM"
            sendSrmServiceForm: build.mutation<void, CrmServiceFormRequest>({
                query: (data) => ({
                    url: '/application-form/task/',
                    method: 'POST',
                    body: data
                })
            }),
            //Страница "О нас" || надо будет спросить
            sendBusinessForm: build.mutation<void, ServiceFormRequest>({
                query: (data) => ({
                    url: '/application-form/business-type/',
                    method: "POST",
                    body: data
                })
            }),
        }
    }
})

export const {
    useSendContactsFormMutation,
    useSendServiceFormMutation,
    useSendSmmServiceFormMutation,
    useSendSiteSeoFormMutation,
    useSendVideoServiceFormMutation,
    useSendSiteServiceFormMutation,
    useSendSrmServiceFormMutation,
    useSendBusinessFormMutation,
} = formApi