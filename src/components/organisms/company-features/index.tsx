import { CompanyFeatureItem } from "@/components/molecules/company-feautre-item"
import FeaturesBgSVG from '@/assets/backgrounds/features_bg.svg'
import { Heading } from "@/components/atoms/heading"
import { getCompanyServices } from "@/api/Company"

const CompanyFeatures = async () => {
    const data = await getCompanyServices();

    return (
        <section className="w-full max-w-[1320px] m-auto px-5 pb-20">
            <div className="relative flex justify-center items-center py-10 md:py-16 px-4 text-center overflow-hidden">
                <FeaturesBgSVG className="absolute -z-10 max-w-[1920px] m-auto" />
                <Heading as="h2">
                    {data?.title}
                </Heading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {data?.items.map((feature) => (
                    <CompanyFeatureItem
                        key={feature.title}
                        {...feature}
                    />
                ))}
            </div>
        </section>
    )
}

export default CompanyFeatures;