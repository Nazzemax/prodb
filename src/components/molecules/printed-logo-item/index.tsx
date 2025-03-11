import Image from "next/image";
import { FC } from "react"

interface CompanyBrandingItemProps {
    logo: string;
}

export const PrintedLogoItem: FC<CompanyBrandingItemProps> = ({ logo }) => {
    return (
        <Image
            src={logo}
            alt={'printing'}
            width={400}
            height={302}
            className="rounded-2xl aspect-video mx-2"
        />
    )
}
