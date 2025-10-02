import { getStaticPageBySlug } from "@/api/StaticPages";
import { getTaskTypes } from "@/api/Types";
import { CrmIcon } from "@/assets/info-card";
import { ServiceCrmIcon1, ServiceCrmIcon2, ServiceCrmIcon3 } from "@/assets/services/crm";
import { SeoHowWeWork5 } from "@/assets/services/seo";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import Award from "@/components/organisms/award";
import CompanyPostList from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { InfoCard } from "@/components/organisms/info-card";
import { ServicePostList } from "@/components/organisms/service-post-list";
import FormLayout from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { ISmmTeamMembers } from "@/consts/types";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;

const CrmPage = async () => {
    const t = await getTranslations("ServicesPage7")
    const data = await getStaticPageBySlug('crm')
    const task_types = await getTaskTypes()
   
    const serviceCrmData: ISmmTeamMembers = {
        title: t("BenefitsSection.title"),
        button:t("BenefitsSection.button"),
        items: [
            {
                image: <ServiceCrmIcon1 />,
                number: "01",
                title: t("BenefitsSection.items.0.title"),
                description: t("BenefitsSection.items.0.description"),
            },
            {
                image: <ServiceCrmIcon2 />,
                number: "02",
                title: t("BenefitsSection.items.1.title"),
                description: t("BenefitsSection.items.1.description"),
            },
            {
                image: <ServiceCrmIcon3 />,
                number: "03",
                title: t("BenefitsSection.items.2.title"),
                description: t("BenefitsSection.items.2.description"),
            },
            {
                image: <SeoHowWeWork5 />,
                number: "04",
                title: t("BenefitsSection.items.3.title"),
                description: t("BenefitsSection.items.3.description"),
            },
        ],
    };

    const serviceData = {
        title: t("integrationServices.titleIntegrationServices"),
        items: [
            {
                image: "/images/services/crm/crmone.webp",
                image_right: false,
                title: t("integrationServices.servicesList.0.serviceTitle"),
                description: t("integrationServices.servicesList.0.serviceDescription"),
                tags: [
                    { tags: t("integrationServices.servicesList.0.serviceDescription").split(". ")[0] },
                    { tags: t("integrationServices.servicesList.0.serviceDescription").split(". ")[1] }
                ],
            },
            {
                image: "/images/services/crm/crmtwo.webp",
                image_right: true,
                title: t("integrationServices.servicesList.1.serviceTitle"),
                description: t("integrationServices.servicesList.1.serviceDescription"),
                tags: [
                    { tags: t("integrationServices.servicesList.1.serviceDescription").split(". ")[0] },
                    { tags: t("integrationServices.servicesList.1.serviceDescription").split(". ")[1] }
                ],
            },
            {
                image: "/images/services/crm/crmthree.webp",
                image_right: false,
                title: t("integrationServices.servicesList.2.serviceTitle"),
                description: t("integrationServices.servicesList.2.serviceDescription"),
                tags: [
                    { tags: t("integrationServices.servicesList.2.serviceDescription").split(". ")[0] },
                    { tags: t("integrationServices.servicesList.2.serviceDescription").split(". ")[1] }
                ],
            },
            {
                image: "/images/services/crm/crmfourth.webp",
                image_right: true,
                title: t("integrationServices.servicesList.3.serviceTitle"),
                description: t("integrationServices.servicesList.3.serviceDescription"),
                tags: [
                    { tags: t("integrationServices.servicesList.3.serviceDescription").split(". ")[0] },
                    { tags: t("integrationServices.servicesList.3.serviceDescription").split(". ")[1] }
                ],
            },
        ],
    };

    return (
        <>
            {data &&
                <PageTitleLayout
                    title={data.title}
                    sub_title={data.content}
                    bg_image={data.image}
                    button_text={t("headerBtn")}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Интеграция CRM', href: '/services/crm' },
                    ]}
                    isGray
                />
            }
            <CompanyServiceCardList
                title={serviceCrmData.title}
                items={serviceCrmData.items}
                button={serviceCrmData.button}
            />
            <InfoCard
                title={t(['integrationApproach', 'titleIntegration'].join('.'))}
                description={t("integrationApproach.descriptionIntegration")}
                card_title={t("integrationApproach.teamTraining.titleTeamTraining")}
                card_description={t("integrationApproach.teamTraining.descriptionTeamTraining")}
                card_icon={<CrmIcon />}
                image={'/images/services/marketing-support/marketing.webp'}
            />
            <Award
                badgeTitle={t("PartersBlog.titleParters")}
                title={t("PartersBlog.SubTitleParters")}
                image={"/images/services/crm/sertificate.png"}
            />
            <ServicePostList
                title={serviceData.title}
                items={serviceData.items}
            />
            <CompanyPostList />
            <FormLayout
                nestedForm={
                    <CostCalculationForm
                        promotion_types={task_types || []}
                    />
                }
            />
        </>
    );
}

export default CrmPage;

function scrollToFeedback() {
    throw new Error("Function not implemented.");
}
