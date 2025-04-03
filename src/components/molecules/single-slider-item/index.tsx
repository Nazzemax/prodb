import Image from 'next/image';
import { Heading } from "@/components/atoms/heading";
import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { CarouselItem } from "@/components/ui/carousel"
import { useAppData } from '@/context/app-context';
import { cn } from '@/lib/utils';

interface SingleSliderProps {
    index: number;
    title: string;
    sub_title: string;
    button_text: string;
    image: string;
    is_active?: boolean;
}

export const SingleSliderItem = ({
    index,
    title,
    sub_title,
    button_text,
    image,
}: SingleSliderProps) => {

    const { scrollToFeedback } = useAppData()

    return (
        <CarouselItem key={index}>
            <div
                className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            >
                <Image
                    src={image}
                    alt="BG_IMAGE"
                    priority
                    fetchPriority="high"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    quality={75} 
                    placeholder="blur"
                    blurDataURL="/image.webp"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black to-black/20"></div>
                <div className="flex flex-col text-left mb-12 md:mb-0 gap-y-2 md:gap-y-5 z-50 px-5 md:pl-0 md:mx-40 max-w-[1280px]">
                    <Heading
                        as="h1"
                        className={cn(
                            "fade-out font-bold text-white",
                        )}
                    >
                        {title}
                    </Heading>
                    <p
                        className={cn(
                            "text-lg md:text-2xl text-gray mt-2 fade-in",
                        )}
                    >
                        {sub_title}
                    </p>
                    <ButtonWithIcon className='fade-out' onClick={scrollToFeedback}>
                        {button_text}
                    </ButtonWithIcon>
                </div>
            </div>
        </CarouselItem>
    )
}
