import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { BreadcrumbProps } from "./type";
import { Heading } from "@/components/atoms/heading";
import { motion } from "framer-motion";
import { fadeIn, viewportConfig, staggerTransition } from "@/lib/motion";

interface PageTitleLayoutProps {
    title: string;
    sub_title?: string;
    button_text: string;
    bg_image?: string;
    breadcrumb?: BreadcrumbProps[],
    isGray?: boolean;
    scrollToFeedback?: () => void;
}

export const PageTitleLayout = ({
    title,
    sub_title,
    button_text,
    breadcrumb,
    bg_image,
    isGray,
    scrollToFeedback
}: PageTitleLayoutProps) => {

    return (
        <div
            className="relative h-screen max-w-[1920px] flex justify-center items-center bg-cover bg-center bg-no-repeat"
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${bg_image})`,
                    filter: isGray ? "grayscale(100%)" : "none"
                }}
            />
            <div className={`absolute inset-0 ${isGray ? "bg-gradient-to-t" : "bg-gradient-to-r"} from-black to-black/10`} />
            <div className="max-w-[1280px] h-screen flex flex-col justify-center md:items-center gap-y-6 px-5 z-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumb?.map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn('up', 'spring', idx * 0.2)}
                                initial="hidden"
                                whileInView="show"
                                viewport={viewportConfig}
                                transition={staggerTransition(idx)}
                                className="flex items-center gap-3"
                            >
                                <BreadcrumbItem>
                                    {idx !== breadcrumb.length - 1
                                        ? <BreadcrumbLink href={item.href}>{item.text}</BreadcrumbLink>
                                        : <BreadcrumbPage>{item.text}</BreadcrumbPage>
                                    }
                                </BreadcrumbItem>
                                {idx !== breadcrumb.length - 1 && <BreadcrumbSeparator />}
                            </motion.div>

                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
                <Heading as="h1" className="text-secondary md:text-center">{title}</Heading>
                {sub_title && <h3 className="text-gray text-sm md:text-md lg:text-lg md:text-center">{sub_title}</h3>}
                <ButtonWithIcon onClick={scrollToFeedback} className="mt-3">
                    {button_text}
                </ButtonWithIcon>
            </div>
        </div>
    )
}
