"use client";

// import { useGetCompanyVideoReviewsQuery } from "@/api/Company";
import { useGetPostsQuery } from "@/api/Post";
import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { RequestHandler } from "@/components/atoms/request-handler";
import { FeedbackForm } from "@/components/forms/feedback-form";
import { CasesList } from "@/components/organisms/cases-list";
import { ClientReviewList } from "@/components/organisms/client-review-list";
import { CompanyPartners } from "@/components/organisms/company-partners";
import { PartnerReviewList } from "@/components/organisms/partner-review-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { useSlug } from "@/hooks/useSlug";
import { useTranslations } from "next-intl";

const CasesPage = () => {
    const slug = useSlug();
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug);
    const { data: post_data } = useGetPostsQuery();
    // const { data: reviews } = useGetCompanyVideoReviewsQuery();
    const t = useTranslations("Cases");

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
        <RequestHandler isLoading={isLoading} error={error} data={data}>
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
            {/* {reviews && ( */}
            <ClientReviewList
                hasBg
            //   title={reviews[1].title}
            //   sub_title={reviews[1].sub_title}
            //   reviews={reviews[1].items}
            />
            {/* )} */}
            <CompanyPartners />
            <PartnerReviewList />
            <FormLayout nestedForm={<FeedbackForm />} />
        </RequestHandler>
    );
};

export default CasesPage;
