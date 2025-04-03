import { getPrintingServices } from "@/api/ServiceOffering";
import { Heading } from "@/components/atoms/heading";
import { InfiniteCarouselItem } from "@/components/molecules/infinite-carousel-item";
import Marquee from "react-fast-marquee";

export const PrintedLogos = async () => {
    const data = await getPrintingServices();

    return (
        <>
            <Heading
                as="h3"
                className="text-center text-primary text-2xl mb-8 md:mb-12"
            >
                {data?.title}
            </Heading>
            <div className="relative flex overflow-hidden group mb-14 lg:mb-28">
                <Marquee>
                    {[...(data?.items || []), ...(data?.items || [])].map(
                        (logo, idx) => (
                            <InfiniteCarouselItem
                                key={idx}
                                image={logo.logo}
                            />
                        )
                    )}
                </Marquee>
            </div>
        </>
    );
};
