import { Heading } from "@/components/atoms/heading";
import { SmmCompanyPartnerItem } from "@/components/molecules/smm-company-partner-item";


interface SMMPartnersCarouselProps {
    title: string;
    sub_title: string;
    partnerList: { image: string }[];
}

export const SMMPartnersCarousel = ({
    title,
    sub_title,
    partnerList
}: SMMPartnersCarouselProps) => {
    return (
        <div className="w-full max-w-[1920px] p-4">
            <div className="relative flex flex-col justify-center items-center gap-y-7 bg-black rounded-xl px-7 py-9 md:py-24 text-center overflow-hidden">
                <Heading as="h2" className="text-primary-foreground">{title}</Heading>
                <p className="text-sm md:text-base text-gray max-w-sm">{sub_title}</p>
                <div className="flex overflow-hidden group mb-14">
                    <div className="w-screen overflow-hidden mt-5">
                        <div className="flex gap-x-5 whitespace-nowrap animate-loop-scroll">
                            {[...partnerList, ...partnerList, ...partnerList].map((partner, idx) => (
                                <SmmCompanyPartnerItem
                                    key={idx}
                                    company_logo={partner.image}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
