import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { Award } from "@/components/organisms/award";
import { CompanyFeatures } from "@/components/organisms/company-features";
import { CompanyPartners } from "@/components/organisms/company-partners";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { FeedbackForm } from "@/components/forms/feedback-form";
import { FormLayout } from "@/components/templates/form-layout";
import { PartnerReviewList } from "@/components/organisms/partner-review-list";
import { Advantages } from "@/components/organisms/advantages/Advantages";
import NewsBanner from '@/components/atoms/NewsBanne/NewsBanne';
import { VideoAboutCompany } from "@/components/organisms/video-about-company";
import { getBanners } from "@/api/Banners";
import { ClientReviewList } from "@/components/organisms/client-review-list";
import { BlogPostList } from "@/components/organisms/blog-post-list";
import SingleSliderList from "@/components/organisms/single-slider-list";
import { getMarketingDepartment } from "@/api/Marketing";
import { getCompanyChallenges } from "@/api/Company";


const FloatingWhatsapp = dynamic(() => import("@/components/atoms/floating-whatsapp"));
const MarketingDepartment = dynamic(() => import("@/components/organisms/marketing-department"));
const CompanyChallengeList = dynamic(() => import("@/components/organisms/company-challenge-list"));

const HomePage = async () => {
    const t = await getTranslations("HomePage");
    const banners = await getBanners();
    const MarketingDepartmentData = await getMarketingDepartment();
    const companyChallenges = await getCompanyChallenges();

    return (
        <>
            <FloatingWhatsapp />
            <NewsBanner />
            <SingleSliderList banners={banners} />
            <MarketingDepartment data={MarketingDepartmentData} />
            <VideoAboutCompany />
            <Advantages />
            <CompanyChallengeList data={companyChallenges} />
            <CompanyFeatures />
            <CompanyPostList />
            <BlogPostList />
            <Award
                badgeTitle={t("section2.btn")}
                title={t("section2.title")}
                sub_title={t("section2.description")}
                image={"/images/main_page/diploma.jpg"}
            />
            <CompanyPartners />
            <PartnerReviewList />
            <ClientReviewList />
            <FormLayout
                title={"Получите бесплатную консультацию"}
                nestedForm={<FeedbackForm />}
            />
        </>
    );
};

export default HomePage;