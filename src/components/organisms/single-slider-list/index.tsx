'use client';

import { SingleSliderItem } from '@/components/molecules/single-slider-item'
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { FC } from 'react';
import { CustomCarouselControls } from '@/components/molecules/custom-controls';
import { useGetBannersQuery } from '@/api/Banners';
import { Spinner } from '@/components/atoms/spinner';

export const SingleSliderList = () => {
    const { data, error, isLoading } = useGetBannersQuery()


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-accent">
                <p>Не удалось загрузить слайдеры. Попробуйте</p>
            </div>
        );
    }

    return (
        <Carousel
            hasProgressBar
            opts={{
                loop: true,
            }}
            className="w-full h-screen max-w-[1920px]"
        >
            <CarouselContent>
                {data?.map((slide, index) => (
                    <SingleSliderItem
                        key={index}
                        title={slide.title}
                        sub_title={slide.sub_title}
                        button_text={slide.button_text}
                        index={index}
                        image={slide.image}
                    />
                ))}
            </CarouselContent>
            <CustomCarouselControls />
            <CarouselPrevious iconColor='text-white' variant={'carousel'} className='hidden md:flex md:left-14 top-[600px] md:top-1/2 mt-5 md:mt-0' />
            <CarouselNext iconColor='text-white' variant={'carousel'} className='hidden md:flex md:right-14 top-[600px] md:top-1/2 mt-5 md:mt-0' />
        </Carousel>
    )
}