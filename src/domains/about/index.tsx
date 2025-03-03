'use client';

import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import { CompanyInfo } from "@/components/organisms/company-info";
import { CompanyPartners } from "@/components/organisms/company-partners";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { CompanyTeam } from "@/components/organisms/company-team";
import { InfoCard } from "@/components/organisms/info-card";
import { PartnerReviewList } from "@/components/organisms/partner-review-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { OurPhilosophyIcon } from "@/assets/info-card";
import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { RequestHandler } from "@/components/atoms/request-handler";
import { useSlug } from "@/hooks/useSlug";

import { useAppData } from "@/context/app-context";
import { useGetPromotionTypesQuery } from "@/api/Types";
import { useRef } from "react";

const AboutPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug);
    const { data: promotion_types } = useGetPromotionTypesQuery()
    const { business_types } = useAppData()

    const feedbackRef = useRef<HTMLDivElement>(null);

    const scrollToFeedback = () => {
        feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <RequestHandler
            isLoading={isLoading}
            error={error}
            data={data}
        >
            {data &&
                <PageTitleLayout
                    bg_image={data.image}
                    title={data.title}
                    button_text={"Получить консультацию"}
                    scrollToFeedback={scrollToFeedback}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'О нас', href: '/about' },
                    ]}
                />
            }
            <InfoCard
                title={"Результаты, которые работают на ваш бизнес"}
                sub_title={""}
                description={"Мы понимаем, что для предпринимателей важны не просто идеи, а измеримые результаты - рост заявок, привлечение клиентов и увеличение прибыли."}
                image={"/images/about_page/our_philosophy.webp"}
                card_title={"Наша философия"}
                card_description={"Работать для вашего успеха, предлагая стратегии, которые решают именно ваши бизнес-задачи и обеспечивают конкретные достижения."}
                card_icon={<OurPhilosophyIcon className="w-[80px] h-[80px] sm:w-[118px] sm:h-[118px]" />}
            />
            <CompanyInfo />
            <CompanyTeam />
            <CompanyPostList />
            <CompanyPartners />
            <PartnerReviewList />
            <FormLayout
                ref={feedbackRef}
                title={'Рассчитайте стоимость услуги'}
                nestedForm={
                    <CostCalculationForm
                        business_types={business_types}
                        promotion_types={promotion_types || []}
                    />
                }
            />
        </RequestHandler>
    );
}

export default AboutPage;