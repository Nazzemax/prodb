import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbProps } from "./type";
import { Heading } from "@/components/atoms/heading";
import Image from "next/image";
import { FeedbackButton } from "@/components/atoms/feedback-button";

interface PageTitleLayoutProps {
    title: string;
    top_title?: string;
    sub_title?: string;
    button_text: string;
    bg_image?: string;
    breadcrumb?: BreadcrumbProps[];
    isGray?: boolean;
}

export const PageTitleLayout = ({
    title,
    top_title,
    sub_title,
    button_text,
    breadcrumb,
    bg_image,
    isGray,
}: PageTitleLayoutProps) => {

    return (
        <div className="relative h-screen max-w-[1920px] flex justify-center items-center bg-cover bg-center bg-no-repeat">
            {bg_image &&
                <Image
                    src={bg_image}
                    alt="BG_IMAGE"
                    priority
                    fetchPriority="high"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    quality={75}
                    blurDataURL="/image.webp"
                />
            }
            <div
                className={`absolute inset-0 ${isGray ? "bg-gradient-to-t" : "bg-gradient-to-r"
                } from-black to-black/10`}
            />
            <div className="max-w-[1280px] h-screen flex flex-col justify-center md:items-center gap-y-6 px-5 z-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumb?.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3"
                            >
                                <BreadcrumbItem>
                                    {idx !== breadcrumb.length - 1 ? (
                                        <BreadcrumbLink href={item.href}>
                                            {item.text}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage>{item.text}</BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                                {idx !== breadcrumb.length - 1 && <BreadcrumbSeparator />}
                            </div>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
                {top_title && (
                    <h2 className="text-[20px] text-white md:text-center uppercase">
                        {top_title}
                    </h2>
                )}

                <Heading as="h1" className="text-secondary md:text-center">
                    {title}
                </Heading>
                {sub_title && (
                    <h3 className="text-gray text-sm md:text-md lg:text-lg md:text-center">
                        {sub_title}
                    </h3>
                )}
                <FeedbackButton button_text={button_text} />
            </div>
        </div>
    );
};
