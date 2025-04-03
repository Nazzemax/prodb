'use client';

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";


interface CompanyPostItemProps {
    id: number;
    image: string
    title: string;
    company_name: string;
    created_at: string;
    tags: { tags: string }[];
    social_media: {
        title: string;
        logo: string;
        subscribers: string;
    }[];
}


export const CompanyPostItem = (props: CompanyPostItemProps) => {
    const {
        id,
        title,
        image,
        company_name,
        created_at,
        tags,
        social_media,
    } = props

    return (
        <Link href={`/cases/${id}`}>
            <div className="relative overflow-hidden rounded-3xl group">
                <Image
                    src={image}
                    alt={'case image'}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-2xl w-full h-[320px] object-cover transition-transform duration-500 scale-100 group-hover:scale-125"
                    quality={100}
                    loading="lazy"
                />
                <div className="absolute top-7 left-6 flex gap-2 flex-wrap">
                    {tags.map((tag) => (
                        <Badge variant={'post'} className="text-sm" key={tag.tags}>
                            {tag.tags}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="flex items-center mt-3 gap-1 flex-nowrap overflow-hidden">
                {social_media.map((social) => (
                    <Badge
                        variant={'tag'}
                        className="flex items-center grow gap-1 whitespace-nowrap overflow-hidden max-w-[50%]"
                        key={social.title}
                    >
                        {/* <span>{social.logo}</span> */}
                        <Image
                            src={social.logo}
                            alt={social.title}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-auto h-auto"
                            quality={100}
                        />
                        <span className="truncate">{social.subscribers} {social.title}</span>
                    </Badge>
                ))}
            </div>
            <div className="mt-3">
                <h3 className="text-xl md:text-2xl font-bold line-clamp-2">{title}</h3>
                <div className="flex items-center gap-2 mt-2 text-gray text-sm md:text-base">
                    <span className="text-sm">{company_name}</span>
                    <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
                    <span className="text-sm">{created_at}</span>
                </div>
            </div>
        </Link>
    )
}
