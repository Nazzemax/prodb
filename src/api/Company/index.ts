import { baseApi } from "../Base";
import { baseUrl, fetchData } from "../Base/baseApi";
import {
    CompanyAchievementsResponse,
    CompanyAdvertisingResponse,
    CompanyApplicationResponse,
    CompanyApplicationsResponse,
    CompanyBrandingResponse,
    CompanyChallengesResponse,
    CompanyFeaturesResponse,
    CompanyInfoResponse,
    CompanyPartnersResponse,
    CompanyPostsResponse,
    CompanyServicesResponse,
    CompanyTeamResponse,
    CompanyVideoReviewsResponse
} from "./types";
import { getLocale } from "next-intl/server";

export const companyApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getCompanyAchievements: build.query<CompanyAchievementsResponse, void>({
                query: () => ({
                    url: '/company-achievements/',
                })
            }),
            getCompanyApplications: build.query<CompanyApplicationsResponse, void>({
                query: () => ({
                    url: '/company-applications/',
                })
            }),
            getCompanyApplication: build.query<CompanyApplicationResponse, string>({
                query: (id) => ({
                    url: `/company-applications/${id}/`,
                })
            }),
            getCompanyInfo: build.query<CompanyInfoResponse, void>({
                query: () => ({
                    url: '/company-info/'
                })
            }),
            getCompanyTeam: build.query<CompanyTeamResponse, void>({
                query: () => ({
                    url: '/company-team/'
                })
            }),
            getCompanyVideoReviews: build.query<CompanyVideoReviewsResponse, void>({
                query: () => ({
                    url: '/company-video-reviews/'
                })
            }),
        }
    }
})

export const {
    useGetCompanyAchievementsQuery,
    useGetCompanyApplicationQuery,
    useGetCompanyApplicationsQuery,
    useGetCompanyInfoQuery,
    useGetCompanyTeamQuery,
    useGetCompanyVideoReviewsQuery,
} = companyApi

export async function getVideoReviews(cache: RequestCache = "force-cache") {
    const locale = await getLocale();

    const res = await fetch(`${baseUrl}/company-video-reviews/`, {
        cache,
        headers: {
            "Accept-Language": locale,
        },
    });

    if (!res.ok) {
        console.error(`Ошибка загрузки баннеров: ${res.status} ${res.statusText}`);
        throw new Error("Failed to fetch home page data");
    }

    return res.json();
}

export async function getCompanyChallenges() {
    const locale = await getLocale();
    return fetchData<CompanyChallengesResponse>("/company-challenges/", locale);
}

export async function getCompanyInfo(cache: RequestCache = "force-cache") {
    const locale = await getLocale();
    return fetchData<CompanyInfoResponse>("/company-info/", locale, cache);
}

export async function getCompanyAdvantages() {
    const locale = await getLocale();
    return fetchData<CompanyAchievementsResponse>("/company-achievements/", locale);
}

export async function getCompanyAds() {
    const locale = await getLocale();
    return fetchData<CompanyAdvertisingResponse>("/company-advertising/", locale);
}

export async function getCompanyServices() {
    const locale = await getLocale();
    return fetchData<CompanyServicesResponse>("/company-services/", locale);
}

export async function getCompanyPosts() {
    const locale = await getLocale();
    return fetchData<CompanyPostsResponse>("/company-posts/", locale);
}

export async function getCompanyPartners() {
    const locale = await getLocale();
    return fetchData<CompanyPartnersResponse>("/company-partners/", locale);
}

export async function getCompanyFeatures() {
    const locale = await getLocale();
    return fetchData<CompanyFeaturesResponse>("/company-features/", locale);
}

export async function getCompanyBranding() {
    const locale = await getLocale();
    return fetchData<CompanyBrandingResponse>("/company-brending/", locale);
}
