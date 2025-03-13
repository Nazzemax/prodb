'use client';

import { InfoCard } from "@/components/organisms/info-card";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { VideoAboutCompany } from "@/components/organisms/video-about-company";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { FormLayout } from "@/components/templates/form-layout";
import { VideoProductionForm } from "@/components/forms/video-production-form";
import { VideoProductionIcon } from "@/assets/info-card";
import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { useSlug } from "@/hooks/useSlug";
import { RequestHandler } from "@/components/atoms/request-handler";
import { useAppData } from "@/context/app-context";
import { useGetVideoTypesQuery } from "@/api/Types";
import { useTranslations } from "next-intl";
import { useGetVideoProductionQuery } from "@/api/VideoProduction";
import { ClientVideoReviewList } from "@/components/organisms/client-video-review-list";
import { VideoCompany } from "@/components/organisms/video-about-videoproduction";

const VideoProductionPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug)
    const { data: video_types } = useGetVideoTypesQuery()
    const { business_types } = useAppData()
    const {data:videoData } = useGetVideoProductionQuery()
    const t = useTranslations("ServicePage5");


    const serviceData = {
        title: t('Services.title'),
        btn: t('Services.btn'),
        items: [
            {
                video_link: "/videos/lex.mp4",
                image_right: false,
                title: t('Services.items.0.title'),
                description: t('Services.items.0.description'),
                has_button: true,
                btn: t('Services.btn'),
                tags: [
                    { tags: t('Services.items.0.tags.0.tag') },
                    { tags: t('Services.items.0.tags.1.tag') },
                    { tags: t('Services.items.0.tags.2.tag') }
                ]
            },
            {
                video_link: "/videos/elazyk.mp4",
                image_right: true,
                title: t('Services.items.1.title'),
                description: t('Services.items.1.description'),
                has_button: true,
                btn: t('Services.btn'),
                tags: [
                    { tags: t('Services.items.1.tags.0.tag') },
                    { tags: t('Services.items.1.tags.1.tag') },
                    { tags: t('Services.items.1.tags.2.tag') }
                ]
            },
            {
                video_link: "/videos/idea.mp4",
                image_right: false,
                title: t('Services.items.2.title'),
                description: t('Services.items.2.description'),
                has_button: true,
                btn: t('Services.btn'),
                tags: [
                    { tags: t('Services.items.2.tags.0.tag') },
                    { tags: t('Services.items.2.tags.1.tag') },
                    { tags: t('Services.items.2.tags.2.tag') }
                ]
            },
            {
                video_link: "/videos/event.mp4",
                image_right: true,
                title: t('Services.items.3.title'),
                description: t('Services.items.3.description'),
                has_button: true,
                btn: t('Services.btn'),
                tags: [
                    { tags: t('Services.items.3.tags.0.tag') },
                    { tags: t('Services.items.3.tags.1.tag') },
                    { tags: t('Services.items.3.tags.2.tag') }
                ]
            },
            {
                image: "/images/services/video/photosession.png",
                image_right: false,
                title: t('Services.items.4.title'),
                description: t('Services.items.4.description'),
                has_button: true,
                btn: t('Services.btn'),
                tags: [
                    { tags: t('Services.items.4.tags.0.tag') },
                    { tags: t('Services.items.4.tags.1.tag') },
                    { tags: t('Services.items.4.tags.2.tag') }
                ]
            }
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
                    button_text={t('headerBtn')}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Видеопродакшн', href: '/services/video-production' },
                    ]}
                    bg_image={data.image}
                />}
            <InfoCard
                title={"Креатив, который выделяет ваш бренд"}
                description={"С более чем 10-летним опытом в видеопродакшн, наша команда профессионалов создает видеоролики, которые не только привлекают внимание, но и эффективно достигают ваших бизнес-целей."}
                video={videoData?.items[0].video}
                card_title={"В Bold Brands мы уверены"}
                card_description={"Качественный видеоконтент — это ключ к успешному продвижению вашего бизнеса."}
                card_icon={<VideoProductionIcon />}
            />
         <VideoCompany />
            <ServicePostList
                title={serviceData.title}
                items={serviceData.items}
            />
            <ClientVideoReviewList />
            <FormLayout
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