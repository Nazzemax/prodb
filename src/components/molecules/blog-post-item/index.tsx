"use client";

import { ArticleListItem } from "@/api/Article/types";
import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { sanitizer } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const BlogPostItem = ({
    title,
    description,
    photo,
    date,
    slug,
}: ArticleListItem) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const isExternalLink = /^https?:\/\//.test(slug);
    const target = isExternalLink ? "_blank" : undefined;
    const rel = isExternalLink ? "noopener noreferrer" : undefined;

    return (
        <Link href={`/blog/${slug}`} target={target} rel={rel} className="">
            <Card className="group flex flex-col rounded-3xl border-transparent bg-transparent shadow-none transition-all duration-500 hover:shadow-lg mt-5 mb-5">
                <CardHeader className="relative overflow-hidden rounded-[32px] p-0 min-h-[182px] max-h-[400px]">
                    <div
                        className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse transition-opacity duration-300 ${
                            isImageLoading ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                        aria-hidden="true"
                    />
                    <Image
                        src={photo}
                        alt={title}
                        width={400}
                        height={182}    
                        loading="lazy"
                        quality={100}
                        className="rounded-2xl w-full h-[320px] object-cover transition-transform duration-500 scale-100 group-hover:scale-110"
                        onLoadingComplete={() => setIsImageLoading(false)}
                    />
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4 px-0 pt-4">
                    <span className="text-gray2 text-sm">{date}</span>
                    <h3 className="font-bold text-base leading-6 line-clamp-2 min-h-[48px]">
                        {title}
                    </h3>
                    <p className="text-gray2 text-sm leading-6 line-clamp-3 flex-1">
                        {sanitizer(description)}
                    </p>
                    <div className="pt-2 mt-auto">
                        <ButtonWithIcon variant="readmore">Читать далее</ButtonWithIcon>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};
