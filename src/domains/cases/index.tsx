import { getCompanyPartners } from "@/api/Company";
import { getPartnersReviews } from "@/api/PartnerReviews";
import { getPosts } from "@/api/Post";
import { getStaticPageBySlug } from "@/api/StaticPages";
import { getPromotionTypes } from "@/api/Types";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import { CasesList } from "@/components/organisms/cases-list";
import ClientReviewList from "@/components/organisms/client-review-list";
import CompanyPartners from "@/components/organisms/company-partners";
import PartnerReviewList from "@/components/organisms/partner-review-list";
import FormLayout from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;

const CasesPage = async () => {
    const [
        data,
        post_data,
        t,
        promotion_types,
        partners,
        reviews,
    ] = await Promise.all([
        getStaticPageBySlug("cases"),
        getPosts(),
        getTranslations("Cases"),
        getPromotionTypes(),
        getCompanyPartners(),
        getPartnersReviews(),
    ]);

    type BannerTexts = {
        title: string;
        btn: string;
        road: string;
    };

    const texts: BannerTexts = {
        title: t("banner.title"),
        btn: t("banner.btn"),
        road: t("banner.road"),
    };

    return (
        <>
            {data && (
                <PageTitleLayout
                    bg_image={data.image}
                    title={texts.title}
                    button_text={texts.btn}
                    breadcrumb={[
                        { text: "Главная", href: "/home" },
                        { text: texts.road, href: "/cases" },
                    ]}
                />
            )}
            <CasesList posts={post_data?.results || []} />
            <ClientReviewList hasBg />
            <CompanyPartners data={partners} />
            <PartnerReviewList data={reviews} />
            <FormLayout nestedForm={<CostCalculationForm promotion_types={promotion_types}  />} />
        </>
    );
};

export default CasesPage;
