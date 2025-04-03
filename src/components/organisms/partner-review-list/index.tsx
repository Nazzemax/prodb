"use client";

import { PartnersReviewsResponse } from "@/api/PartnerReviews/types";
import { Heading } from "@/components/atoms/heading";
import { ReviewItem } from "@/components/molecules/partner-review-item";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppData } from "@/context/app-context";

interface PartnerReviewListProps {
    data: PartnersReviewsResponse;
}

const PartnerReviewList = ({ data }: PartnerReviewListProps) => {
    const { reviewRef } = useAppData();

    return (
        <div ref={reviewRef} className="w-full max-w-[1920px] mb-24 px-5">
            <div className="grid grid-cols-1 max-sm:px-2 min-md:p-0 lg:px-0 xl:pl-4 xl:grid-cols-2 place-items-center gap-8 max-w-[1328px] place-self-center">
                <div className="flex flex-col justify-center gap-y-5 text-center max-w-[600px]">
                    <Heading as="h2" className="lg:text-4xl">{data?.title}</Heading>
                    <p className="text-xl text-gray2 m-auto">
                        {data?.description}
                    </p>
                </div>
                <div className="flex items-center justify-center">
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
                </div>
            </div>
        </div>
    );
};

export default PartnerReviewList;