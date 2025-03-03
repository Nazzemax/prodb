import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { AwardBg } from '@/assets/backgrounds';
import DiplomaBgSVG from '@/assets/backgrounds/diploma_bg.svg';
import { Heading } from '@/components/atoms/heading';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { defaultTransition, fadeIn, staggerTransition, textVariant, viewportConfig } from '@/lib/motion';

interface AwardProps {
    badgeTitle: string;
    title: string;
    sub_title?: string;
    image: string;
}

export const Award = ({
    badgeTitle,
    title,
    sub_title,
    image,
}: AwardProps) => {
    return (
        <div className='w-full max-w-[1920px] flex justify-center items-center px-4 mb-20'>
            <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 place-items-center gap-y-5 max-h-[600px] md:max-h-full text-white bg-[#0D0D0D] rounded-3xl py-14 px-6 overflow-hidden">
                <motion.div
                    variants={textVariant(0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                    transition={defaultTransition}
                    className="flex flex-col justify-center items-center max-w-2xl xl:pl-24 z-40"
                >
                    <Badge className="mb-6 p-2 rounded-3xl bg-transparent border border-gray-600 text-xl uppercase">{badgeTitle}</Badge>
                    <Heading className="text-primary-foreground text-center max-w-md lg:max-w-full">{title}</Heading>
                    {sub_title && <h3 className="text-xl lg:text-2xl text-center font-bold mt-4">{sub_title}</h3>}
                </motion.div>
                <motion.div
                    variants={fadeIn('up', 'spring')}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                    transition={staggerTransition(0)}
                    className="relative z-30"
                >
                    <DiplomaBgSVG />
                    <Image
                        className={cn(
                            "absolute top-10 left-[148px] md:top-32 md:left-[50px] rounded-2xl md:w-[475px] md:h-[303px] w-[303px] h-[215px]",
                        )}
                        src={image}
                        sizes='(max-width: 768px) 303px, 475px'
                        alt="award"
                        width={475}
                        height={338}
                    />
                </motion.div>
                <AwardBg className="absolute z-0" />
            </div>
        </div>
    )
}