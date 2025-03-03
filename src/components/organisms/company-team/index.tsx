'use client';

import { useGetCompanyTeamQuery } from '@/api/Company';
import { AnimatedItem } from '@/components/atoms/animated-item';
import { Heading } from '@/components/atoms/heading';
import { RequestHandler } from '@/components/atoms/request-handler';
import { CompanyMember } from '@/components/molecules/company-member'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { fadeIn, viewportConfig, staggerTransition } from '@/lib/motion';
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion';
import React from 'react'

const data = {
    title: 'Команда, которой можно доверять',
    sub_title: 'Каждый из нас вносит уникальный вклад, помогая вашему бизнесу расти и процветать. Познакомьтесь с людьми, которые превращают идеи в реальность',
    items: [
        {
            name: 'Талгар Чокушов',
            position: 'Генеральный директор',
            image: '/images/about_page/team_member.webp'
        },
        {
            name: 'Талгар Чокушов',
            position: 'Генеральный директор',
            image: '/images/about_page/team_member.webp'
        },
        {
            name: 'Талгар Чокушов',
            position: 'Генеральный директор',
            image: '/images/about_page/team_member.webp'
        },
        {
            name: 'Талгар Чокушов',
            position: 'Генеральный директор',
            image: '/images/about_page/team_member.webp'
        },
        {
            name: 'Талгар Чокушов',
            position: 'Генеральный директор',
            image: '/images/about_page/team_member.webp'
        },
        {
            name: 'Талгар Чокушов',
            position: 'Генеральный директор',
            image: '/images/about_page/team_member.webp'
        },
        {
            name: 'Талгар Чокушов',
            position: 'Генеральный директор',
            image: '/images/about_page/team_member.webp'
        },
    ]
}

export const CompanyTeam = () => {
    const { data, isLoading, error } = useGetCompanyTeamQuery()

    return (
        <div className='max-w-[1920px] flex justify-center items-center'>
            <RequestHandler
                isLoading={isLoading}
                error={error}
                data={data}
            >
                <div className='max-w-[1280px] space-y-4 md:space-y-8 py-14 lg:py-36 overflow-hidden'>
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
                            <CarouselContent>
                                {data?.items.map((member, idx) => (
                                    <CarouselItem key={idx} className="basis-4/5 md:basis-1/2 lg:basis-1/4 p-4">
                                        <CompanyMember
                                            {...member}
                                        />
                                    </CarouselItem>

                                ))}
                            </CarouselContent>
                        </Carousel>
                        <div className='hidden md:grid grid-cols-3 lg:grid-cols-4'>
                            {data?.items.map((member, idx) => (
                                <AnimatedItem key={idx} idx={idx}>
                                    <CompanyMember
                                        name={member.name}
                                        position={member.position}
                                        image={member.image}
                                    />
                                </AnimatedItem>
                            ))}
                        </div>
                    </div>
                </div>
            </RequestHandler>
        </div>
    )
}