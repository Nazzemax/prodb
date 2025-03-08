'use client';

import { CompanyPostList } from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { InfoCard } from "@/components/organisms/info-card";
import { IServicePostItem, ServicePostList } from "@/components/organisms/service-post-list";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
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
import { ISmmTeamMembers } from "@/consts/types";
import { ServiceBrandingIcon1, ServiceBrandingIcon2, ServiceBrandingIcon3, ServiceBrandingIcon4, ServiceBrandingIcon5 } from "@/assets/services/branding";
import { useTranslations } from "next-intl";
import { useGetCompanyFeaturesQuery } from "@/api/Company";
import { CompanyFeaturesResponse } from "@/api/Company/types";

const BradingPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug)
    const { data: services_types } = useGetServiceTypesQuery()
    const { data:serviceData } = useGetCompanyFeaturesQuery()
    const { business_types } = useAppData()
    const t = useTranslations("ServicePage4");

    const serviceDataStatic = {
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


    const serviceBrandingData: ISmmTeamMembers = {
        title: "Как мы работаем",
        items: [
            {
                image: <ServiceBrandingIcon1 />,
                number: "01",
                title: "Исследование и анализ",
                description:
            "Погружаемся в ваш бизнес, изучаем целевую аудиторию, рынок и конкурентов, чтобы понять уникальные преимущества вашего предложения.",
            },
            {
                image: <ServiceBrandingIcon2 />,
                number: "02",
                title: "Разработка концепций",
                description:
            "Создаем несколько вариантов названий, логотипов и фирменных стилей, отражающих суть вашего бренда.",
            },
            {
                image: <ServiceBrandingIcon3 />,
                number: "03",
                title: "Согласование и доработка",
                description:
            "Совместно с вами выбираем лучший вариант и вносим необходимые правки для идеального соответствия вашим ожиданиям.",
            },
            {
                image: <ServiceBrandingIcon4 />,
                number: "04",
                title: "Создание логобука и брендбука",
                description:
            "Формализуем все элементы бренда в понятные и удобные документы для дальнейшего использования.",
            },
            {
                image: <ServiceBrandingIcon5 />,
                number: "05",
                title: "Внедрение и поддержка",
                description:
            "Помогаем интегрировать новый бренд во все аспекты вашего бизнеса и предоставляем рекомендации по его развитию.",
            },
        ],
    };

    
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
                title={serviceData && serviceData.title || serviceDataStatic.title}
                items={serviceData && serviceData?.items || serviceDataStatic.items}
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