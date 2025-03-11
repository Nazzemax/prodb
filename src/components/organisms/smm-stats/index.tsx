"use client";

import CompanyInfoSVG from "@/assets/backgrounds/company_info.svg";
import { StatItem } from "@/components/molecules/stat-item";
import { Heading } from "@/components/atoms/heading";
import { Stat1, Stat2, Stat3, Stat4 } from "@/assets/company-info";
import { useGetCompanyAchievementsQuery } from "@/api/Company";
import { AnimatedItem } from "@/components/atoms/animated-item";

const icons = [
    <Stat1 key="stat1" />,
    <Stat2 key="stat2" />,
    <Stat3 key="stat3" />,
    <Stat4 key="stat4" />,
];

export const SmmStats = () => {
    const { data, isLoading, error } = useGetCompanyAchievementsQuery();

    return (
        <div className="w-full max-w-[1920px]">
            <div className="relative bg-background-dark py-14 lg:py-36 px-4 md:px-40 text-white overflow-hidden z-10">
                <Heading
                    as="h4"
                    className="text-gray font-light uppercase text-lg md:text-xl max-w-sm"
                >
          Цифры, которые говорят сами за себя
                </Heading>
                <div className="flex justify-center flex-wrap gap-7 mt-8 overflow-hidden">
                    {data?.items?.map((stat, index) => (
                        <AnimatedItem idx={index} key={stat.title}>
                            <StatItem
                                key={index}
                                title={stat.title}
                                sub_title={stat.sub_title}
                                idx={index}
                                icon={icons[index]}
                                isService={true}
                            />
                        </AnimatedItem>
                    ))}
                </div>
                <div>
                    <CompanyInfoSVG className="absolute left-0 lg:left-auto -z-10 bottom-0 max-w-[1920px] object-cover" />
                </div>
            </div>
        </div>
    );
};
