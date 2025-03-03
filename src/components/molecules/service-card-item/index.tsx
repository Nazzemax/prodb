import { Heading } from "@/components/atoms/heading";
import { SubTitle } from "@/components/atoms/sub-title";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardItemProps {
    image: React.ReactNode;
    number: string;
    title: string;
    isContextAd?: boolean;
    description?: string;
}

export const ServiceCardItem = ({
    image,
    number,
    title,
    isContextAd,
    description
}: ServiceCardItemProps) => {
    return (
        <Card className={cn(
            'flex flex-col xl:flex-row gap-6 p-6 md:min-h-[461px] lg:min-h-[280px] rounded-3xl hover:shadow-xl min-h-[280px] transition-all duration-300',
            isContextAd ? 'px-6 py-10' : ''
        )}>
            <div className="w-20 h-20 md:w-[140px] md:h-[140px] md:m-auto">
                {image}
            </div>
            <CardContent className="flex flex-col justify-center gap-y-1 md:gap-y-3 p-0">
                <span className="text-graphic-gray2">{number}</span>
                {isContextAd
                    ? <Heading as="h4" className="text-primary text-lg md:text-xl font-normal max-w-sm">{title}</Heading>
                    : <Heading as="h4" className="text-primary text-lg md:text-xl">{title}</Heading>
                }
                {description &&
                    <SubTitle>
                        {description}
                    </SubTitle>
                }
            </CardContent>
        </Card>
    )
}
