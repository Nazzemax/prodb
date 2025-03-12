'use client';

import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { useGetTaskTypesQuery } from "@/api/Types";
import { MarketingSupportIcon } from "@/assets/info-card";
import { ContextAd5Icon } from "@/assets/services/context-ad";
import { ServiceCrmIcon2} from "@/assets/services/crm";
import { MarketingIcon } from "@/assets/services/marketing";
import { SeoHowWeWork5 } from "@/assets/services/seo";
import { RequestHandler } from "@/components/atoms/request-handler";
import { MarketingSupportFeedbackForm } from "@/components/forms/marketing-support-form";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { InfoCard } from "@/components/organisms/info-card";
import { MarketingResults } from "@/components/organisms/marketing-results";
import { ServicePostList } from "@/components/organisms/service-post-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { useAppData } from "@/context/app-context";
import { useSlug } from "@/hooks/useSlug";
import { useTranslations } from "next-intl";





const MarketingSupportPage = () => {
    const t = useTranslations("ServicesPage8")
    const t2 = useTranslations("Buttons")
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug)
    const { data: task_types } = useGetTaskTypesQuery()
    const { business_types } = useAppData()

    const serviceData = {
        title: t('WhatWeDo.mainTitle'),
        items: [
            {
                image: "/images/services/marketing-support/marketing1.png",
                image_right: false,
                title: t('WhatWeDo.fTitle'),
                sub_title: '',
                description: t('WhatWeDo.fText'),
                tags: [
                    { tags: '' },
                    { tags: '' }
                ]
            },
            {
                image: "/images/services/marketing-support/marketing2.png",
                image_right: true,
                title: t('WhatWeDo.sTitle'),
                sub_title: '',
                description: t('WhatWeDo.sText'),
                tags: [
                    { tags: '' },
                    { tags: '' }
                ]
            },
            {
                image: "/images/services/marketing-support/marketing3.png",
                image_right: false,
                title: t('WhatWeDo.thTitle'),
                sub_title: '',
                description: t('WhatWeDo.thText'),
                tags: [
                    { tags: '' },
                    { tags: '' }
                ]
            },
            {
                image: "/images/services/marketing-support/marketing4.png",
                image_right: true,
                title: t('WhatWeDo.fourTitle'),
                sub_title: '',
                description: t('WhatWeDo.fourText'),
                tags: [
                    { tags: '' },
                    { tags: '' }
                ]
            },
            {
                image: "/images/services/marketing-support/marketing5.png",
                image_right: false,
                title: t('WhatWeDo.fiveTitle'),
                sub_title: '',
                description: t('WhatWeDo.fiveText'),
                tags: [
                    { tags: '' },
                    { tags: '' }
                ]
            }
        ]
    };

    const serviceWhyChooseUsData = {
        title: t('WhyChoose.title'),
        items: [
            {
                image: <ContextAd5Icon />,
                number: "01",
                title: t('WhyChoose.fBlockTitle'),
                description: t('WhyChoose.fBlockText')
            },
            {
                image: <ServiceCrmIcon2 />,
                number: "02",
                title: t('WhyChoose.sBlockTitle'),
                description: t('WhyChoose.sBlockText')
            },
            {
                image: <MarketingIcon/>,
                number: "03",
                title: t('WhyChoose.tBlockTitle'),
                description: t('WhyChoose.tBlockText')
            },
            {
                image: <SeoHowWeWork5 />,
                number: "04",
                title: t('WhyChoose.fourBlockTitle'),
                description: t('WhyChoose.fourBlockText')
            }
        ],
    };

    const dataResults = [
        {
            title:t('ResultsBlock.title'),
            number: t('ResultsBlock.number1'),
            text: t('ResultsBlock.text1')
        },
        {
            title:'',
            number: t('ResultsBlock.number2'),
            text: t('ResultsBlock.text2')
        },
        {
            title:'',
            number: t('ResultsBlock.number3'),
            text: t('ResultsBlock.text3')
        },
        {
            title:'',
            number: t('ResultsBlock.number4'),
            text: t('ResultsBlock.text4')
        }
    ];

    return (
        <RequestHandler
            isLoading={isLoading}
            error={error}
            data={data}
        >
            {data &&
                <PageTitleLayout
                    title={data.title}
                    sub_title={data.content}
                    bg_image={data.image}
                    button_text={t('headerBtn')}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Комплексное маркетинговое сопровождение', href: '/services/marketing-support' },
                    ]}
                    isGray
                />
            }
            <InfoCard
                title={t("MarketingSupport.title")}
                description={t("MarketingSupport.subtitle")}
                card_title={t("MarketingSupport.bottomTitle")}
                card_description={t("MarketingSupport.bottomText")}
                card_icon={<MarketingSupportIcon />}
                image={'/images/services/smm/creating-ad_1.webp'}
            />
            <ServicePostList
                title={serviceData.title}
                items={serviceData.items}
            />
            <CompanyServiceCardList
                button={t2("btn1")}
                title={serviceWhyChooseUsData.title}
                items={serviceWhyChooseUsData.items}
            />
            <MarketingResults data={dataResults} />
            <CompanyPostList />
            <FormLayout
                nestedForm={
                    <MarketingSupportFeedbackForm
                        business_types={business_types}
                        task_types={task_types || []}
                    />
                }
            />
        </RequestHandler>
    );
}

export default MarketingSupportPage;