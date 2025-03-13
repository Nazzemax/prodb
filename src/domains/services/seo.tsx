"use client";

import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { useGetSiteStatusQuery } from "@/api/Types";
import { ServiceBrandingIcon1 } from "@/assets/services/branding";
import {
    Card1Icon,
    Card2Icon,
    Card3Icon,
    SeoHowWeWork2,
    SeoHowWeWork3,
    SeoHowWeWork4,
    SeoHowWeWork5,
} from "@/assets/services/seo";
import { RequestHandler } from "@/components/atoms/request-handler";
import { SeoFeedbackForm } from "@/components/forms/seo-feedback-form";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { Faq } from "@/components/organisms/faq";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { ServiceStaticCardList } from "@/components/organisms/service-static-card-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { useSeoData, useSeoPostsData, useSeoCardsData } from "@/consts/data";
import { Banner } from "@/consts/types";
import { useAppData } from "@/context/app-context";
import { useSlug } from "@/hooks/useSlug";
import { useTranslations } from "next-intl";

const SeoPage = () => {
    const slug = useSlug();
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug);
    const { data: site_statuses } = useGetSiteStatusQuery();
    const { business_types } = useAppData();
    const t = useTranslations("ServicesPage3");
    const t2 = useTranslations("Buttons");

    const banner: Banner = {
        title: t("banner.title"),
        sub_title: t("banner.description"),
        button_text: t("banner.btn"),
    };

    const seoData = useSeoData();
    const seoPostsData = useSeoPostsData();
    const seoCardsData = useSeoCardsData();
    return (
        <RequestHandler isLoading={isLoading} error={error} data={data}>
            {data && (
                <PageTitleLayout
                    title={data?.title}
                    sub_title={data?.content}
                    bg_image={data.image}
                    button_text={banner.button_text}
                    breadcrumb={[
                        { text: "Главная", href: "/home" },
                        { text: "SEO-оптимизация", href: "/services/seo" },
                    ]}
                    isGray
                />
            )}
            <ServiceStaticCardList title={seoData.title} items={seoData.items} />
            <ServicePostList title={seoPostsData.title} items={seoPostsData.items} />
            <CompanyServiceCardList
                title={seoCardsData.title}
                items={seoCardsData.items}
                button={t2("btn1")}
            />
            <Faq />
            <FormLayout
                title="Узнайте стоимость SEO-оптимизации "
                nestedForm={
                    <SeoFeedbackForm
                        business_types={business_types}
                        site_statuses={site_statuses || []}
                    />
                }
            />
        </RequestHandler>
    );
};

export default SeoPage;
