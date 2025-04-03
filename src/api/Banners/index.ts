import { getLocale } from "next-intl/server";
import { fetchData } from "../Base/baseApi";
import { Banner } from "./types";

export async function getBanners() {
    const locale = await getLocale();
    return fetchData<Banner[]>('/banners/', locale);
}
