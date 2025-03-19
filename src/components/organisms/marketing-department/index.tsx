"use client";

import { MarketingChapter } from "@/components/molecules/marketing-department-chapter";
import MarketingDepartmentBg from "@/assets/backgrounds/marketing_department.svg";
import { Heading } from "@/components/atoms/heading";
import { useGetMarketingDepartmentQuery } from "@/api/Marketing";
import { RequestHandler } from "@/components/atoms/request-handler";
import { motion } from "framer-motion";
import {
    defaultTransition,
    fadeIn,
    staggerTransition,
    viewportConfig,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import useInView from "@/hooks/useInView";

interface Props {
    isPrint?: boolean;
}

export const MarketingDepartment: React.FC<Props> = ({ isPrint }) => {
    const { data, isLoading, error } = useGetMarketingDepartmentQuery();
    const { ref: titleRef, isInView: isTitleVisible } = useInView();

    return (
        <section
            aria-labelledby="marketing-department"
            className="relative flex justify-center p-4 md:px-16 lg:px-40"
        >
            <MarketingDepartmentBg
                id="marketing-department"
                className="absolute top-3/4 md:top-32 left-0 -z-50 max-w-[1920px]"
            />
            <div className="flex flex-col gap-y-16 w-full max-w-[1280px] py-14 md:py-36">
                <RequestHandler isLoading={isLoading} error={error} data={data}>
                    <div className="flex flex-col md:flex-row gap-y-5 gap-x-10">
                        <Heading as="h2">
                            {data?.title}
                        </Heading>
                        <p className="flex items-end text-gray2 text-lg lg:text-2xl">
                            {data?.sub_title}
                        </p>
                    </div>
                    {/* Главы */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {data?.chapters.map((chapter, idx) => (
                            <div
                                key={chapter.number}
                                className={cn(isTitleVisible ? "animate-text" : "")}
                            >
                                <MarketingChapter
                                    number={chapter.number}
                                    title={chapter.title}
                                />
                            </div>
                        ))}
                    </div>
                </RequestHandler>
            </div>
        </section>
    );
};
