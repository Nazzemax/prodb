import Image from "next/image";
import { memo } from "react";
import { FeedbackButton } from "@/components/atoms/feedback-button";
import { Heading } from "@/components/atoms/heading";
import { VideoPlayer } from "@/components/atoms/video-player";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { normalizeTagLabels } from "@/lib/tag-utils";

interface ServicePostItemProps {
    image?: string;
    video_link?: string;
    btn?: string;
    image_right: boolean;
    title: string;
    sub_title?: string;
    tags?: { tags: string }[];
    description?: string;
    has_button?: boolean;
    scrollToFeedback?: () => void;
}


export const ServicePostItem = memo(
    ({
        image,
        video_link,
        image_right,
        title,
        sub_title,
        btn,
        tags,
        description,
        has_button,
    }: ServicePostItemProps) => {
        const normalizedTags = normalizeTagLabels(tags);

        return (
            <div
                className={cn(
                    "flex gap-5 lg:gap-10 flex-col-reverse",
                    image_right ? "lg:flex-row-reverse" : "lg:flex-row"
                )}
            >
                <div className="lg:w-1/2 lg:m-auto">
                    {image && (
                        <Image
                            src={image}
                            alt={title}
                            width={648}
                            height={340}
                            className="rounded-3xl border object-cover w-screen h-[190px] md:h-[339px]"
                            quality={100}
                            loading="lazy"
                        />
                    )}
                    {video_link && (
                        <div className="w-full h-full relative">
                            <VideoPlayer video={video_link} />
                        </div>
                    )}
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center items-start gap-y-2 md:gap-y-4">
                    <Heading as="h4" className="text-2xl md:text-3xl">
                        {title}
                    </Heading>
                    {sub_title && (
                        <h5 className="text-accent text-base md:text-xl">{sub_title}</h5>
                    )}
                    {description && (
                        <p className="text-gray2 text-sm md:text-base">{description}</p>
                    )}
                    {normalizedTags.length > 0 && (
                        <div className="flex flex-col gap-y-2">
                            {normalizedTags.map((label) => (
                                <Badge variant={"tag"} key={label}>
                                    {label}
                                </Badge>
                            ))}
                        </div>
                    )}
                    {has_button && (
                        <>
                            <FeedbackButton button_text={btn || ''} variant={'feature'} />
                        </>
                    )}
                </div>
            </div>
        );
    }
);

ServicePostItem.displayName = "ServicePostItem";
