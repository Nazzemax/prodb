import CompanyPostList from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { InfoCard } from "@/components/organisms/info-card";
import {
    ServicePostList,
} from "@/components/organisms/service-post-list";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import FormLayout from "@/components/templates/form-layout";
import { BrandingIcon } from "@/assets/info-card";
import { getStaticPageBySlug } from "@/api/StaticPages";
import { CompanyBranding } from "@/components/organisms/company-branding";
import { getServiceTypes } from "@/api/Types";
import { IDesignBrand, ISmmTeamMembers } from "@/consts/types";
import {
    ServiceBrandingIcon1,
    ServiceBrandingIcon2,
    ServiceBrandingIcon3,
    ServiceBrandingIcon4,
    ServiceBrandingIcon5,
} from "@/assets/services/branding";
import { getCompanyFeatures } from "@/api/Company";
import { getTranslations } from "next-intl/server";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";

export const revalidate = 60;

const BradingPage = async () => {
    const data = await getStaticPageBySlug('branding');
    const t = await getTranslations("ServicePage4");
    const t2 = await getTranslations("Buttons");
    const [services_types, serviceData] = await Promise.all([
        getServiceTypes(),
        getCompanyFeatures(),
    ])

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


    return (
        <>
            {data && (
                <PageTitleLayout
                    title={data?.title}
                    sub_title={data?.content}
                    bg_image={data.image}
                    button_text={t("banner.btn")}
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
                title={"Узнайте стоимость разработки бренда"}
                nestedForm={
                    <CostCalculationForm
                        promotion_types={services_types || []}
                    />
                }
            />
        </>
    );
};

export default BradingPage;
