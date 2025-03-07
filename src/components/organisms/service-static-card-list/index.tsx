import { AnimatedItem } from "@/components/atoms/animated-item";
import { Heading } from "@/components/atoms/heading";
import { SubTitle } from "@/components/atoms/sub-title";
import { SmmAdItem } from "@/components/molecules/smm-ad-item";
import { ISmmCreatingAdData } from "@/consts/types";


export const ServiceStaticCardList = ({
    eyebrow,
    title,
    sub_title,
    items,
}: ISmmCreatingAdData) => {
    return (
        <div className="w-full max-w-[1920px] flex justify-center px-4 lg:px-10 py-5 md:py-20 bg-[#FAFAFC]">
            <div className="max-w-[1280px] flex flex-col justify-center items-center gap-y-5 lg:gap-y-10">
                <div className="flex flex-col xl:flex-row gap-4">
                    <div>
                        {eyebrow && <h5 className="text-gray uppercase">{eyebrow}</h5>}
                        <Heading as="h2">{title}</Heading>
                    </div>
                    {sub_title &&
                        <SubTitle className="text-md flex items-end max-w-sm">
                            {sub_title}
                        </SubTitle>
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8">
                    {items.map((item, idx) => (
                        <AnimatedItem key={idx} idx={idx}>
                            <SmmAdItem
                                key={item.title}
                                image={item.image}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                            />
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </div>
    )
}
