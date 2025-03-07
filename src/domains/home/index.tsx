"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";
import { Award } from "@/components/organisms/award";
import { Checkup } from "@/components/organisms/checkup";
import { CompanyChallengeList } from "@/components/organisms/company-challenge-list";
import { CompanyFeatures } from "@/components/organisms/company-features";
import { CompanyInfo } from "@/components/organisms/company-info";
import { CompanyPartners } from "@/components/organisms/company-partners";
import { CompanyPostList } from "@/components/organisms/company-post-list";
import { MarketingDepartment } from "@/components/organisms/marketing-department";
import { SingleSliderList } from "@/components/organisms/single-slider-list";
import { VideoAboutCompany } from "@/components/organisms/video-about-company";
import { FeedbackForm } from "@/components/forms/feedback-form";
import { FormLayout } from "@/components/templates/form-layout";
import { PartnerReviewList } from "@/components/organisms/partner-review-list";
import { useTranslations } from "next-intl";
import { Advantages } from "@/components/organisms/advantages/Advantages";

const HomePage = () => {
    const t = useTranslations("HomePage");

    return (
        <>
            <SingleSliderList />
            <FloatingWhatsApp
                phoneNumber="+996500160074" // Номер телефона в международном формате
                accountName="Bold Brands International"
                notificationSound
                chatMessage="Доброго времени суток, чем могу вам помочь?"
                statusMessage="Онлайн"
                darkMode
                avatar="/images/main_page/diploma.jpg"
                placeholder="Введите текст"
            />
            <MarketingDepartment />
            <VideoAboutCompany />
            <Advantages />
            <CompanyChallengeList />
            <CompanyFeatures />
            <Checkup />
            <CompanyPostList />
            <Award
                badgeTitle={t("section2.btn")}
                title={t("section2.title")}
                sub_title={t("section2.description")}
                image={"/images/main_page/diploma.jpg"}
            />
            <CompanyPartners />
            <PartnerReviewList />
            <FormLayout
                title={"Получите бесплатную консультацию"}
                nestedForm={<FeedbackForm />}
            />
        </>
    );
};

export default HomePage;
