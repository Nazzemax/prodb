"use client";

import { FeedbackContactItem } from "@/components/atoms/feedback-contact-item";
import { Heading } from "@/components/atoms/heading";
import { useAppData } from "@/context/app-context";
import mergeRefs, { cn } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { forwardRef, memo, useMemo } from "react";

interface ContactItem {
    icon?: React.ReactNode;
    title: string;
    contact: string;
    href?: string;
}

interface FormProps {
    title?: string;
    nestedForm: React.ReactNode;
    isContactPage?: boolean;
}

const BgImage = memo(() => {
    return (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[800px]">
            <Image
                src={"/images/form_bg.png"}
                alt="form_bg"
                width={800}
                height={600}
                className="w-full h-auto"
            />
        </div>
    )
})

BgImage.displayName = "FormBgImage"

const FormLayout = forwardRef<HTMLDivElement, FormProps>(
    (
        { title = "Рассчитайте стоимость услуги", nestedForm, isContactPage },
        ref
    ) => {
        const t = useTranslations("FormLayout");
        const { feedbackRef, data: info } = useAppData();
        const refs = mergeRefs(ref, feedbackRef);
        const data: ContactItem[] = useMemo(
            () => [
                {
                    icon: <Phone />,
                    title: t("companyKGPhone"),
                    contact: `${info?.phones[0]?.phone}`,
                    href: `tel:${info?.phones[0]?.phone}`,
                },
                {
                    title: t("companyUZPhone"),
                    contact: `${info?.phones[1]?.phone}`,
                    href: `tel:${info?.phones[1]?.phone}`,
                },
                {
                    icon: <Mail />,
                    title: t("companyEmail"),
                    contact: `${info?.emails[0]?.email}`,
                    href: `tel:${info?.emails[0]?.email}`,
                },
            ],
            [t, info]
        );

        return (
            <div
                ref={refs}
                className="relative w-full max-w-[1920px] min-h-screen bg-background-dark flex justify-center items-center"
            >
                <BgImage />
                <div
                    className={cn(
                        "relative z-10 m-auto max-w-[1328px] flex flex-col lg:flex-row items-center gap-y-3 py-10 lg:py-0 justify-center px-4 text-white",
                        isContactPage ? "pt-24" : ""
                    )}
                >
                    <div className="flex flex-col gap-y-3 md:gap-y-8 lg:w-1/2">
                        <Heading
                            as="h2"
                            className="text-primary-foreground lg:text-3xl xl:text-5xl"
                        >
                            {t("title")}
                        </Heading>
                        <h3
                            className="text-base md:text-lg text-gray2"
                        >
                            {t("subTitle")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                            {data.map((contact, idx) => (
                                <FeedbackContactItem
                                    key={idx}
                                    {...contact}
                                    idx={idx}
                                    lastIdx={data.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                    <div
                        className={cn(
                            "flex-1 w-full lg:w-1/2 max-w-[600px]",
                            isContactPage ? "md:pt-14" : ""
                        )}
                    >
                        {nestedForm}
                    </div>
                </div>
            </div>
        );
    }
);

export default FormLayout;

FormLayout.displayName = "FormLayout";
