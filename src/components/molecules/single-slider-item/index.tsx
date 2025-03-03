import { motion } from 'framer-motion';
import { Heading } from "@/components/atoms/heading";
import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { CarouselItem } from "@/components/ui/carousel"
import {
    defaultTransition,
    fadeIn,
    textVariant,
    viewportConfig
} from '@/lib/motion';

interface SingleSliderProps {
    index: number;
    title: string;
    sub_title: string;
    button_text: string;
    image: string;
    is_active?: boolean;
    onScrollToFeedback: () => void;
}

export const SingleSliderItem = ({
    index,
    title,
    sub_title,
    button_text,
    image,
    onScrollToFeedback
}: SingleSliderProps) => {

    return (
        <CarouselItem key={index}>
            <div
                className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black to-black/20"></div>
                <div className="flex flex-col text-left mb-12 md:mb-0 gap-y-2 md:gap-y-5 z-50 px-5 md:pl-0 md:mx-40 max-w-[1280px]">
                    <motion.div
                        variants={textVariant(0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig}
                        transition={defaultTransition}
                    >
                        <Heading as="h1" className="font-bold text-white">
                            {title}
                        </Heading>
                    </motion.div>
                    <motion.p
                        variants={fadeIn("up", "spring", 0.5, 1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig}
                        transition={defaultTransition}
                        className="text-lg md:text-2xl text-gray mt-2"
                    >
                        {sub_title}
                    </motion.p>
                    <motion.div
                        variants={fadeIn('up', 'spring')}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig}
                        transition={defaultTransition}
                    >
                        <ButtonWithIcon onClick={onScrollToFeedback}>
                            {button_text}
                        </ButtonWithIcon>
                    </motion.div>

                </div>
            </div>
        </CarouselItem>
    )
}
