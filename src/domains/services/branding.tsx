"use client";

import { CompanyPostList } from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { InfoCard } from "@/components/organisms/info-card";
import {
    IServicePostItem,
    ServicePostList,
} from "@/components/organisms/service-post-list";
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
import { Banner, IDesignBrand, ISmmTeamMembers } from "@/consts/types";
import {
    ServiceBrandingIcon1,
    ServiceBrandingIcon2,
    ServiceBrandingIcon3,
    ServiceBrandingIcon4,
    ServiceBrandingIcon5,
} from "@/assets/services/branding";
import { useTranslations } from "next-intl";
import { useGetCompanyFeaturesQuery } from "@/api/Company";

const BradingPage = () => {
    const slug = useSlug();
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug);
    const { data: services_types } = useGetServiceTypesQuery();
    const { data: serviceData } = useGetCompanyFeaturesQuery();
    const { business_types } = useAppData();
    const t = useTranslations("ServicePage4");
    const t2 = useTranslations("Buttons");

    const serviceDataStatic = {
        title: "Создаем бренд, который говорит сам за себя",
        items: [
            {
                image: "/images/services/branding/brand-1.jpg",
                image_right: false,
                title: "Нейминг",
                sub_title: "Названия, которые остаются в памяти",
                description:
          "Мы придумываем уникальные и яркие названия, которые отражают суть вашего бизнеса и вызывают эмоции у клиентов.",
                tags: [
                    {
                        tags: "Глубокий анализ рынка и конкурентов",
                    },
                    {
                        tags: "Разработка креативных и вдохновляющих концепций",
                    },
                ],
            },
            {
                image: "/images/services/branding/brand-2.jpg",
                image_right: true,
                title: "Дизайн логотипа и фирменного стиля",
                sub_title: "Названия, которые остаются в памяти",
                description:
          "Мы придумываем уникальные и яркие названия, которые отражают суть вашего бизнеса и вызывают эмоции у клиентов.",
                tags: [
                    {
                        tags: "Глубокий анализ рынка и конкурентов",
                    },
                    {
                        tags: "Разработка креативных и вдохновляющих концепций",
                    },
                ],
            },
            {
                image: "/images/services/branding/brand-3.jpg",
                image_right: false,
                title: "Брендбук",
                sub_title: "Названия, которые остаются в памяти",
                description:
          "Мы придумываем уникальные и яркие названия, которые отражают суть вашего бизнеса и вызывают эмоции у клиентов.",
                tags: [
                    {
                        tags: "Глубокий анализ рынка и конкурентов",
                    },
                    {
                        tags: "Разработка креативных и вдохновляющих концепций",
                    },
                ],
            },
        ],
    };

    const serviceBrandingData: ISmmTeamMembers = {
        title: t("howWeWork.title1"),
        items: [
            {
                image: <ServiceBrandingIcon1 />,
                number: "01",
                title: t("howWeWork.title11"),
                description: t("howWeWork.description11"),
            },
            {
                image: <ServiceBrandingIcon2 />,
                number: "02",
                title: t("howWeWork.title12"),
                description: t("howWeWork.description12"),
       
            },
            {
                image: <ServiceBrandingIcon3 />,
                number: "03",
                title: t("howWeWork.title13"),
                description: t("howWeWork.description13"),
      
            },
            {
                image: <ServiceBrandingIcon4 />,
                number: "04",
                title: t("howWeWork.title14"),
                description: t("howWeWork.description14"),
       
            },
            {
                image: <ServiceBrandingIcon5 />,
                number: "05",
                title: t("howWeWork.title15"),
                description: t("howWeWork.description15"),
           
            },
        ],
    };

    const serviceBrandingDataDesign: IDesignBrand = {
        design: {
            title1: t("design.title1"),
            subtitle1: t("design.subtitle1"),
            description1: t("design.description1"),
            title2: t("design.title2"),
            description2: t("design.description2"),
        },
    };

    const banner: Banner = {
        title: t("banner.title"),
        sub_title: t("banner.description"),
        button_text: t("banner.btn"),
    };

    const feedbackRef = useRef<HTMLDivElement>(null);

    const scrollToFeedback = () => {
        feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <RequestHandler isLoading={isLoading} error={error} data={data}>
            {data && (
                <PageTitleLayout
                    title={banner.title}
                    sub_title={banner.sub_title}
                    bg_image={data.image}
                    button_text={banner.button_text}
                    scrollToFeedback={scrollToFeedback}
                    breadcrumb={[
                        { text: "Главная", href: "/home" },
                        { text: "Брендинг", href: "/services/branding" },
                    ]}
                    isGray
                />
            )}
            <CompanyBranding />
            <ServicePostList
                title={(serviceData && serviceData.title) || serviceDataStatic.title}
                items={(serviceData && serviceData?.items) || serviceDataStatic.items}
            />
            <CompanyServiceCardList
                title={serviceBrandingData.title}
                items={serviceBrandingData.items}
                button={t2("btn1")}
            />
            <CompanyPostList />
            <InfoCard
                title={serviceBrandingDataDesign.design.title1}
                sub_title={serviceBrandingDataDesign.design.subtitle1}
                description={serviceBrandingDataDesign.design.description1}
                image={"/images/services/branding/card_img.webp"}
                card_title={serviceBrandingDataDesign.design.title2}
                card_description={serviceBrandingDataDesign.design.description2}
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
};

export default BradingPage;
