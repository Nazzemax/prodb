import { getStaticPageBySlug } from "@/api/StaticPages";
import { getPromotionTypes } from "@/api/Types";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import CompanyPostList from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { ServiceStaticCardList } from "@/components/organisms/service-static-card-list";
import FormLayout from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { fetchContextAdCardData , fetchContextAdData } from "@/consts/data";
import { Banner } from "@/consts/types";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;

const ContextAdsPage = async () => {
    const [
        data,
        t,
        t2,
        contextAdData,
        contextAdCardData,
        promotion_types,
    ] = await Promise.all([
        getStaticPageBySlug("context-ads"),
        getTranslations("ServicesPage2"),
        getTranslations("Buttons"),
        fetchContextAdData(),
        fetchContextAdCardData(),
        getPromotionTypes(),
    ]);

  

    const banner: Banner = {
        title: t("banner.title"),
        sub_title: t("banner.description"),
        button_text: t("banner.btn"),
    };

    console.log("Данные загружены на сервере");

    return (
        <>
            {data && (
                <PageTitleLayout
                    title={data.title}
                    sub_title={data.content}
                    bg_image={data.image}
                    isGray={true}
                    button_text={banner.button_text}
                    breadcrumb={[
                        { text: "Главная", href: "/home" },
                        { text: "Контекстная реклама", href: "/services/context-ads" },
                    ]}
                />
            )}
            <ServiceStaticCardList
                title={contextAdData.title}
                items={contextAdData.items}
            />
            <CompanyServiceCardList
                title={contextAdCardData.title}
                items={contextAdCardData.items}
                button={t2("btn1")}
            />
            <CompanyPostList />
            <FormLayout nestedForm={<CostCalculationForm promotion_types={promotion_types} />} />
        </>
    );
};

export default ContextAdsPage;
