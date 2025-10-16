"use client";

import {
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from "react";

export type LazyHydrateProps = PropsWithChildren<{
    /**
     * Distance in pixels before the component enters the viewport
     * and starts hydrating.
     */
    rootMargin?: string;
    /**
     * Re-render every time the element becomes visible.
     */
    once?: boolean;
}>;

export const LazyHydrate = ({
    children,
    rootMargin = "300px",
    once = true,
}: LazyHydrateProps) => {
    const [shouldRender, setShouldRender] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (shouldRender) {
            return;
        }

        const node = containerRef.current;

        if (!node) {
            return;
        }

        if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
            setShouldRender(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShouldRender(true);
                        if (once) {
                            observer.disconnect();
                        }
                    }
                });
            },
            { rootMargin },
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [once, rootMargin, shouldRender]);

    return <div ref={containerRef}>{shouldRender ? children : null}</div>;
};
