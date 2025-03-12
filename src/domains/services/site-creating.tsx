'use client';

import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { useGetSiteTypesQuery } from "@/api/Types";
import { RequestHandler } from "@/components/atoms/request-handler";
import { SiteCreatingFeedbackForm } from "@/components/forms/site-creating-form";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { useAppData } from "@/context/app-context";
import { useSlug } from "@/hooks/useSlug";
import { useTranslations } from "next-intl";



const SiteCreatingPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug)
    const { data: site_types } = useGetSiteTypesQuery()
    const { business_types } = useAppData()
    const t = useTranslations("ServicePage6");

    const serviceData = {
        title: t('Approach.title'),
        description: t('Approach.description'),
        items: [
            {
                image: "/images/services/site/site1.png",
                image_right: false,
                title: t('Approach.items.0.title'),
                sub_title: t('Approach.items.0.sub_title'),
                description: t('Approach.items.0.description'),
            },
            {
                image: "/images/services/site/site2.png",
                image_right: true,
                title: t('Approach.items.1.title'),
                sub_title: t('Approach.items.1.sub_title'),
                description: t('Approach.items.1.description'),
            },
            {
                image: "/images/services/site/site3.png",
                image_right: false,
                title: t('Approach.items.2.title'),
                sub_title: t('Approach.items.2.sub_title'),
                description: t('Approach.items.2.description'),
            },
            {
                image: "/images/services/site/site4.png",
                image_right: true,
                title: t('Approach.items.3.title'),
                sub_title: t('Approach.items.3.sub_title'),
                description: t('Approach.items.3.description'),
            },
        ]
    };
    

    return (
        <RequestHandler
            isLoading={isLoading}
            error={error}
            data={data}
        >
            {data &&
                <PageTitleLayout
                    title={data.title}
                    sub_title={data.content}
                    bg_image={data.image}
                    button_text={t('headerBtn')}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Создание сайтов', href: '/site-creating' },
                    ]}
                    isGray
                />
            }
            <ServicePostList
                title={serviceData.title}
                description={serviceData.description}
                items={serviceData.items}
            />
            <CompanyPostList />
            <FormLayout
                title={"Рассчитайте стоимость услуги "}
                nestedForm={
                    <SiteCreatingFeedbackForm
                        business_types={business_types}
                        site_types={site_types || []} />
                }
            />
        </RequestHandler>
    );
}

export default SiteCreatingPage;