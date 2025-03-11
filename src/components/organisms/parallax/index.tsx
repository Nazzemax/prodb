"use client";

import { ParallaxData } from "@/api/BusinessType/types";
import { ParallaxProps } from "@/domains/services/operative-print";
import React, { useEffect, useRef } from "react";

export const ParallaxSection: React.FC<ParallaxData> = ({
    businesscards,
    title,
}) => {
    // Refs for each parallax image
    const imgRefs = useRef<Array<HTMLImageElement | null>>([]);

    useEffect(() => {
        function handleScroll() {
            imgRefs.current.forEach((img) => {
                if (!img) return;

                // Retrieve the "speed" value from the dataset
                const speed = parseFloat(img.dataset.speed || "0");
                // The parent element
                const parent = img.parentElement;
                if (!parent) return;

                const imgY = parent.getBoundingClientRect().top + window.scrollY;
                const winY = window.scrollY;
                const winH = window.innerHeight;
                const parentH = parent.clientHeight;
                const winBottom = winY + winH;

                // Check if the block is on-screen
                if (winBottom > imgY && winY < imgY + parentH) {
                    const imgBottom = (winBottom - imgY) * speed;
                    const imgTop = winH + parentH;
                    const imgPercent = (imgBottom / imgTop) * 100 + (50 - speed * 50);

                    // Apply the parallax style
                    img.style.top = `${imgPercent}%`;
                    img.style.transform = `translate(-50%, -${imgPercent}%)`;
                }
            });
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial run in case user is already scrolled

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [businesscards]);

    return (
        <>
            {businesscards?.map((item, index) => (
                <div key={index} className="relative h-screen w-full overflow-hidden">
                    <div
                        style={{
                            position: "absolute",
                            zIndex: 2,
                            inset: 0,
                            top: 0,
                            right: 0,
                            background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%)",
                        }}
                    ></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        ref={(el) => {
                            imgRefs.current[index] = el;
                        }}
                        src={item.image}
                        alt={`Parallax Speed`}
                        data-speed={item.speed || 1}
                        className="
              absolute 
              top-0 
              left-1/2 
              -translate-x-1/2
              pointer-events-none 
              object-cover
              w-auto 
              h-auto 
              min-w-full 
              min-h-full
            "
                        style={{ transform: "translate(-50%, 0)" }}
                    />
                    {/* Centered heading or any other content */}
                    <h2
                        className="
              absolute 
              top-1/2 
              left-0 
              w-full 
              -translate-y-1/2 
              text-center 
              text-white 
              font-bold 
              m-0 
              z-10
              px-4
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
                    >
                        {title}
                    </h2>
                </div>
            ))}
        </>
    );
};
