import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface BlogPostItemProps {
    title: string;
    description: string;
    image: string;
    date: string;
    link: string;
}

export const BlogPostItem = ({
    title,
    description,
    image,
    date,
    link
}: BlogPostItemProps) => {

    return (
        <Link href={link} target="_blank">
            <Card className="flex flex-col max-w-[390px] max-h-[450px] hover:shadow-lg hover:border-transparent transition-all duration-500">
                <CardHeader className="relative overflow-hidden group rounded-t-lg p-0">
                    <Image
                        src={image}
                        alt={title}
                        width={390}
                        height={250}
                        loading="lazy"
                        className="rounded-t-lg w-full h-[200px] object-cover transition-transform duration-500 scale-100 group-hover:scale-110 will-change-transform"
                    />
                </CardHeader>
                <CardContent className="space-y-2 p-3">
                    <h3 className="font-bold leading-5 text-xs md:text-base/5 line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-gray2 text-xs/5 line-clamp-2">
                        {description}
                    </p>
                    <span className="text-gray2 text-sm">{date}</span>
                </CardContent>
            </Card>
        </Link>
    )
}
