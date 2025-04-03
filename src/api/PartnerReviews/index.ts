import { fetchData } from "../Base/baseApi";
import { PartnersReviewsResponse } from "./types";
import { getLocale } from "next-intl/server";

export async function getPartnersReviews() {
    const locale = await getLocale();
    return fetchData<PartnersReviewsResponse>("/partners-reviews/", locale);
}
