"use client";

import dynamic from "next/dynamic";

import { LazyHydrate } from "@/components/utils/lazy-hydrate";

const Map = dynamic(() => import("./Map").then((mod) => mod.Map), {
    ssr: false,
    loading: () => (
        <div className="flex h-[60vh] items-center justify-center rounded-[32px] bg-background-dark text-lg font-semibold">
            Загрузка карты...
        </div>
    ),
});

type MapClientWrapperProps = {
    rootMargin?: string;
};

const MapClientWrapper = ({ rootMargin = "600px" }: MapClientWrapperProps) => (
    <LazyHydrate rootMargin={rootMargin}>
        <Map />
    </LazyHydrate>
);

export default MapClientWrapper;
