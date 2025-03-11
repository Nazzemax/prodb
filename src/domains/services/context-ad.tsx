"use client";

import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { RequestHandler } from "@/components/atoms/request-handler";
import { FeedbackForm } from "@/components/forms/feedback-form";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { ServiceStaticCardList } from "@/components/organisms/service-static-card-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { useContextAdCardData, useContextAdData } from "@/consts/data";
import { Banner } from "@/consts/types";
import useScrollToFeedback from "@/hooks/useScrollToFeedback";
import { useSlug } from "@/hooks/useSlug";
import { useTranslations } from "next-intl";

const ContextAdsPage = () => {
    const slug = useSlug();
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug);
    const { ref, scrollToFeedback } = useScrollToFeedback();
    const contextAdData = useContextAdData();
    const contextAdCardData = useContextAdCardData();
    const t = useTranslations("ServicesPage2");
    const t2 = useTranslations("Buttons");

    const banner: Banner = {
        title: t("banner.title"),
        sub_title: t("banner.description"),
        button_text: t("banner.btn"),
    };

    return (
        <RequestHandler isLoading={isLoading} error={error} data={data}>
            {data && (
                <PageTitleLayout
                    scrollToFeedback={scrollToFeedback}
                    title={banner.title}
                    sub_title={banner.sub_title}
                    bg_image={data.image}
                    isGray={true}
                    button_text={banner.button_text}
                    breadcrumb={[
                        { text: "Главная", href: "/home" },
                        { text: "Контекстная реклама", href: "/services/context-ads" },
                    ]}
                />
            )}
            <ServiceStaticCardList
                title={contextAdData.title}
                items={contextAdData.items}
            />
            <CompanyServiceCardList
                title={contextAdCardData.title}
                items={contextAdCardData.items}
                button={t2("btn1")}
            />
            <CompanyPostList />
            <FormLayout ref={ref} nestedForm={<FeedbackForm />} />
        </RequestHandler>
    );
};

export default ContextAdsPage;
