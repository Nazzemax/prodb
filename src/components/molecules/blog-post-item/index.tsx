import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface BlogPostItemProps {
    title: string;
    description: string;
    image: string;
    date: string;
}

export const BlogPostItem = ({
    title,
    description,
    image,
    date
}: BlogPostItemProps) => {
    return (
        <Card className="flex flex-col">
            <CardHeader className="p-0">
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={300}
                    className="rounded-t-lg w-full"
                />
            </CardHeader>
            <CardContent className="space-y-2 p-3">
                <h3 className="font-bold leading-5 text-xs md:text-base/5 line-clamp-2">
                    {title}
                </h3>
                <p className="text-gray2 text-xs/5 line-clamp-2">
                    {description}
                </p>
                <span className="text-gray2">{date}</span>
            </CardContent>
        </Card>
    )
}
