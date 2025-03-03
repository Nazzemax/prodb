'use client';

import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { useGetTaskTypesQuery } from "@/api/Types";
import { CrmIcon } from "@/assets/info-card";
import { RequestHandler } from "@/components/atoms/request-handler";
import { CrmFeedbackForm } from "@/components/forms/crm-feedback-form";
import { Award } from "@/components/organisms/award";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { InfoCard } from "@/components/organisms/info-card";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { serviceCrmData, serviceData } from "@/consts/data";
import { useAppData } from "@/context/app-context";
import useScrollToFeedback from "@/hooks/useScrollToFeedback";
import { useSlug } from "@/hooks/useSlug";



const CrmPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug)
    const { data: task_types } = useGetTaskTypesQuery()
    const { business_types } = useAppData()
    const { ref, scrollToFeedback } = useScrollToFeedback()

    return (
        <RequestHandler
            isLoading={isLoading}
            error={error}
            data={data}
        >
            {data &&
                <PageTitleLayout
                    scrollToFeedback={scrollToFeedback}
                    title={data.title}
                    sub_title={data.content}
                    bg_image={data.image}
                    button_text={"Заказать интерграцию"}
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
            />
            <InfoCard
                title={"Наш подход к интеграции CRM"}
                description={"Мы анализируем потребности вашего бизнеса и подбираем подходящую CRM-систему, которая соответствует вашим целям. Наша команда выполняет плавную миграцию данных и настраивает систему так, чтобы она полностью поддерживала ваши бизнес-процессы."}
                card_title={"Мы также обучаем вашу команду"}
                card_description={"и предоставляем регулярную техническую поддержку для удобного использования CRM."}
                card_icon={<CrmIcon />}
                image={'/images/services/crm/info-crm.png'}
            />
            <Award
                badgeTitle={"Партнерство"}
                title={"Мы официальные партнеры Битрикс24"}
                image={"/images/services/crm/sertificate.png"}
            />
            <ServicePostList
                title={serviceData.title}
                items={serviceData.items}
            />
            <CompanyPostList />
            <FormLayout
                ref={ref}
                nestedForm={
                    <CrmFeedbackForm
                        business_types={business_types}
                        task_types={task_types || []}
                    />
                }
            />
        </RequestHandler>
    );
}

export default CrmPage;

function scrollToFeedback() {
    throw new Error("Function not implemented.");
}
