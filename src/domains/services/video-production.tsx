'use client';

import { InfoCard } from "@/components/organisms/info-card";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { VideoAboutCompany } from "@/components/organisms/video-about-company";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { ClientReviewList } from "@/components/organisms/client-review-list";
import { FormLayout } from "@/components/templates/form-layout";
import { VideoProductionForm } from "@/components/forms/video-production-form";
import { VideoProductionIcon } from "@/assets/info-card";
import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { useSlug } from "@/hooks/useSlug";
import { RequestHandler } from "@/components/atoms/request-handler";
import { useAppData } from "@/context/app-context";
import { useGetVideoTypesQuery } from "@/api/Types";
import useScrollToFeedback from "@/hooks/useScrollToFeedback";

const serviceData = {
    title: 'Наши услуги по Видеопродакшну',
    items: [
        {
            video_link: "https://www.youtube.com/embed/Tf9ei_tQ_QA?si=ZzWL8KKNljesrGOk",
            image_right: false,
            title: 'Рекламные видеоролики',
            description: 'Анализируем рынок, изучаем конкурентов, выявляем особенности вашей целевой аудитории. Вместе с вами формируем цели продвижения.',
            has_button: true,
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
            video_link: "https://www.youtube.com/embed/Tf9ei_tQ_QA?si=ZzWL8KKNljesrGOk",
            image_right: true,
            title: 'Разработка стратегии',
            description: 'Создаем уникальную SMM-стратегию, которая выделяет ваш бренд и приносит реальные результаты.',
            has_button: true,
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
            video_link: "https://www.youtube.com/embed/Tf9ei_tQ_QA?si=ZzWL8KKNljesrGOk",
            image_right: false,
            title: 'Создание контента',
            description: 'Креатив-команда: мобилограф, копирайтер и дизайнер — разрабатывает визуалы и тексты, которые привлекают внимание и побуждают к покупкам.',
            has_button: true,
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
            video_link: "https://www.youtube.com/embed/Tf9ei_tQ_QA?si=ZzWL8KKNljesrGOk",
            image_right: true,
            title: 'Настройка рекламы',
            description: 'Таргетолог настраивает рекламу так, чтобы привлекать вашу целевую аудиторию и создавать поток заявок.',
            has_button: true,
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

const VideoProductionPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug)
    const { data: video_types } = useGetVideoTypesQuery()
    const { business_types, data: info } = useAppData()
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
                    button_text={"Заказать видео-ролик"}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Видеопродакшн', href: '/services/video-production' },
                    ]}
                    bg_image={data.image}
                />}
            <InfoCard
                title={"Креатив, который выделяет ваш бренд"}
                description={"С более чем 10-летним опытом в видеопродакшн, наша команда профессионалов создает видеоролики, которые не только привлекают внимание, но и эффективно достигают ваших бизнес-целей."}
                video={info?.video}
                card_title={"В Bold Brands мы уверены"}
                card_description={"Качественный видеоконтент — это ключ к успешному продвижению вашего бизнеса."}
                card_icon={<VideoProductionIcon />}
            />
            <VideoAboutCompany />
            <ServicePostList
                scrollToFeedback={scrollToFeedback}
                title={serviceData.title}
                items={serviceData.items}
            />
            <ClientReviewList />
            <FormLayout
                ref={ref}
                title={"Рассчитайте стоимость вашего Видеопроекта"}
                nestedForm={
                    <VideoProductionForm
                        business_types={business_types}
                        video_types={video_types || []}
                    />
                }
            />
        </RequestHandler>
    );
}

export default VideoProductionPage;