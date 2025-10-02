import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { getBanners } from "@/api/Banners";
import SingleSliderList from "@/components/organisms/single-slider-list";
import { getMarketingDepartment } from "@/api/Marketing";
import { getCompanyChallenges, getCompanyPartners } from "@/api/Company";
import MarketingDepartment from "@/components/organisms/marketing-department";
import Advantages from "@/components/organisms/advantages/Advantages";
import CompanyChallengeList from "@/components/organisms/company-challenge-list";
import CompanyFeatures from "@/components/organisms/company-features";
import CompanyPostList from "@/components/organisms/company-post-list";
import { getArticles } from "@/api/Article";
import BlogPostList from "@/components/organisms/blog-post-list";
import CompanyPartners from "@/components/organisms/company-partners";
import { getPartnersReviews } from "@/api/PartnerReviews";
import PartnerReviewList from "@/components/organisms/partner-review-list";
import ClientReviewList from "@/components/organisms/client-review-list";
import VideoAboutCompany from "@/components/organisms/video-about-company";
import Award from "@/components/organisms/award";
import FormLayout from "@/components/templates/form-layout";
import { Suspense } from "react";
import { PageLoader } from "@/components/atoms/page-loader";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import { getPromotionTypes } from "@/api/Types";

const NewsBanner = dynamic(() => import("@/components/atoms/NewsBanner/NewsBanner"));

export const revalidate = 60;

const HomePage = async () => {
    const t = await getTranslations("HomePage.section2");
    const banners = await getBanners();
    const marketingDepartmentData = await getMarketingDepartment()
    const companyChallenges = await getCompanyChallenges()
    const articles = await getArticles()
    const partners = await getCompanyPartners()
    const reviews = await getPartnersReviews()
    const promotion_types = await getPromotionTypes();
    
    return (
        <>
            <NewsBanner banners={banners} />
            <Suspense fallback={<PageLoader />}>
                <SingleSliderList banners={banners} />
                <MarketingDepartment data={marketingDepartmentData} />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
                <VideoAboutCompany />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
                <Advantages />
                <CompanyChallengeList data={companyChallenges} />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
                <CompanyFeatures />
                <CompanyPostList />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
                <BlogPostList data={articles} />
            </Suspense>
            <Award
                badgeTitle={t("btn")}
                title={t("title")}
                sub_title={t("description")}
                image={"/images/main_page/diploma.jpg"}
            />
            <Suspense fallback={<PageLoader />}>
                <CompanyPartners data={partners} />
                <PartnerReviewList data={reviews} />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
                <ClientReviewList />
            </Suspense>
            <FormLayout
                nestedForm={<CostCalculationForm promotion_types={promotion_types} />}
            />
        </>
    );
};

export default HomePage;