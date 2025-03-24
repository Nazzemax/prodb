import Image from "next/image";
import { FC } from "react";

interface CompanyMemberProps {
    name: string,
    position: string;
    image: string;
}

export const CompanyMember: FC<CompanyMemberProps> = ({
    name,
    position,
    image
}) => {
    return (
        <div className="relative m-3 h-[350px] md:h-[460px] rounded-2xl flex justify-center grayscale hover:grayscale-0 transition-all duration-300 group">
            <Image
                src={image}
                alt={name}
                width={308}
                height={460}
                className="rounded-2xl object-cover"
                quality={100}
            />
            <div className="absolute bottom-5 left-5 z-50">
                <div className="flex flex-col gap-0.5">
                    <div className="text-primary-foreground text-lg">{name}</div>
                    <div className="text-gray text-sm group-hover:text-accent transition-all duration-300">{position}</div>
                </div>
            </div>
        </div>
    )
}
