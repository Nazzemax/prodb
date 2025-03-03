'use client'

import { useGetCompanyAdvertisingQuery } from "@/api/Company";
import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { useGetSocialTypesQuery } from "@/api/Types";
import { RequestHandler } from "@/components/atoms/request-handler";
import { SmmFeedbackForm } from "@/components/forms/smm-feedback-form";
import { ClientReviewList } from "@/components/organisms/client-review-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { ServiceStaticCardList } from "@/components/organisms/service-static-card-list";
import { SMMPartnersCarousel } from "@/components/organisms/smm-partner-carousel";
import { SmmStats } from "@/components/organisms/smm-stats";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { smmCreatingAdData, smmTeamMembers } from "@/consts/data";
import { useAppData } from "@/context/app-context";
import useScrollToFeedback from "@/hooks/useScrollToFeedback";
import { useSlug } from "@/hooks/useSlug";
import { useRef } from "react";


const serviceData = {
    title: 'Подход, который выделит ваш бренд среди конкурентов',
    items: [
        {
            image: "/images/services/smm/smmBg-1-min.jpg",
            image_right: false,
            title: 'Погружение в ваш бизнес',
            description: 'Анализируем рынок, изучаем конкурентов, выявляем особенности вашей целевой аудитории. Вместе с вами формируем цели продвижения.',
        },
        {
            image: "/images/services/smm/smmBg-2-min.jpg",
            image_right: true,
            title: 'Разработка стратегии',
            description: 'Создаем уникальную SMM-стратегию, которая выделяет ваш бренд и приносит реальные результаты.',
        },
        {
            image: "/images/services/smm/smmBg-3-min.jpg",
            image_right: false,
            title: 'Создание контента',
            description: 'Креатив-команда: мобилограф, копирайтер и дизайнер — разрабатывает визуалы и тексты, которые привлекают внимание и побуждают к покупкам.',
        },
        {
            image: "/images/services/smm/smmBg-4-min.jpg",
            image_right: true,
            title: 'Настройка рекламы',
            description: 'Таргетолог настраивает рекламу так, чтобы привлекать вашу целевую аудиторию и создавать поток заявок.',
        },
        {
            image: "/images/services/smm/smmBg-5-min.jpg",
            image_right: false,
            title: 'Инфлюенс-маркетинг ',
            description: 'Подбираем лидеров мнений, которые помогают увеличить охват и доверие к вашему бренду.',
        },
        {
            image: "/images/services/smm/smmBg-6-min.jpg",
            image_right: true,
            title: 'Запуск и управление проектом',
            description: 'Project Manager следит за выполнением сроков, результатами работы команды и постоянно держит вас в курсе.',
        },
        {
            image: "/images/services/smm/smmBg-7-min.jpg",
            image_right: false,
            title: 'Аналитика и оптимизация',
            description: 'Еженедельно анализируем эффективность контента и рекламы, вносим улучшения и корректируем стратегии для максимального результата.',
        },
    ]
}


const SmmPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug)
    const { data: ads } = useGetCompanyAdvertisingQuery()
    const { data: social_types } = useGetSocialTypesQuery()
    const { business_types } = useAppData()
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
                    button_text={"Получить консультацию"}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Digital продвижение', href: '/services/smm' },
                    ]}
                    bg_image={data.image}
                />
            }
            <ServicePostList
                title={serviceData.title}
                items={serviceData.items}
            />
            {ads &&
                <SMMPartnersCarousel
                    title={ads.title}
                    sub_title={ads.sub_title}
                    partnerList={ads.items}
                />
            }
            <ServiceStaticCardList
                title={smmCreatingAdData.title}
                eyebrow={smmCreatingAdData.eyebrow}
                sub_title={smmCreatingAdData.sub_title}
                items={smmCreatingAdData.items}
            />
            <CompanyServiceCardList
                title={smmTeamMembers.title}
                items={smmTeamMembers.items}
            />
            <SmmStats />
            <ClientReviewList hasSubTitle />
            <FormLayout
                ref={ref}
                title={"Узнайте стоимость SMM-продвижения"}
                nestedForm={
                    <SmmFeedbackForm
                        business_types={business_types}
                        social_types={social_types || []}
                    />
                }
            />
        </RequestHandler>
    );
}

export default SmmPage;