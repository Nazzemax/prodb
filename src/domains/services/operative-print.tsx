"use client";

import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { RequestHandler } from "@/components/atoms/request-handler";
import { useSlug } from "@/hooks/useSlug";
import { useAppData } from "@/context/app-context";
import { useGetPromotionTypesQuery } from "@/api/Types";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ParallaxSection } from "@/components/organisms/parallax";
import { useGetBusinessCardsQuery } from "@/api/BusinessType";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { ISmmTeamMembers } from "@/consts/types";
import {
    ServicePrintingIcon1,
    ServicePrintingIcon2,
    ServicePrintingIcon3,
    ServicePrintingIcon4,
    ServicePrintingIcon5,
} from "@/assets/services/printing";
import { PrintedLogos } from "@/components/organisms/printed-logos";
import { DesignDepartment } from "@/components/organisms/design-department";

export interface ParallaxItem {
    src: string;
    speed: number;
    alt?: string;
    heading?: string;
}

export interface ParallaxProps {
    images: ParallaxItem[];
}

const PrintPage = () => {
    const t = useTranslations("ServicesPage9");

    const servicePrintData: ISmmTeamMembers = {
        title: t("howWeWork.title1"),
        items: [
            {
                image: <ServicePrintingIcon1 />,
                number: "01",
                title: t("howWeWork.title11"),
                description: t("howWeWork.description11"),
            },
            {
                image: <ServicePrintingIcon2 />,
                number: "02",
                title: t("howWeWork.title12"),
                description: t("howWeWork.description12"),
            },
            {
                image: <ServicePrintingIcon3 />,
                number: "03",
                title: t("howWeWork.title13"),
                description: t("howWeWork.description13"),
            },
            {
                image: <ServicePrintingIcon4 />,
                number: "04",
                title: t("howWeWork.title14"),
                description: t("howWeWork.description14"),
            },
            {
                image: <ServicePrintingIcon5 />,
                number: "05",
                title: t("howWeWork.title15"),
                description: t("howWeWork.description15"),
            },
        ],
    };

    const slug = useSlug();
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug);
    const { data: promotion_types } = useGetPromotionTypesQuery();
    const {
        data: cards,
        isError,
        isLoading: loading,
    } = useGetBusinessCardsQuery();
    const { business_types } = useAppData();

    const feedbackRef = useRef<HTMLDivElement>(null);

    const scrollToFeedback = () => {
        feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    type Designs = {
        title1: string;
        description1: string;
        btn: string;
        title2: string;
        design: string;
    };

    const designs: Designs = {
        title1: t("banner.title1"),
        description1: t("banner.description1"),
        btn: t("banner.btn"),
        title2: t("banner.title2"),
        design: t("design"),
    };

    return (
        <RequestHandler isLoading={isLoading} error={error} data={data}>
            {data && (
                <PageTitleLayout
                    bg_image={data?.image}
                    title={data?.title}
                    //   top_title={designs.title2}
                    sub_title={data?.content}
                    button_text={designs.btn}
                    scrollToFeedback={scrollToFeedback}
                    breadcrumb={[
                        { text: "Главная", href: "/home" },
                        { text: "Оперативная печать", href: "/services/operative-print" },
                    ]}
                />
            )}
            < DesignDepartment />
            {cards && (
                <ParallaxSection
                    businesscards={cards?.businesscards}
                    title={designs.design}
                />
            )}
            <CompanyServiceCardList
                title={servicePrintData.title}
                items={servicePrintData.items}
                button={t("btn")}
            />
            <PrintedLogos />
            <FormLayout
                ref={feedbackRef}
                title={"Рассчитайте стоимость услуги"}
                nestedForm={
                    <CostCalculationForm
                        business_types={business_types}
                        promotion_types={promotion_types || []}
                    />
                }
            />
        </RequestHandler>
    );
};

export default PrintPage;
