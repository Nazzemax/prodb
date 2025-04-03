import React, { FC } from 'react'
import ChallengeCard from '@/components/molecules/company-challenge-card'
import { Heading } from '@/components/atoms/heading'
import { ChallengesBg, ChallengesSVG } from '@/assets/backgrounds'
import { CompanyChallengesResponse } from '@/api/Company/types'

interface Props {
    data: CompanyChallengesResponse;
}

const CompanyChallengeList: FC<Props> = ({ data }) => {

    return (
        <section className="bg-background-gray">
            <div className="max-w-[1280px] m-auto relative py-4 md:py-16 lg:py-28 z-10 overflow-hidden">
                <Heading as="h2" className="text-center">{data.title}</Heading>
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-12 mt-5 lg:mt-14">
                        {data.items.map((challenge, idx) => (
                            <ChallengeCard
                                key={challenge.title}
                                idx={idx}
                                logo={challenge.logo}
                                title={challenge.title}
                                description={challenge.description}
                            />
                        ))}
                    </div>
                    <ChallengesSVG className='absolute top-[150px] left-[405px] hidden xl:flex' />
                    <ChallengesBg className="hidden lg:block absolute top-7 mx-auto w-full -z-10" />
                </div>
            </div>
        </section>
    );
};

export default CompanyChallengeList;