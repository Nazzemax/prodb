import React from "react";
import { getTranslations } from "next-intl/server";
import { getFaqs } from "@/api/Faq";
import { Heading } from "@/components/atoms/heading";
import { FaqItem } from "@/components/molecules/faq-item";
import { Accordion } from "@/components/ui/accordion";

export const Faq = async () => {
    const data = await getFaqs();
    const t = await getTranslations("ServicesPage3");

    const title: string = t("faq.title");

    return (
        <div className="max-w-[1920px] bg-background-gray">
            <div className="max-w-[1280px] m-auto py-10 md:py-24">
                <Heading as="h2" className="text-center mb-16">
                    {title}
                </Heading>
                <Accordion
                    type="single"
                    collapsible
                    className="max-w-[800px] m-auto space-y-3 px-5 lg:px-0"
                >
                    {data?.map((item) => (
                        <FaqItem
                            key={item.question}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </Accordion>
            </div>
        </div>
    );
};
