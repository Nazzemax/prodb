import { getStaticPageBySlug } from "@/api/StaticPages";
import { getPromotionTypes, getSiteStatus } from "@/api/Types";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { Faq } from "@/components/organisms/faq";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { ServiceStaticCardList } from "@/components/organisms/service-static-card-list";
import FormLayout from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { fetchSeoData, fetchSeoPostsData, fetchSeoCardsData } from "@/consts/data";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;

const SeoPage = async () => {
    const [
        data,
        t,
        t2,
        promotion_types,
        seoData,
        seoPostsData,
        seoCardsData,
    ] = await Promise.all([
        getStaticPageBySlug("seo"),
        getTranslations("ServicesPage3"),
        getTranslations("Buttons"),
        getPromotionTypes(),
        fetchSeoData(),
        fetchSeoPostsData(),
        fetchSeoCardsData(),
    ]);

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
                        { text: "SEO-оптимизация", href: "/services/seo" },
                    ]}
                    isGray
                />
            )}
            <ServiceStaticCardList title={seoData.title} items={seoData.items} isSmm />
            <ServicePostList title={seoPostsData.title} items={seoPostsData.items} />
            <CompanyServiceCardList
                title={seoCardsData.title}
                items={seoCardsData.items}
                button={t2("btn1")}
            />
            <Faq />
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

export default SeoPage;
