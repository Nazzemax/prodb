import { ButtonWithIcon } from "@/components/atoms/button-with-icon"
import { CheckupBg } from "@/assets/backgrounds";
import { Heading } from "@/components/atoms/heading";
import { motion } from "framer-motion";
import {
    defaultTransition,
    fadeIn,
    staggerTransition,
    textVariant,
    viewportConfig
} from "@/lib/motion";

interface CheckupProps {
    onScrollToFeedback: () => void;
}

const checkupData = {
    title: 'Не знаете, с чего начать?',
    description: 'Запишитесь на диагностику маркетинга, и мы поможем определить эффективные решения для вашего бизнеса.',
}

export const Checkup: React.FC<CheckupProps> = ({ onScrollToFeedback }) => {

    return (
        <div className="w-full max-w-[1920px] p-4">
            <div className="relative flex flex-col justify-center items-center gap-y-7 bg-black rounded-xl px-7 py-9 md:py-24 text-center overflow-hidden">
                <Heading as="h2" className="text-secondary">{checkupData.title}</Heading>
                <motion.p
                    variants={textVariant(0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                    transition={staggerTransition(0)}
                    className="text-gray md:w-2/3 lg:w-2/4"
                >
                    {checkupData.description}
                </motion.p>
                <motion.div
                    className="z-40"
                    variants={textVariant(0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                    transition={staggerTransition(0)}
                >
                    <ButtonWithIcon
                        onClick={onScrollToFeedback}
                    >
                        Пройти диагностику
                    </ButtonWithIcon>
                </motion.div>

                <CheckupBg className="absolute max-w-[1920px] m-auto z-20" />
            </div>
        </div>
    )
}
