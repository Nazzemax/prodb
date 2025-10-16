import { getStaticPageBySlug } from "@/api/StaticPages";
import { getPromotionTypes } from "@/api/Types";
import { MarketingSupportIcon } from "@/assets/info-card";
import { ContextAd5Icon } from "@/assets/services/context-ad";
import { ServiceCrmIcon2 } from "@/assets/services/crm";
import { MarketingIcon } from "@/assets/services/marketing";
import { SeoHowWeWork5 } from "@/assets/services/seo";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import CompanyPostList from "@/components/organisms/company-post-list";
import { CompanyServiceCardList } from "@/components/organisms/company-service-card-list";
import { InfoCard } from "@/components/organisms/info-card";
import { MarketingResults } from "@/components/organisms/marketing-results";
import { ServicePostList } from "@/components/organisms/service-post-list";
import FormLayout from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;

const MarketingSupportPage = async () => {
    const [data, t, t2, promotion_types] = await Promise.all([
        getStaticPageBySlug("marketing-support"),
        getTranslations("ServicesPage8"),
        getTranslations("Buttons"),
        getPromotionTypes(),
    ]);
    
    const serviceData = {
        title: t("WhatWeDo.mainTitle"),
        items: [
            {
                image: "/images/services/marketing-support/marketingone.webp",
                image_right: false,
                title: t("WhatWeDo.fTitle"),
                sub_title: "",
                description: t("WhatWeDo.fText"),
                tags: [{ tags: "" }, { tags: "" }],
            },
            {
                image: "/images/services/marketing-support/marketingtwo.webp",
                image_right: true,
                title: t("WhatWeDo.sTitle"),
                sub_title: "",
                description: t("WhatWeDo.sText"),
                tags: [{ tags: "" }, { tags: "" }],
            },
            {
                image: "/images/services/marketing-support/marketingthree.webp",
                image_right: false,
                title: t("WhatWeDo.thTitle"),
                sub_title: "",
                description: t("WhatWeDo.thText"),
                tags: [{ tags: "" }, { tags: "" }],
            },
            {
                image: "/images/services/marketing-support/marketingzero.webp",
                image_right: true,
                title: t("WhatWeDo.fourTitle"),
                sub_title: "",
                description: t("WhatWeDo.fourText"),
                tags: [{ tags: "" }, { tags: "" }],
            },
            {
                image: "/images/services/marketing-support/marketingfive.webp",
                image_right: false,
                title: t("WhatWeDo.fiveTitle"),
                sub_title: "",
                description: t("WhatWeDo.fiveText"),
                tags: [{ tags: "" }, { tags: "" }],
            },
        ],
    };

    const serviceWhyChooseUsData = {
        title: t("WhyChoose.title"),
        items: [
            {
                image: <ContextAd5Icon />,
                number: "01",
                title: t("WhyChoose.fBlockTitle"),
                description: t("WhyChoose.fBlockText"),
            },
            {
                image: <ServiceCrmIcon2 />,
                number: "02",
                title: t("WhyChoose.sBlockTitle"),
                description: t("WhyChoose.sBlockText"),
            },
            {
                image: <MarketingIcon />,
                number: "03",
                title: t("WhyChoose.tBlockTitle"),
                description: t("WhyChoose.tBlockText"),
            },
            {
                image: <SeoHowWeWork5 />,
                number: "04",
                title: t("WhyChoose.fourBlockTitle"),
                description: t("WhyChoose.fourBlockText"),
            },
        ],
    };

    const dataResults = [
        {
            title: t("ResultsBlock.title"),
            number: t("ResultsBlock.number1"),
            text: t("ResultsBlock.text1"),
        },
        {
            title: "",
            number: t("ResultsBlock.number2"),
            text: t("ResultsBlock.text2"),
        },
        {
            title: "",
            number: t("ResultsBlock.number3"),
            text: t("ResultsBlock.text3"),
        },
        {
            title: "",
            number: t("ResultsBlock.number4"),
            text: t("ResultsBlock.text4"),
        },
    ];

    return (
        <>
            {data && (
                <PageTitleLayout
                    title={data.title}
                    sub_title={data.content}
                    bg_image={data.image}
                    button_text={t("headerBtn")}
                    breadcrumb={[
                        { text: "Главная", href: "/home" },
                        {
                            text: "Комплексное маркетинговое сопровождение",
                            href: "/services/marketing-support",
                        },
                    ]}
                    isGray
                />
            )}
            <InfoCard
                title={t("MarketingSupport.title")}
                description={t("MarketingSupport.subtitle")}
                card_title={t("MarketingSupport.bottomTitle")}
                card_description={t("MarketingSupport.bottomText")}
                card_icon={<MarketingSupportIcon />}
                image={"/images/services/marketing-support/marketing.webp"}
            />
            <ServicePostList title={serviceData.title} items={serviceData.items} />
            <CompanyServiceCardList
                button={t2("btn1")}
                title={serviceWhyChooseUsData.title}
                items={serviceWhyChooseUsData.items}
            />
            <MarketingResults data={dataResults} />
            <CompanyPostList />
            <FormLayout nestedForm={<CostCalculationForm promotion_types={promotion_types} />} />
        </>
    );
};

export default MarketingSupportPage;
