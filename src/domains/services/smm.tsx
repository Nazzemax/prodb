"use client";

import { useGetCompanyAdvertisingQuery } from "@/api/Company";
import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { useGetSocialTypesQuery } from "@/api/Types";
import { RequestHandler } from "@/components/atoms/request-handler";
import { SmmFeedbackForm } from "@/components/forms/smm-feedback-form";
import { Advantages } from "@/components/organisms/advantages/Advantages";
import { ClientReviewList } from "@/components/organisms/client-review-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { ServiceStaticCardList } from "@/components/organisms/service-static-card-list";
import { SMMPartnersCarousel } from "@/components/organisms/smm-partner-carousel";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { useSmmCreatingAdData, useSmmTeamMembers } from "@/consts/data";
import { useAppData } from "@/context/app-context";
import { useSlug } from "@/hooks/useSlug";
import { useTranslations } from "next-intl";

const SmmPage = () => {
    const t = useTranslations("ServicesPage1");

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
                image: "/images/services/smm/smmBg-2-min.jpg",
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
                image: "/images/services/smm/smmBg-5-min.jpg",
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
                image: "/images/services/smm/smmBg-7-min.jpg",
                image_right: false,
                title: t("zigzak.subtitle7"),
                description: t("zigzak.subdesk7"),
            },
        ],
    };
    const slug = useSlug();
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug);
    const { data: ads } = useGetCompanyAdvertisingQuery();
    const { data: social_types } = useGetSocialTypesQuery();
    const { business_types } = useAppData();

    const smmCreatingAdData = useSmmCreatingAdData();
    const smmTeamMembers = useSmmTeamMembers();

    return (
        <RequestHandler isLoading={isLoading} error={error} data={data}>
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
            />
            <CompanyServiceCardList
                title={smmTeamMembers.title}
                items={smmTeamMembers.items}
                button={t("smm.btn")}
            />
            <Advantages isSmm/>
            <ClientReviewList hasSubTitle />
            <FormLayout
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
};

export default SmmPage;
