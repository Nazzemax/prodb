'use client';

import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { useGetSiteTypesQuery } from "@/api/Types";
import { RequestHandler } from "@/components/atoms/request-handler";
import { SiteCreatingFeedbackForm } from "@/components/forms/site-creating-form";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { useAppData } from "@/context/app-context";
import useScrollToFeedback from "@/hooks/useScrollToFeedback";
import { useSlug } from "@/hooks/useSlug";

const serviceData = {
    title: 'Наш подход к созданию сайтов',
    description: 'Мы выявляем уникальные особенности вашего бренда и формируем его четкое позиционирование. Наши креативные дизайны привлекают внимание и удерживают клиентов, делая ваш сайт запоминающимся. Мы интегрируем современные технологии, гарантируя функциональность и эффективность вашего веб-решения.',
    items: [
        {
            image: "/images/services/site/site1.png",
            image_right: false,
            title: 'Лендинги',
            sub_title: 'Привлекаем внимание и конвертируем посетителей',
            description: 'Наши лендинги разработаны с акцентом на максимальную конверсию. Мы создаем привлекательные и современные страницы, которые не только привлекают внимание, но и побуждают посетителей к действию — покупка, регистрация или запрос информации.',
        },
        {
            image: "/images/services/site/site2.png",
            image_right: true,
            title: 'Корпоративные сайты',
            sub_title: 'Профессиональное представление вашего бренда',
            description: 'Корпоративные сайты от Bold Brands отражают уникальность вашего бизнеса и укрепляют доверие клиентов. Мы создаем интуитивно понятные, адаптивные и SEO-оптимизированные сайты, которые эффективно передают ваши ценности и предложения, обеспечивая удобную навигацию и привлекательный дизайн.',
        },
        {
            image: "/images/services/site/site3.png",
            image_right: false,
            title: 'Интернет-магазины',
            sub_title: 'Увеличиваем продажи онлайн',
            description: 'Мы создаем интернет-магазины, которые обеспечивают удобный процесс покупок и помогают увеличивать продажи. Мы используем современные e-commerce платформы, гарантируем безопасность платежей и разрабатываем простые в использовании интерфейсы, чтобы ваши клиенты возвращались снова.',
        },
        {
            image: "/images/services/site/site4.png",
            image_right: true,
            title: 'UX/UI-дизайн',
            sub_title: 'Интуитивный и уникальный интерфейс для вашего сайта',
            description: 'Наши специалисты по UX/UI-дизайну создают удобные и привлекательные интерфейсы, чтобы пользователям было комфортно взаимодействовать с вашим сайтом. Мы уделяем внимание простой навигации и красивому дизайну, что помогает удержать посетителей и увеличивает конверсию.',
        },
    ]
}

const SiteCreatingPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug)
    const { data: site_types } = useGetSiteTypesQuery()
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
                    button_text={"Заказать сайт"}
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
                ref={ref}
                title={"Рассчитайте стоимость услуги "}
                nestedForm={
                    <SiteCreatingFeedbackForm
                        business_types={business_types}
                        site_types={site_types || []} />
                }
            />
        </RequestHandler>
    );
}

export default SiteCreatingPage;