import { AnimatedItem } from "@/components/atoms/animated-item";
import { Heading } from "@/components/atoms/heading";
import { ServicePostItem } from "@/components/molecules/service-post-item";
import { deafultTextAnimation } from "@/lib/motion";
import { motion } from "framer-motion";

export interface IServicePostItem {
    image?: string;
    video_link?:string;
    image_right: boolean;
    title: string;
    sub_title?: string;
    tags?: { tags: string }[],
    description?: string;
    has_button?: boolean;
}

interface ServicePostListProps {
    title: string;
    description?: string;
    items: IServicePostItem[];
    scrollToFeedback?: () => void
}

export const ServicePostList = ({
    title,
    description,
    items,
    scrollToFeedback
}: ServicePostListProps) => {
    return (
        <div className="w-full max-w-[1920px] flex justify-center px-4 md:px-16 lg:px-32 py-5 md:py-16">
            <div className="max-w-[1280px] flex flex-col justify-center items-start gap-y-5 lg:gap-y-10">
                {description
                    ? <div className="flex flex-col lg:flex-row gap-4">
                        <Heading as="h2" className="lg:basis-[60%] space-y-5">{title}</Heading>
                        <motion.p {...deafultTextAnimation} className="text-gray2 flex items-start text-sm md:text-base lg:basis-[40%]">{description}</motion.p>
                    </div>
                    : <Heading as="h2">{title}</Heading>
                }

                <div className="w-full flex flex-col gap-y-12 md:gap-y-20">
                    {items.map((post, idx) => (
                        <AnimatedItem key={idx} idx={idx}>
                            <ServicePostItem
                                image={post.image}
                                image_right={post.image_right}
                                title={post.title}
                                sub_title={post.sub_title}
                                description={post.description}
                                tags={post.tags}
                                has_button={post.has_button}
                                scrollToFeedback={scrollToFeedback}
                            />
                        </AnimatedItem>

                    ))}
                </div>
            </div>
        </div>
    )
}
