import { getStaticPageBySlug } from "@/api/StaticPages";
import { getSiteTypes } from "@/api/Types";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import CompanyPostList from "@/components/organisms/company-post-list";
import { ServicePostList } from "@/components/organisms/service-post-list";
import FormLayout from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;

const SiteCreatingPage = async () => {
    const data = await getStaticPageBySlug('site-creating')
    const site_types = await getSiteTypes()
    const t = await getTranslations("ServicePage6");

    const serviceData = {
        title: t('Approach.title'),
        description: t('Approach.description'),
        items: [
            {
                image: "/images/services/site/site1.webp",
                image_right: false,
                title: t('Approach.items.0.title'),
                sub_title: t('Approach.items.0.sub_title'),
                description: t('Approach.items.0.description'),
            },
            {
                image: "/images/services/site/site2.webp",
                image_right: true,
                title: t('Approach.items.1.title'),
                sub_title: t('Approach.items.1.sub_title'),
                description: t('Approach.items.1.description'),
            },
            {
                image: "/images/services/site/site3.webp",
                image_right: false,
                title: t('Approach.items.2.title'),
                sub_title: t('Approach.items.2.sub_title'),
                description: t('Approach.items.2.description'),
            },
            {
                image: "/images/services/site/site4.webp",
                image_right: true,
                title: t('Approach.items.3.title'),
                sub_title: t('Approach.items.3.sub_title'),
                description: t('Approach.items.3.description'),
            },
        ]
    };

    return (
        <>
            {data &&
                <PageTitleLayout
                    title={data.title}
                    sub_title={data.content}
                    bg_image={data.image}
                    button_text={t('headerBtn')}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Создание сайтов', href: '/site-creating' },
                    ]}
                    isGray
                />
            }
            <ServicePostList
                title={serviceData.title}
                description={serviceData.description}
                items={serviceData.items}
            />
            <CompanyPostList />
            <FormLayout
                title={"Рассчитайте стоимость услуги "}
                nestedForm={
                    <CostCalculationForm
                        promotion_types={site_types || []} />
                }
            />
        </>
    );
}

export default SiteCreatingPage;