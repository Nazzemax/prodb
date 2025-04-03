import { getStaticPageBySlug } from "@/api/StaticPages";
import { getSiteStatus } from "@/api/Types";
import { SeoFeedbackForm } from "@/components/forms/seo-feedback-form";
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
    const data = await getStaticPageBySlug('seo');
    const [t, t2, site_statuses, seoData, seoPostsData, seoCardsData] = await Promise.all([
        getTranslations("ServicesPage3"),
        getTranslations("Buttons"),
        getSiteStatus(),
        fetchSeoData(),
        fetchSeoPostsData(),
        fetchSeoCardsData(),
    ])

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
                title="Узнайте стоимость SEO-оптимизации "
                nestedForm={
                    <SeoFeedbackForm
                        site_statuses={site_statuses || []}
                    />
                }
            />
        </>
    );
};

export default SeoPage;
