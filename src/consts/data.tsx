import CreatingAd1SVG from "@/assets/services/smm/creating-ad_1.svg";
import CreatingAd2SVG from "@/assets/services/smm/creating-ad_2.svg";
import CreatingAd3SVG from "@/assets/services/smm/creating-ad_3.svg";

import { ISmmCreatingAdData, ISmmTeamMembers } from "./types";
import {
    ServiceBrandingIcon1,
    ServiceBrandingIcon2,
    ServiceBrandingIcon3,
    ServiceBrandingIcon4,
    ServiceBrandingIcon5,
} from "@/assets/services/branding";
import {
    Card1Icon,
    Card2Icon,
    Card3Icon,
    SeoHowWeWork2,
    SeoHowWeWork3,
    SeoHowWeWork4,
    SeoHowWeWork5,
} from "@/assets/services/seo";
import {
    ServiceSmmIcon1,
    ServiceSmmIcon2,
    ServiceSmmIcon3,
    ServiceSmmIcon4,
    ServiceSmmIcon5,
    ServiceSmmIcon6,
} from "@/assets/services/smm";
import {
    ContextAd2Icon,
    ContextAd3Icon,
    ContextAd4Icon,
    ContextAd5Icon,
    ContextAd6Icon,
    ContextAdCard1Icon,
    ContextAdCard2Icon,
    ContextAdCard3Icon,
} from "@/assets/services/context-ad";
import { useTranslations } from "next-intl";

// SERVICES
// SMM

// : ISmmCreatingAdData
export const useSmmCreatingAdData = () => {
    const t = useTranslations("ServicesPage1");

    return {
        eyebrow: t("createReklam.miniText"),
        title: t("createReklam.title"),
        sub_title: t("createReklam.description"),
        items: [
            {
                image: "/images/services/smm/creating-ad_1.webp",
                icon: <CreatingAd1SVG />,
                title: t("createReklam.title1"),
                description: t("createReklam.desk1"),
            },
            {
                image: "/images/services/smm/creating-ad_2.webp",
                icon: <CreatingAd2SVG />,
                title: t("createReklam.title2"),
                description: t("createReklam.desk2"),
            },
            {
                image: "/images/services/smm/creating-ad_3.webp",
                icon: <CreatingAd3SVG />,
                title: t("createReklam.title3"),
                description: t("createReklam.desk3"),
            },
        ],
    };
};
//SMM
export const useSmmTeamMembers = () => {
    const t = useTranslations("ServicesPage1");
    return {
        title: t("smm.title"),
        items: [
            {
                image: <ServiceSmmIcon1 />,
                number: "01",
                title: t("smm.title1"),
                description: t("smm.desk1"),
            },
            {
                image: <ServiceSmmIcon2 />,
                number: "02",
                title: t("smm.title2"),
                description: t("smm.desk2"),
            },
            {
                image: <ServiceSmmIcon3 />,
                number: "03",
                title: t("smm.title3"),
                description: t("smm.desk3"),
            },
            {
                image: <ServiceSmmIcon4 />,
                number: "04",
                title: t("smm.title4"),
                description: t("smm.desk4"),
            },
            {
                image: <ServiceSmmIcon5 />,
                number: "05",
                title: t("smm.title5"),
                description: t("smm.desk5"),
            },
            {
                image: <ServiceSmmIcon6 />,
                number: "06",
                title: t("smm.title6"),
                description: t("smm.desk6"),
            },
        ],
    };
};





//SEO
export const useSeoData = () => {
    const t = useTranslations("ServicesPage3");
    return {
        title: t("whySEO.title"),
        items: [
            {
                image: "/images/services/seo/card_1.webp",
                icon: <Card1Icon />,
                title: t("whySEO.title1"),
                description: t("whySEO.content1"),
            },
            {
                image: "/images/services/seo/card_2.webp",
                icon: <Card2Icon />,
                title: t("whySEO.title2"),
                description: t("whySEO.content2"),
            },
            {
                image: "/images/services/seo/card_3.webp",
                icon: <Card3Icon />,
                title: t("whySEO.title3"),
                description: t("whySEO.content3"),
            },
        ],
    };
};

export const useSeoPostsData = () => {
    const t = useTranslations("ServicesPage3");
    return {
        title: t("servicesSEO.title"),
        items: [
            {
                image: "/images/services/seo/seo1-min.png",
                image_right: false,
                title: t("servicesSEO.title1"),
                tags: [
                    { tags: t("servicesSEO.tag1_1") },
                    { tags: t("servicesSEO.tag1_2") },
                    { tags: t("servicesSEO.tag1_3") },
                ],
            },
            {
                image: "/images/services/seo/seo2-min.png",
                image_right: true,
                title: t("servicesSEO.title2"),
                tags: [
                    { tags: t("servicesSEO.tag2_1") },
                    { tags: t("servicesSEO.tag2_2") },
                    { tags: t("servicesSEO.tag2_3") },
                ],
            },
            {
                image: "/images/services/seo/seo3-min.png",
                image_right: false,
                title: t("servicesSEO.title3"),
                tags: [
                    { tags: t("servicesSEO.tag3_1") },
                    { tags: t("servicesSEO.tag3_2") },
                    { tags: t("servicesSEO.tag3_3") },
                ],
            },
            {
                image: "/images/services/seo/seo4-min.png",
                image_right: true,
                title: t("servicesSEO.title4"),
                tags: [
                    { tags: t("servicesSEO.tag4_1") },
                    { tags: t("servicesSEO.tag4_2") },
                    { tags: t("servicesSEO.tag4_3") },
                ],
            },
            {
                image: "/images/services/seo/seo5-min.png",
                image_right: false,
                title: t("servicesSEO.title5"),
                tags: [
                    { tags: t("servicesSEO.tag5_1") },
                    { tags: t("servicesSEO.tag5_2") },
                    { tags: t("servicesSEO.tag5_3") },
                ],
            },
            {
                image: "/images/services/seo/seo6-min.png",
                image_right: true,
                title: t("servicesSEO.title6"),
                tags: [
                    { tags: t("servicesSEO.tag6_1") },
                    { tags: t("servicesSEO.tag6_2") },
                    { tags: t("servicesSEO.tag6_3") },
                ],
            },
        ],
    };
};
export const useSeoCardsData = () => {
    const t = useTranslations("ServicesPage3");
    return {
        title: t("howWeWork.title"),
        items: [
            {
                image: <ServiceBrandingIcon1 />,
                number: "01",
                title: t("howWeWork.title1"),
                description: t("howWeWork.desk1"),
            },
            {
                image: <SeoHowWeWork2 />,
                number: "02",
                title: t("howWeWork.title2"),
                description: t("howWeWork.desk2"),
            },
            {
                image: <SeoHowWeWork3 />,
                number: "03",
                title: t("howWeWork.title3"),
                description: t("howWeWork.desk3"),
            },
            {
                image: <SeoHowWeWork4 />,
                number: "04",
                title: t("howWeWork.title4"),
                description: t("howWeWork.desk4"),
            },
            {
                image: <SeoHowWeWork5 />,
                number: "05",
                title: t("howWeWork.title5"),
                description: t("howWeWork.desk5"),
            },
        ],
    };
};

//CONTEXT AD
export const useContextAdData = () => {
    const t = useTranslations("ServicesPage2");
    return {
        title: t("whyContext.title"),
        button:'',
        items: [
            {
                image: "/images/services/context-ad/card_1.webp",
                icon: <ContextAdCard1Icon />,
                title: t("whyContext.subtitle1"),
                description: t("whyContext.subdesk1"),
            },
            {
                image: "/images/services/context-ad/card_2.webp",
                icon: <ContextAdCard2Icon />,
                title: t("whyContext.subtitle2"),
                description: t("whyContext.subdesk2"),
            },
            {
                image: "/images/services/context-ad/card_3.webp",
                icon: <ContextAdCard3Icon />,
                title: t("whyContext.subtitle3"),
                description: t("whyContext.subdesk3"),
            },
        ],
    };
};

export const useContextAdCardData = () => {
    const t = useTranslations("ServicesPage2");
    return {
        title: t("howWeWork.title"),
        items: [
            {
                image: <ServiceBrandingIcon1 />,
                number: "01",
                title: t("howWeWork.subdesk1"),
                isContextAd: true,
            },
            {
                image: <ContextAd2Icon />,
                number: "02",
                title: t("howWeWork.subdesk2"),
                isContextAd: true,
            },
            {
                image: <ContextAd3Icon />,
                number: "03",
                title: t("howWeWork.subdesk3"),
                isContextAd: true,
            },
            {
                image: <ContextAd4Icon />,
                number: "04",
                title: t("howWeWork.subdesk4"),
                isContextAd: true,
            },
            {
                image: <ContextAd5Icon />,
                number: "05",
                title: t("howWeWork.subdesk5"),
                isContextAd: true,
            },
            {
                image: <ContextAd6Icon />,
                number: "06",
                title: t("howWeWork.subdesk6"),
                isContextAd: true,
            },
        ],
    };
};
