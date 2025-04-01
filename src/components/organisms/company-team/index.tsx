'use client';

import { useGetCompanyTeamQuery } from '@/api/Company';
import { Heading } from '@/components/atoms/heading';
import { RequestHandler } from '@/components/atoms/request-handler';
import { CompanyMember } from '@/components/molecules/company-member'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'

export const CompanyTeam = () => {
    const { data, isLoading, error } = useGetCompanyTeamQuery()

    return (
        <div className='max-w-[1920px] flex justify-center items-center'>
            <RequestHandler
                isLoading={isLoading}
                error={error}
                data={data}
            >
                <div className='max-w-[1328px] space-y-4 md:space-y-8 py-14 lg:py-36 overflow-hidden'>
                    <Heading as='h2' className='w-full md:w-2/3 px-5'>{data?.title}</Heading>
                    <p className='text-gray2 text-base px-5 w-full md:w-2/3'>{data?.sub_title}</p>
                    <div className=''>
                        <Carousel
                            opts={{
                                align: "center",
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 3000,
                                })
                            ]}
                            className="w-full md:hidden"
                        >
                            <CarouselContent className='flex gap-4'>
                                {data?.items.map((member, idx) => (
                                    <CompanyMember key={idx} {...member} />
                                ))}
                            </CarouselContent>
                        </Carousel>
                        <div className='hidden md:grid grid-cols-3 lg:grid-cols-4 gap-4 px-5'>
                            {data?.items.map((member, idx) => (
                                <CompanyMember
                                    key={idx}
                                    name={member.name}
                                    position={member.position}
                                    image={member.image}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </RequestHandler>
        </div>
    )
}