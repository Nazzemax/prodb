import { InfoCard } from "@/components/organisms/info-card";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { ServicePostList } from "@/components/organisms/service-post-list";
import FormLayout from "@/components/templates/form-layout";
import { VideoProductionIcon } from "@/assets/info-card";
import { getStaticPageBySlug } from "@/api/StaticPages";
import { getVideoTypes } from "@/api/Types";
import { getVideoProduction } from "@/api/VideoProduction";
import { VideoCompany } from "@/components/organisms/video-about-videoproduction";
import ClientReviewList from "@/components/organisms/client-review-list";
import { getTranslations } from "next-intl/server";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";

export const revalidate = 60;

const VideoProductionPage = async () => {
    const data = await getStaticPageBySlug('video-production');
    const videoData = await getVideoProduction();
    const t = await getTranslations("ServicePage5");
    const video_types = await getVideoTypes();

    const serviceData = {
        title: t("Services.title"),
        btn: t("Services.btn"),
        items: [
            {
                video_link: "/videos/lex.mp4",
                image_right: false,
                title: t("Services.items.0.title"),
                description: t("Services.items.0.description"),
                has_button: true,
                btn: t("Services.btn"),
                tags: [
                    { tags: t("Services.items.0.tags.0.tag") },
                    { tags: t("Services.items.0.tags.1.tag") },
                    { tags: t("Services.items.0.tags.2.tag") },
                ],
            },
            {
                video_link: "/videos/elazyk.mp4",
                image_right: true,
                title: t("Services.items.1.title"),
                description: t("Services.items.1.description"),
                has_button: true,
                btn: t("Services.btn"),
                tags: [
                    { tags: t("Services.items.1.tags.0.tag") },
                    { tags: t("Services.items.1.tags.1.tag") },
                    { tags: t("Services.items.1.tags.2.tag") },
                ],
            },
            {
                video_link: "/videos/idea.mp4",
                image_right: false,
                title: t("Services.items.2.title"),
                description: t("Services.items.2.description"),
                has_button: true,
                btn: t("Services.btn"),
                tags: [
                    { tags: t("Services.items.2.tags.0.tag") },
                    { tags: t("Services.items.2.tags.1.tag") },
                    { tags: t("Services.items.2.tags.2.tag") },
                ],
            },
            {
                video_link: "/videos/event.mp4",
                image_right: true,
                title: t("Services.items.3.title"),
                description: t("Services.items.3.description"),
                has_button: true,
                btn: t("Services.btn"),
                tags: [
                    { tags: t("Services.items.3.tags.0.tag") },
                    { tags: t("Services.items.3.tags.1.tag") },
                    { tags: t("Services.items.3.tags.2.tag") },
                ],
            },
            {
                image: "/images/services/video/photosession.png",
                image_right: false,
                title: t("Services.items.4.title"),
                description: t("Services.items.4.description"),
                has_button: true,
                btn: t("Services.btn"),
                tags: [
                    { tags: t("Services.items.4.tags.0.tag") },
                    { tags: t("Services.items.4.tags.1.tag") },
                    { tags: t("Services.items.4.tags.2.tag") },
                ],
            },
        ],
    };

    return (
        <>
            {data && (
                <PageTitleLayout
                    title={data.title}
                    sub_title={data.content}
                    button_text={t("headerBtn")}
                    breadcrumb={[
                        { text: "Главная", href: "/home" },
                        { text: "Видеопродакшн", href: "/services/video-production" },
                    ]}
                    bg_image={data.image}
                />
            )}
            <InfoCard
                card_icon={<VideoProductionIcon />}
                title={videoData?.title || "Креатив, который выделяет ваш бренд"}
                description={
                    videoData?.description ||
          "С более чем 10-летним опытом в видеопродакшн, наша команда профессионалов создает видеоролики, которые не только привлекают внимание, но и эффективно достигают ваших бизнес-целей."
                }
                video={videoData?.items[0].video}
                card_title={videoData?.items[0].title || "В Bold Brands мы уверены"}
                card_description={
                    videoData?.items[0].description ||
          "Качественный видеоконтент — это ключ к успешному продвижению вашего бизнеса."
                }
            />
            <VideoCompany />
            <ServicePostList title={serviceData.title} items={serviceData.items} />
            <ClientReviewList />
            <FormLayout
                title={"Рассчитайте стоимость вашего Видеопроекта"}
                nestedForm={
                    <CostCalculationForm
                        promotion_types={video_types || []}
                    />
                }
            />
        </>
    );
};

export default VideoProductionPage;
