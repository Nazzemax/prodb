import Image from "next/image";
import { FC } from "react"

interface CompanyPartnerItemProps {
    company_name?: string;
    company_logo: string;
}

export const SmmCompanyPartnerItem: FC<CompanyPartnerItemProps> = ({ company_name, company_logo }) => {
    return (
        <Image
            src={company_logo}
            alt={company_name || ''}
            width={400}
            height={400}
            className="min-w-[200px] max-h-[200px] md:min-w-[400px] md:max-h-[400px] overflow-hidden rounded-2xl object-cover"
        />
    )
}
