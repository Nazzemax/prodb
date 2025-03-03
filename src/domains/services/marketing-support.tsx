'use client';

import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { useGetTaskTypesQuery } from "@/api/Types";
import { MarketingSupportIcon } from "@/assets/info-card";
import { RequestHandler } from "@/components/atoms/request-handler";
import { MarketingSupportFeedbackForm } from "@/components/forms/marketing-support-form";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { InfoCard } from "@/components/organisms/info-card";
import { MarketingResults } from "@/components/organisms/marketing-results";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { smmTeamMembers } from "@/consts/data";
import { useAppData } from "@/context/app-context";
import useScrollToFeedback from "@/hooks/useScrollToFeedback";
import { useSlug } from "@/hooks/useSlug";

const serviceData = {
    title: 'Что мы делаем',
    items: [
        {

            image: "/images/services/marketing-support/marketing1.png",
            image_right: false,
            title: 'Разработка и реализация стратегии',
            sub_title: '',
            description: 'Мы анализируем ваши цели, аудиторию и особенности рынка, создаём эффективный план продвижения и пошагово внедряем его в работу.',
            tags: [
                {
                    tags: '',
                },
                {
                    tags: ''
                }
            ]
        },
        {

            image: "/images/services/marketing-support/marketing2.png",
            image_right: true,
            title: 'Продвижение в цифровых каналах',
            sub_title: '',
            description: 'От SEO и контекстной рекламы до управления социальными сетями и e-mail маркетинга — мы подбираем оптимальный набор инструментов для достижения конкретных KPI.',
            tags: [
                {
                    tags: '',
                },
                {
                    tags: ''
                }
            ]
        },
        {

            image: "/images/services/marketing-support/marketing3.png",
            image_right: false,
            title: 'Контент и креатив',
            sub_title: '',
            description: 'Создаём тексты, визуалы и видеоконтент, которые не просто «красиво выглядят», а работают на вовлечение аудитории и рост конверсий.',
            tags: [
                {
                    tags: '',
                },
                {
                    tags: ''
                }
            ]
        },
        {

            image: "/images/services/marketing-support/marketing4.png",
            image_right: true,
            title: 'Интеграция и автоматизация',
            sub_title: '',
            description: 'Помогаем наладить сквозную аналитику, интегрировать CRM и выстроить эффективные процессы в колл-центре и отделе продаж, чтобы каждый лид доводился до сделки.',
            tags: [
                {
                    tags: '',
                },
                {
                    tags: ''
                }
            ]
        },
        {

            image: "/images/services/marketing-support/marketing5.png",
            image_right: false,
            title: 'Аналитика и оптимизация',
            sub_title: '',
            description: 'Отслеживаем показатели на каждом этапе, регулярно предоставляем отчёты и вносим корректировки для повышения эффективности и прозрачности затрат.',
            tags: [
                {
                    tags: '',
                },
                {
                    tags: ''
                }
            ]
        },
    ]
}

const MarketingSupportPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug)
    const { data: task_types } = useGetTaskTypesQuery()
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
                    bg_image={data.image}
                    button_text={"Заказать интерграцию"}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Комплексное маркетинговое сопровождение', href: '/services/marketing-support' },
                    ]}
                    isGray
                />
            }
            <InfoCard
                title={"Комплексное маркетинговое сопровождение"}
                description={"это стратегический подход, который помогает бизнесу не просто заявить о себе, а достичь реальных результатов: увеличить продажи, расширить клиентскую базу и укрепить позиции на рынке."}
                card_title={"В Bold Brands мы:"}
                card_description={"объединяем все ключевые инструменты цифрового маркетинга в единую экосистему, чтобы вы получили максимум отдачи от каждого вложенных средств."}
                card_icon={<MarketingSupportIcon />}
                image={'/images/services/smm/creating-ad_1.webp'}
            />
            <ServicePostList
                title={serviceData.title}
                items={serviceData.items}
            />
            <CompanyServiceCardList
                title={smmTeamMembers.title}
                items={smmTeamMembers.items}
            />
            <MarketingResults />
            <CompanyPostList />
            <FormLayout
                ref={ref}
                nestedForm={
                    <MarketingSupportFeedbackForm
                        business_types={business_types}
                        task_types={task_types || []}
                    />
                }
            />
        </RequestHandler>
    );
}

export default MarketingSupportPage;