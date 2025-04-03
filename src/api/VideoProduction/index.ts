import { fetchData } from "../Base/baseApi";
import { VideoProductionResponse } from "./types";
import { getLocale } from "next-intl/server";

export async function getVideoProduction() {
    const locale = await getLocale();
    return fetchData<VideoProductionResponse>("/video-production/", locale);
}
