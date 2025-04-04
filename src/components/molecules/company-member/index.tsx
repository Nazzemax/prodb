import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { FC } from "react";

interface CompanyMemberProps {
    name: string,
    position: string;
    image: string;
}

export const CompanyMember: FC<CompanyMemberProps> = ({
    name,
    position,
    image
}) => {
    return (
        <CarouselItem className='basis-2/4 md:basis-2/5 aspect-[9/16] w-auto md:w-full max-h-[460px] rounded-2xl flex justify-center grayscale hover:grayscale-0 transition-all duration-300 group border'>
            <div className='relative w-full h-full'>
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className='rounded-2xl object-cover'
                    quality={100}
                />
                <div className='absolute bottom-5 left-5 z-50'>
                    <div className='flex flex-col gap-0.5'>
                        <div className='text-primary-foreground text-lg'>{name}</div>
                        <div className='text-gray text-sm group-hover:text-accent transition-all duration-300'>{position}</div>
                    </div>
                </div>
            </div>
        </CarouselItem>
    )
}
