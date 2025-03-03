import { Separator } from "@/components/ui/separator";
import { ArrowUpRight } from "lucide-react";

interface MarketingChapterProps {
    number: string;
    title: string;
}

export const MarketingChapter = ({
    number,
    title,
}: MarketingChapterProps) => {
    return (
        <div className="flex flex-col gap-y-3 lg:gap-y-6">
            <h3 className="text-gray text-2xl">{number}</h3>
            <Separator />
            <div className="flex justify-between items-center lg:items-start">
                <h2 className="text-dark text-primary xl:text-[28px] leading-[1.2] font-bold">{title}</h2>
                <div className="bg-accent rounded-full text-white hover:cursor-pointer lg:h-10 lg:w-16 p-2">
                    <ArrowUpRight className="" />
                </div>
            </div>
        </div>
    )
}
