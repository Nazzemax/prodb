import { useGetCompanyBrandingQuery } from "@/api/Company"
import { Heading } from "@/components/atoms/heading"
import { CompanyBrandingItem } from "@/components/molecules/company-branding-item"

export const CompanyBranding = () => {
    const { data } = useGetCompanyBrandingQuery()

    return (
        <>
            <div className="flex flex-col text-center justify-center items-center gap-y-2 m-auto pt-10 md:pt-20 lg:pt-32 max-w-[1280px]">
                <Heading as="h4" className="font-normal uppercase text-sm md:text-xl text-gray2">{data?.sub_title}</Heading>
                <Heading as="h2">{data?.title}</Heading>
                <p className="text-gray2 text-sm md:text-lg max-w-2xl">{data?.sub_title_2}</p>
            </div>

            <div className="relative flex overflow-hidden group my-8 md:my-14 lg:mb-28">
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-x-5 whitespace-nowrap animate-loop-scroll">
                        {[...(data?.items || []), ...(data?.items || [])].map((branding, idx) => (
                            <CompanyBrandingItem
                                key={idx}
                                image={branding.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
