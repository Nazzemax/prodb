import { fetchData } from "../Base/baseApi";
import { Type } from "./types";
import { getLocale } from "next-intl/server";

export async function getPromotionTypes() {
    const locale = await getLocale();
    return fetchData<Type[]>("/promotion-types/", locale);
}

export async function getServiceTypes() {
    const locale = await getLocale();
    return fetchData<Type[]>("/service-types/", locale);
}

export async function getTaskTypes() {
    const locale = await getLocale();
    return fetchData<Type[]>("/task-types/", locale);
}

export async function getSiteStatus() {
    const locale = await getLocale();
    return fetchData<Type[]>("/site-status/", locale);
}

export async function getSiteTypes() {
    const locale = await getLocale();
    return fetchData<Type[]>("/site-types/", locale);
}

export async function getSocialTypes() {
    const locale = await getLocale();
    return fetchData<Type[]>("/social-types/", locale);
}

export async function getVideoTypes() {
    const locale = await getLocale();
    return fetchData<Type[]>("/video-types/", locale);
}