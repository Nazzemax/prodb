import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { Heading } from "@/components/atoms/heading";
import { VideoPlayer } from "@/components/atoms/video-player";
import { Badge } from "@/components/ui/badge";
import { useAppData } from "@/context/app-context";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo } from "react";

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
        const { scrollToFeedback } = useAppData();

        return (
            <div
                className={cn(
                    "flex gap-5 flex-col-reverse",
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
                        />
                    )}

                    {video_link && (
                        <div className="w-full h-full relative">
                            <VideoPlayer video={video_link} />
                        </div>
                    )}
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center items-start gap-y-2 md:gap-y-4 lg:p-14">
                    <Heading as="h4" className="text-2xl md:text-3xl">
                        {title}
                    </Heading>
                    {sub_title && (
                        <h5 className="text-accent text-base md:text-xl">{sub_title}</h5>
                    )}
                    {description && (
                        <p className="text-gray2 text-sm md:text-base">{description}</p>
                    )}
                    {tags && (
                        <div className="flex flex-col gap-y-2">
                            {tags.map((tag, idx) => (
                                <Badge variant={"tag"} key={idx}>
                                    {tag.tags}
                                </Badge>
                            ))}
                        </div>
                    )}
                    {has_button && (
                        <ButtonWithIcon onClick={scrollToFeedback} variant="feature">
                            {btn}
                        </ButtonWithIcon>
                    )}
                </div>
            </div>
        );
    }
);

ServicePostItem.displayName = "ServicePostItem";
