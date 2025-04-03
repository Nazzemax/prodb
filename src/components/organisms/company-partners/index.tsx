import { CompanyPartnersResponse } from "@/api/Company/types";
import { Heading } from "@/components/atoms/heading";
import { CompanyPartnerItem } from "@/components/molecules/company-partner-item";
import { FC } from "react";
import Marquee from "react-fast-marquee";

interface CompanyPartnersProps {
    data: CompanyPartnersResponse;
}

const CompanyPartners: FC<CompanyPartnersProps> = ({ data }) => {

    return (
        <>
            <Heading
                as="h4"
                className="text-center font-normal uppercase md:text-xl text-gray2 mt-20"
            >
                {data?.title}
            </Heading>
            <div className="relative flex overflow-hidden group mb-14 lg:mb-28">
                <Marquee gradient>
                    {[...(data?.items || []), ...(data?.items || [])].map(
                        (partner, idx) => (
                            <CompanyPartnerItem
                                key={idx}
                                company_name={partner.company_name}
                                company_logo={partner.company_logo}
                            />
                        )
                    )}
                </Marquee>
            </div>
        </>
    );
};

export default CompanyPartners;