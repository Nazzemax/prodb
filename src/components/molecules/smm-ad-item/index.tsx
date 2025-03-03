import { Heading } from "@/components/atoms/heading";
import { SubTitle } from "@/components/atoms/sub-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface SmmAdItemProps {
    image: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const SmmAdItem = ({
    image,
    icon,
    title,
    description
}: SmmAdItemProps) => {
    return (
        <Card className="rounded-2xl max-w-[421px] bg-transparent  h-full flex flex-col">
            <CardHeader className="relative p-0">
                <Image
                    src={image}
                    alt={title}
                    width={421}
                    height={267}
                    className="rounded-2xl h-[200px] md:h-[267px] object-cover w-full"
                />
                <span className="absolute top-3 left-3 bg-accent p-2 rounded-2xl">
                    {icon}
                </span>
            </CardHeader>
            <CardContent className="mt-4 space-y-3 flex-grow">
                <Heading as="h4" className="text-primary text-xl md:text-2xl">{title}</Heading>
                <SubTitle>{description}</SubTitle>
            </CardContent>
        </Card>
    )
}
