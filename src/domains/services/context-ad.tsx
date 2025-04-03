import { getStaticPageBySlug } from "@/api/StaticPages";
import FeedbackForm from "@/components/forms/feedback-form";
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
    const data = await getStaticPageBySlug('context-ads');
    const [t, t2, contextAdData, contextAdCardData] = await Promise.all([
        getTranslations("ServicesPage2"),
        getTranslations("Buttons"),
        fetchContextAdData(),
        fetchContextAdCardData(),
    ])

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
            <FormLayout nestedForm={<FeedbackForm />} />
        </>
    );
};

export default ContextAdsPage;
