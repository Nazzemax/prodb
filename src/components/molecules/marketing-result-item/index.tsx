import { Heading } from "@/components/atoms/heading";
import { Separator } from "@/components/ui/separator";

interface MarketingResultItemProps {
    number: string;
    text: string;
}

export const MarketingResultItem = ({
    number,
    text
}: MarketingResultItemProps) => {
    return (
        <div className="flex gap-5">
            <Separator orientation="vertical" className="hidden md:flex w-[1px] bg-gray2" />
            <div className="flex flex-col gap-y-3">
                <Heading as="h4" className="text-accent">{number}</Heading>
                <p className="text-sm md:text-xl text-primary-foreground">{text}</p>
                <Separator className="flex md:hidden" />
            </div>
        </div>
    )
}
