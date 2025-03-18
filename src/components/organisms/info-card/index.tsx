import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Heading } from "@/components/atoms/heading"
import { VideoPlayer } from "@/components/atoms/video-player";

interface InfoCardProps {
    title: string;
    sub_title?: string;
    description: string;
    image?: string;
    video?: string;
    card_title: string;
    card_description: string;
    card_icon?: React.ReactNode;
}

export const InfoCard = ({
    title,
    sub_title,
    description,
    image,
    video,
    card_title,
    card_description,
    card_icon,
}: InfoCardProps) => {
    return (
        <section className="max-w-[1920px] flex justify-center items-center bg-background-gray">
            <div className="max-w-[1328px] flex flex-col gap-8 md:gap-16 px-5 py-8 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                    <div className="md:col-span-7 space-y-5 flex flex-col items-start justify-end">
                        <Heading as="h2" className="text-3xl md:text-4xl max-w-[875px] lg:text-5xl">
                            {title}
                        </Heading>
                        {sub_title && <div className="text-accent uppercase text-base md:text-xl">{sub_title}</div>}
                    </div>
                    <p
                        className="md:col-span-3 text-gray2 flex items-end text-sm md:text-base"
                    >
                        {description}
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 place-items-center">
                    <Card className="w-full rounded-2xl xl:h-full">
                        <CardContent className="h-full flex flex-col justify-center space-y-5 py-10 lg:py-14 px-10">
                            <span className="w-[80px] h-[80px] md:w-[119px] md:h-[118px]">{card_icon}</span>
                            <Heading as="h4">{card_title}</Heading>
                            <p className="text-gray2">
                                {card_description}
                            </p>
                        </CardContent>
                    </Card>
                    
                    {video && (
                        <div className="w-full h-full min-w-[335px] min-h-[342px]">
                            <VideoPlayer controls={false} video={video} />
                        </div>
                    )}
                    
                    {image &&
                        <Image
                            src={image}
                            alt={"Our philosophy"}
                            width={648}
                            height={404}
                            className="rounded-2xl w-full h-full"
                        />
                    }
                </div>
            </div>
        </section>
    )
}
