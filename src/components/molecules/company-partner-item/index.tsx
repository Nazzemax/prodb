import Image from "next/image";
import { FC } from "react"

interface CompanyPartnerItemProps {
    company_name: string;
    company_logo: string;
}

export const CompanyPartnerItem: FC<CompanyPartnerItemProps> = ({ company_name, company_logo }) => {
    return (
        <Image
            src={company_logo}
            alt={company_name}
            width={274}
            height={216}
            className="grayscale hover:grayscale-0 transition-all duration-300"
            // quality={75}
            loading="lazy"
        />
    )
}
