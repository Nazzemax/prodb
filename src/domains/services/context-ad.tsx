'use client';

import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { RequestHandler } from "@/components/atoms/request-handler";
import { FeedbackForm } from "@/components/forms/feedback-form";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { ServiceStaticCardList } from "@/components/organisms/service-static-card-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { contextAdCardData, contextAdData } from "@/consts/data";
import useScrollToFeedback from "@/hooks/useScrollToFeedback";
import { useSlug } from "@/hooks/useSlug";

const ContextAdsPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug)
    const { ref, scrollToFeedback } = useScrollToFeedback()


    return (
        <RequestHandler
            isLoading={isLoading}
            error={error}
            data={data}
        >
            {data &&
                <PageTitleLayout
                    scrollToFeedback={scrollToFeedback}
                    title={data.title}
                    sub_title={data.content}
                    bg_image={data.image}
                    isGray={true}
                    button_text={"Оставить заявку"}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Контекстная реклама', href: '/services/context-ads' },
                    ]}
                />
            }
            <ServiceStaticCardList
                title={contextAdData.title}
                items={contextAdData.items}
            />
            <CompanyServiceCardList
                title={contextAdCardData.title}
                items={contextAdCardData.items}
            />
            <CompanyPostList />
            <FormLayout
                ref={ref}
                nestedForm={<FeedbackForm />}
            />
        </RequestHandler>
    );
}

export default ContextAdsPage;