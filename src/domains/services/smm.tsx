import { getCompanyAds } from "@/api/Company";
import { getStaticPageBySlug } from "@/api/StaticPages";
import { getPromotionTypes, getSocialTypes } from "@/api/Types";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import Advantages from "@/components/organisms/advantages/Advantages";
import ClientReviewList from "@/components/organisms/client-review-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { ServiceStaticCardList } from "@/components/organisms/service-static-card-list";
import { SMMPartnersCarousel } from "@/components/organisms/smm-partner-carousel";
import FormLayout from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { fetchSmmCreatingAdData, fetchSmmTeamMembers } from "@/consts/data";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;

const SmmPage = async () => {
    const data = await getStaticPageBySlug('smm');
    const ads = await getCompanyAds();
    const t = await getTranslations("ServicesPage1");
    const smmCreatingAdData = await fetchSmmCreatingAdData();
    const smmTeamMembers = await fetchSmmTeamMembers();
    const promotion_types = await getPromotionTypes();

    const serviceData = {
        title: t("zigzak.title"),
        items: [
            {
                image: "/images/services/smm/smmBg-1-min.jpg",
                image_right: false,
                title: t("zigzak.subtitle1"),
                description: t("zigzak.subdesk1"),
            },
            {
                image: "/images/services/smm/smmBg-2-min.webp",
                image_right: true,
                title: t("zigzak.subtitle2"),
                description: t("zigzak.subdesk2"),
            },
            {
                image: "/images/services/smm/smmBg-3-min.jpg",
                image_right: false,
                title: t("zigzak.subtitle3"),
                description: t("zigzak.subdesk3"),
            },
            {
                image: "/images/services/smm/smmBg-4-min.jpg",
                image_right: true,
                title: t("zigzak.subtitle4"),
                description: t("zigzak.subdesk4"),
            },
            {
                image: "/images/services/smm/smmBg-5-min.webp",
                image_right: false,
                title: t("zigzak.subtitle5"),
                description: t("zigzak.subdesk5"),
            },
            {
                image: "/images/services/smm/smmBg-6-min.jpg",
                image_right: true,
                title: t("zigzak.subtitle6"),
                description: t("zigzak.subdesk6"),
            },
            {
                image: "/images/services/smm/smmBg-7-min.png",
                image_right: false,
                title: t("zigzak.subtitle7"),
                description: t("zigzak.subdesk7"),
            },
        ],
    };

    return (
        <>
            {data && (
                <PageTitleLayout
                    title={data?.title}
                    sub_title={data?.content}
                    button_text={"Получить консультацию"}
                    breadcrumb={[
                        { text: "Главная", href: "/home" },
                        { text: "Digital продвижение", href: "/services/smm" },
                    ]}
                    bg_image={data.image}
                />
            )}
            <ServicePostList title={serviceData.title} items={serviceData.items} />
            {ads && (
                <SMMPartnersCarousel
                    title={ads.title}
                    sub_title={ads.sub_title}
                    partnerList={ads.items}
                />
            )}
            <ServiceStaticCardList
                title={smmCreatingAdData.title}
                eyebrow={smmCreatingAdData.eyebrow}
                sub_title={smmCreatingAdData.sub_title}
                items={smmCreatingAdData.items}
                isSmm
            />
            <CompanyServiceCardList
                title={smmTeamMembers.title}
                items={smmTeamMembers.items}
                button={t("smm.btn")}
            />
            <Advantages isSmm />
            <ClientReviewList />
            <FormLayout
                nestedForm={
                    <CostCalculationForm
                        promotion_types={promotion_types || []}
                    />
                }
            />
        </>
    );
};

export default SmmPage;
