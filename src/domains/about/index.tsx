"use client";

import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import { CompanyInfo } from "@/components/organisms/company-info";
import { CompanyPartners } from "@/components/organisms/company-partners";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { CompanyTeam } from "@/components/organisms/company-team";
import { InfoCard } from "@/components/organisms/info-card";
import { PartnerReviewList } from "@/components/organisms/partner-review-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { OurPhilosophyIcon } from "@/assets/info-card";
import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { RequestHandler } from "@/components/atoms/request-handler";
import { useSlug } from "@/hooks/useSlug";

import { useAppData } from "@/context/app-context";
import { useGetPromotionTypesQuery } from "@/api/Types";
import { useTranslations } from "next-intl";
import { Advantages } from "@/components/organisms/advantages/Advantages";

const AboutPage = () => {
    const t = useTranslations("AboutPage");

    const slug = useSlug();
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug);
    const { data: promotion_types } = useGetPromotionTypesQuery();
    const { business_types } = useAppData();

    const names = {
        title: t("banner.title"),
        btn: t("banner.btn"),
        road: t("banner.road"),
    };

    return (
        <RequestHandler isLoading={isLoading} error={error} data={data}>
            {data && (
                <PageTitleLayout
                    bg_image={data.image}
                    title={data.title}
                    button_text={names.btn}
                    breadcrumb={[
                        { text: "Главная", href: "/home" },
                        { text: names.road, href: "/about" },
                    ]}
                />
            )}
            <InfoCard
                title={t("BusinessResults.title")}
                sub_title={""}
                description={t("BusinessResults.description")}
                image={"/images/about_page/our_philosophy.webp"}
                card_title={t("BusinessResults.subtitle")}
                card_description={t("BusinessResults.subdesk")}
                card_icon={
                    <OurPhilosophyIcon className="w-[80px] h-[80px] sm:w-[118px] sm:h-[118px]" />
                }
            />
            <Advantages />
            <CompanyTeam />
            <CompanyPostList />
            <CompanyPartners />
            <PartnerReviewList />
            <FormLayout
                title={"Рассчитайте стоимость услуги"}
                nestedForm={
                    <CostCalculationForm
                        business_types={business_types}
                        promotion_types={promotion_types || []}
                    />
                }
            />
        </RequestHandler>
    );
};

export default AboutPage;
