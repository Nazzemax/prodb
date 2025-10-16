"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const MapLoading = () => {
    const t = useTranslations("Map");

    return (
        <div className="flex h-[60vh] items-center justify-center rounded-[32px] bg-background-dark text-lg font-semibold text-primary-foreground">
            {t("loadingLabel")}
        </div>
    );
};

const Map = dynamic(() => import("./Map").then((mod) => mod.Map), {
    ssr: false,
    loading: () => <MapLoading />,
});

export const DeferredMap = () => {
    const t = useTranslations("Map");
    const [hasPrefetched, setHasPrefetched] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const node = containerRef.current;

        if (!node || typeof window === "undefined") {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            setHasPrefetched(true);
            void import("./Map");
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setHasPrefetched(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: "400px" },
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (hasPrefetched) {
            void import("./Map");
        }
    }, [hasPrefetched]);

    const handleLoadMap = useCallback(() => {
        if (!hasPrefetched) {
            setHasPrefetched(true);
            void import("./Map");
        }

        setShouldRender(true);
    }, [hasPrefetched]);

    return (
        <div ref={containerRef} className="mt-12 w-full">
            {shouldRender ? (
                <Map />
            ) : (
                <div className="flex min-h-[320px] flex-col items-center justify-center space-y-6 rounded-[32px] bg-background-dark px-6 py-12 text-center text-primary-foreground">
                    <MapPin className="h-16 w-16 text-accent" aria-hidden="true" />
                    <p className="max-w-xl text-base text-gray2 md:text-lg">
                        {t("deferredDescription")}
                    </p>
                    <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        onClick={handleLoadMap}
                        disabled={!hasPrefetched}
                    >
                        {hasPrefetched ? t("loadMap") : t("preparingMap")}
                    </Button>
                    <p className="text-xs text-gray2">{t("deferredHint")}</p>
                </div>
            )}
        </div>
    );
};

