import Image from "next/image";
import { FC } from "react"

interface CompanyBrandingItemProps {
    image: string;
}

export const CompanyBrandingItem: FC<CompanyBrandingItemProps> = ({ image }) => {
    return (
        <Image
            src={image}
            alt={'Брендинг'}
            width={400}
            height={302}
            className="rounded-2xl aspect-video mx-2"
        />
    )
}
