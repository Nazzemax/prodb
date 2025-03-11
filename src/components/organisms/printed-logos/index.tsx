"use client";

import { useGetPrintingServicesQuery } from "@/api/ServiceOffering";
import { Heading } from "@/components/atoms/heading";
import { RequestHandler } from "@/components/atoms/request-handler";
import { CompanyPartnerItem } from "@/components/molecules/company-partner-item";
import { PrintedLogoItem } from "@/components/molecules/printed-logo-item";
import Marquee from "react-fast-marquee";

export const PrintedLogos = () => {
    const { data, isLoading, error } = useGetPrintingServicesQuery();

    return (
        <RequestHandler isLoading={isLoading} error={error} data={data}>
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
                            <PrintedLogoItem
                                key={idx}
                                logo={logo.logo}
                            />
                        )
                    )}
                </Marquee>
            </div>
        </RequestHandler>
    );
};
