import { Heading } from "@/components/atoms/heading";
import { ServicePostItem } from "@/components/molecules/service-post-item";
import { memo } from "react";

export interface IServicePostItem {
    image?: string;
    video_link?: string;
    btn?: string;
    image_right: boolean;
    title: string;
    sub_title?: string;
    tags?: { tags: string }[],
    description?: string;
    has_button?: boolean;
}

export interface IServicePostItemBranding {
    image?: string;
    video_link?: string;
    btn?: string;
    image_right: boolean;
    title: string;
    sub_title?: string;
    tags?: { tags: string }[];
    description?: string;
    has_button?: boolean;
}

interface ServicePostListProps {
    title: string;
    description?: string;
    items?: IServicePostItemBranding[];
}

export const ServicePostList = ({
    title,
    description,
    items,
}: ServicePostListProps) => {
    return (
        <div className="w-full max-w-[1920px] flex justify-center px-4 lg:px-10 py-5 md:py-16">
            <div className="max-w-[1328px] flex flex-col justify-center items-start gap-y-5 lg:gap-y-10">
                {description
                    ? <div className="flex flex-col lg:flex-row gap-4">
                        <Heading as="h2" className="lg:basis-[60%] space-y-5">{title}</Heading>
                        <p className="text-gray2 flex items-start text-sm md:text-base lg:basis-[40%]">{description}</p>
                    </div>
                    : <Heading as="h2">{title}</Heading>
                }

                <div className="w-full flex flex-col gap-y-20">
                    {items?.map((post) => (
                        <ServicePostItem
                            key={post.title}
                            image={post.image}
                            image_right={post.image_right}
                            title={post.title}
                            sub_title={post.sub_title}
                            description={post.description}
                            video_link={post.video_link}
                            tags={post.tags}
                            btn={post.btn}
                            has_button={post.has_button}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}