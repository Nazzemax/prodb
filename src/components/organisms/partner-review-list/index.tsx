"use client";

import { useGetPartnersReviewsQuery } from "@/api/PartnerReviews";
import { Heading } from "@/components/atoms/heading";
import { RequestHandler } from "@/components/atoms/request-handler";
import { ReviewItem } from "@/components/molecules/partner-review-item";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppData } from "@/context/app-context";
import {
    fadeIn,
    viewportConfig,
    staggerTransition,
    textVariant,
} from "@/lib/motion";
import { motion } from "framer-motion";

export const PartnerReviewList = () => {
    const { data, isLoading, error } = useGetPartnersReviewsQuery();
    const { reviewRef } = useAppData();

    return (
        <div ref={reviewRef} className="w-full max-w-[1920px] px-4 md:px-10 mb-24">
            <RequestHandler isLoading={isLoading} error={error} data={data}>
                <div className="grid grid-cols-1 xl:grid-cols-2 place-items-center gap-10">
                    <div className="flex flex-col justify-center gap-y-5 text-center">
                        <Heading as="h2">{data?.title}</Heading>
                        <p className="text-xl text-gray2">
                            {data?.description}
                        </p>
                    </div>
                    <motion.div
                        variants={fadeIn("up", "spring", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig}
                        transition={staggerTransition(0)}
                        className="flex items-center justify-center"
                    >
                        <Carousel className="w-[350px] md:w-[480px] max-w-md">
                            <CarouselContent className="">
                                {data?.items.map((review, idx) => (
                                    <CarouselItem
                                        className="p-5 md:p-10 flex flex-col justify-center items-center "
                                        key={idx}
                                    >
                                        <ReviewItem {...review} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="relative mt-3">
                                <CarouselPrevious
                                    iconColor="text-black"
                                    variant={"review"}
                                    className="left-28 md:-left-12 xl:-left-16 top-5 md:-top-60 lg:-top-72"
                                />
                                <CarouselNext
                                    iconColor="text-black"
                                    variant={"review"}
                                    className="right-28 md:-right-10 xl:-right-16 top-5 md:-top-60 lg:-top-72"
                                />
                            </div>
                        </Carousel>
                    </motion.div>
                </div>
            </RequestHandler>
        </div>
    );
};
