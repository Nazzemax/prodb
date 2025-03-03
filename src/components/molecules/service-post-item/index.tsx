import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { Heading } from "@/components/atoms/heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image"

interface ServicePostItemProps {
    image?: string;
    video_link?:string;
    image_right: boolean;
    title: string;
    sub_title?: string;
    tags?: { tags: string }[],
    description?: string;
    has_button?: boolean;
    scrollToFeedback?: () => void;
}

export const ServicePostItem = ({
    image,
    video_link,
    image_right,
    title,
    sub_title,
    tags,
    description,
    has_button,
    scrollToFeedback
}: ServicePostItemProps) => {
    return (
        <div className={cn('flex gap-5 flex-col-reverse', image_right ? 'lg:flex-row-reverse' : 'lg:flex-row')}>
            <div className="lg:w-1/2 m-auto">
                {image && (  <Image
                    src={image}
                    alt={title}
                    width={648}
                    height={340}
                    className="rounded-3xl border object-cover w-screen h-[190px] md:h-[339px]"
                />)}

                {video_link && (
                    <div className="w-full h-full max-h-[540px] max-w-[648px] relative aspect-video">
                        <iframe 
                            className="w-full h-full object-cover"
                            src={video_link}
                            title="YouTube video player"  
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
              
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center items-start gap-y-2 md:gap-y-4 lg:p-14">
                <Heading as="h4" className="text-2xl md:text-3xl">{title}</Heading>
                {sub_title && <h5 className="text-accent text-base md:text-xl">{sub_title}</h5>}
                {description && <p className="text-gray2 text-sm md:text-base">{description}</p>}
                {tags &&
                    <div className="flex flex-col gap-y-2">
                        {tags.map((tag) => (
                            <Badge variant={'tag'} key={tag.tags}>{tag.tags}</Badge>
                        ))}
                    </div>
                }
                {has_button && <ButtonWithIcon onClick={scrollToFeedback} variant="feature">Заказать</ButtonWithIcon>}
            </div>
        </div>
    )
}
