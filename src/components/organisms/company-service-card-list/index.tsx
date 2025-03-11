import { AnimatedItem } from "@/components/atoms/animated-item";
import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { Heading } from "@/components/atoms/heading";
import { ServiceCardItem } from "@/components/molecules/service-card-item";
import { ISmmTeamMembers } from "@/consts/types";

export const CompanyServiceCardList = ({
    title,
    items,
    button,
}: ISmmTeamMembers) => {
    return (
        <section className="w-full max-w-[1920px] flex justify-center px-4 lg:px-10 py-10 md:py-20">
            <div className="max-w-[1328px] space-y-9 md:space-y-14">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <Heading className="text-primary lg:w-2/3" as="h2">
                        {title}
                    </Heading>
                    <div className="flex items-end">
                        <ButtonWithIcon variant="secondary" className="">
                            {button}
                        </ButtonWithIcon>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 md:mt-10 grid-equal-height">
                    {items?.map((member, idx) => (
                        <AnimatedItem key={idx} idx={idx}>
                            <ServiceCardItem {...member} />
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </section>
    );
};
