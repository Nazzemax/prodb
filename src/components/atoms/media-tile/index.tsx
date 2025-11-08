"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string | null;
  alt?: string;
  /** Grid span class like "md:col-span-2" when needed */
  spanClassName?: string;
};

export default function MediaTile({ src, alt = "", spanClassName = "" }: Props) {
    const [isImageLoading, setIsImageLoading] = useState(true);

    if (!src) {
        return null;
    }

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5",
                "transition-transform duration-300 hover:scale-[1.01]",
                "aspect-[4/3]",
                spanClassName
            )}
        >
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse transition-opacity duration-300",
                    isImageLoading ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                aria-hidden="true"
            />
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width:1024px) 312px, (min-width:768px) 50vw, 100vw"
                className="object-cover"
                priority={false}
                onLoadingComplete={() => setIsImageLoading(false)}
            />
        </div>
    );
}
