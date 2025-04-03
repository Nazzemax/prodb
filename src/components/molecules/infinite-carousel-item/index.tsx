import Image from "next/image";
import { FC } from "react"

interface CompanyBrandingItemProps {
    image: string;
}

export const InfiniteCarouselItem: FC<CompanyBrandingItemProps> = ({ image }) => {
    return (
        <Image
            src={image}
            alt={'Брендинг'}
            width={400}
            height={302}
            className="w-[300px] h-[200px] md:min-w-[400px] md:min-h-[300px] overflow-hidden rounded-2xl object-cover mx-2"
            quality={75}
        />
    )
}
