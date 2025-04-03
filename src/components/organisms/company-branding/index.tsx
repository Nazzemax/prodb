import { getCompanyBranding } from "@/api/Company"
import { Heading } from "@/components/atoms/heading"
import { InfiniteCarouselItem } from "@/components/molecules/infinite-carousel-item"
import Marquee from "react-fast-marquee"

export const CompanyBranding = async  () => {
    const data = await getCompanyBranding();

    return (
        <>
            <div className="flex flex-col text-center justify-center items-center gap-y-2 m-auto pt-10 md:pt-20 lg:pt-32 max-w-[1280px]">
                <Heading as="h4" className="font-normal uppercase text-sm md:text-xl text-gray2">{data?.sub_title}</Heading>
                <Heading as="h2">{data?.title}</Heading>
                <p className="text-gray2 text-sm md:text-lg max-w-2xl">{data?.sub_title_2}</p>
            </div>

            <div className="relative flex overflow-hidden group my-8 md:my-14 lg:mb-28">
                <Marquee>
                    {[...(data?.items || []), ...(data?.items || [])].map((branding, idx) => (
                        <InfiniteCarouselItem
                            key={idx}
                            image={branding.image}
                        />
                    ))}
                </Marquee>
            </div>
        </>
    )
}
