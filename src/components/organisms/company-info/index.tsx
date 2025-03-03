"use client";

import CompanyInfoSVG from '@/assets/backgrounds/company_info.svg'
import { StatItem } from '@/components/molecules/stat-item';
import { Stat1, Stat2, Stat3, Stat4 } from '@/assets/company-info';
import { useGetCompanyAchievementsQuery } from '@/api/Company';
import { RequestHandler } from '@/components/atoms/request-handler';
import { motion } from 'framer-motion';
import { defaultTransition, fadeIn, staggerTransition, textVariant, viewportConfig } from '@/lib/motion';

const icons = [
    <Stat1 key="stat1" />,
    <Stat2 key="stat2" />,
    <Stat3 key="stat3" />,
    <Stat4 key="stat4" />
];

export const CompanyInfo = () => {
    const { data, isLoading, error } = useGetCompanyAchievementsQuery()

    return (
        <section className='w-full max-w-[1920px] bg-background-dark'>
            <div className='max-w-[1280px] m-auto relative px-4 py-14 lg:py-32 text-white overflow-hidden z-10'>
                <RequestHandler
                    isLoading={isLoading}
                    error={error}
                    data={data}
                >
                    <motion.h1
                        variants={textVariant(0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig}
                        transition={defaultTransition}
                        className='text-3xl md:text-5xl font-bold mb-5'
                    >
                        {data?.title}
                    </motion.h1>
                    <motion.p
                        variants={textVariant(0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig}
                        transition={defaultTransition}
                        className='text-accent text-xl'
                    >
                        {data?.sub_title}
                    </motion.p>
                    <div className='flex justify-center flex-wrap gap-7 mt-8'>
                        {data?.items?.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn('up', 'spring', idx * 0.2)}
                                initial="hidden"
                                whileInView="show"
                                viewport={viewportConfig}
                                transition={staggerTransition(idx)}
                            >
                                <StatItem
                                    title={stat.title}
                                    sub_title={stat.sub_title}
                                    icon={icons[idx]}
                                    idx={idx}
                                />
                            </motion.div>

                        ))}
                    </div>
                </RequestHandler>
                <div>
                    <CompanyInfoSVG className="absolute left-0 lg:left-auto -z-10 bottom-0 max-w-[1920px] object-cover" />
                </div>
            </div>
        </section>
    )
}
