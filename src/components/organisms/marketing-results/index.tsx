import { Heading } from "@/components/atoms/heading";
import { MarketingResultItem } from "@/components/molecules/marketing-result-item";
import { AwardBg } from "@/assets/backgrounds";
import React from "react";

export interface DataItem {
  title: string;
  number: string;
  text: string;
}

interface MarketingResult {
  data: DataItem[];
}

export const MarketingResults: React.FC<MarketingResult> = ({ data }) => {
    return (
        <div className="relative w-full max-w-[1920px] bg-background-dark overflow-hidden">
            <div className="max-w-[1328px] m-auto flex flex-col py-8 md:py-28 px-4 md:px-16 lg:px-32 xl:px-0">
                <Heading as="h2" className="text-primary-foreground">
                    {data?.[0].title}
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    {data.map((item) => (
                        <MarketingResultItem
                            key={item.number}
                            number={item.number}
                            text={item.text}
                        />
                    ))}
                </div>
            </div>
            <AwardBg className="absolute top-0 md:top-20 md:left-2/4" />
        </div>
    );
};
