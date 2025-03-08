'use client';

import { CompanyPostList } from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { InfoCard } from "@/components/organisms/info-card";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { serviceBrandingData } from "@/consts/data";
import { FormLayout } from "@/components/templates/form-layout";
import { BrandingFeedbackForm } from "@/components/forms/branding-feedback-form";
import { BrandingIcon } from "@/assets/info-card";
import { useSlug } from "@/hooks/useSlug";
import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { RequestHandler } from "@/components/atoms/request-handler";
import { CompanyBranding } from "@/components/organisms/company-branding";
import { useAppData } from "@/context/app-context";
import { useGetServiceTypesQuery } from "@/api/Types";
import { useRef } from "react";


const serviceData = {
    title: 'Создаем бренд, который говорит сам за себя',
    items: [
        {

            image: "/images/services/branding/brand-1.jpg",
            image_right: false,
            title: 'Нейминг',
            sub_title: 'Названия, которые остаются в памяти',
            description: 'Мы придумываем уникальные и яркие названия, которые отражают суть вашего бизнеса и вызывают эмоции у клиентов.',
            tags: [
                {
                    tags: 'Глубокий анализ рынка и конкурентов',
                },
                {
                    tags: 'Разработка креативных и вдохновляющих концепций'
                }
            ]
        },
        {

            image: "/images/services/branding/brand-2.jpg",
            image_right: true,
            title: 'Дизайн логотипа и фирменного стиля',
            sub_title: 'Названия, которые остаются в памяти',
            description: 'Мы придумываем уникальные и яркие названия, которые отражают суть вашего бизнеса и вызывают эмоции у клиентов.',
            tags: [
                {
                    tags: 'Глубокий анализ рынка и конкурентов',
                },
                {
                    tags: 'Разработка креативных и вдохновляющих концепций'
                }
            ]
        },
        {

            image: "/images/services/branding/brand-3.jpg",
            image_right: false,
            title: 'Брендбук',
            sub_title: 'Названия, которые остаются в памяти',
            description: 'Мы придумываем уникальные и яркие названия, которые отражают суть вашего бизнеса и вызывают эмоции у клиентов.',
            tags: [
                {
                    tags: 'Глубокий анализ рынка и конкурентов',
                },
                {
                    tags: 'Разработка креативных и вдохновляющих концепций'
                }
            ]
        },
    ]
}

const BradingPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug)
    const { data: services_types } = useGetServiceTypesQuery()
    const { business_types } = useAppData()

    const feedbackRef = useRef<HTMLDivElement>(null);

    const scrollToFeedback = () => {
        feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
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
                    button_text={"Получить консультацию"}
                    scrollToFeedback={scrollToFeedback}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Брендинг', href: '/services/branding' },
                    ]}
                    isGray
                />}
            <CompanyBranding />
            <ServicePostList
                scrollToFeedback={scrollToFeedback}
                title={serviceData.title}
                items={serviceData.items}
            />
            <CompanyServiceCardList
                title={serviceBrandingData.title}
                items={serviceBrandingData.items}
            />
            <CompanyPostList />
            <InfoCard
                title={"Дизайн-поддержка "}
                sub_title={"Ваш внешний отдел дизайна"}
                description={"Мы регулярно обновляем визуальные материалы вашего бренда, чтобы он оставался современным и привлекательным. Наши эксперты быстро адаптируют дизайн под новые тренды и платформы, поддерживая интерес аудитории."}
                image={"/images/services/branding/card_img.webp"}
                card_title={"Наши эксперты"}
                card_description={"быстро адаптируют дизайн под новые тренды и платформы, поддерживая интерес аудитории. С нами ваш бренд всегда выделяется и эффективно взаимодействует с клиентами."}
                card_icon={<BrandingIcon />}
            />
            <FormLayout
                ref={feedbackRef}
                title={"Узнайте стоимость разработки бренда"}
                nestedForm={
                    <BrandingFeedbackForm
                        business_types={business_types}
                        services_types={services_types || []}
                    />
                }
            />
        </RequestHandler>
    );
}

export default BradingPage;