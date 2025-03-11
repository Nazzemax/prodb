import React, { useEffect, useState } from "react";
import { useGetBannersQuery } from "@/api/Banners";

export interface BannerText {
  text: string;
  link: string;
}

const BANNER_DISMISSED_KEY = "banner_dismissed";

const NewsBanner: React.FC = () => {
    const { data, error, isLoading } = useGetBannersQuery();
    const [showBanner, setShowBanner] = useState(false);
    const [bannerContent, setBannerContent] = useState<BannerText | null>(null);

    useEffect(() => {
        // Check localStorage and only proceed if not dismissed
        const isDismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
        if (isDismissed) return;

        // Find valid banner content
        const validBanner = data?.find(b => {
            const banner = b.banner_text as BannerText | undefined;
            return banner?.text?.trim() && banner?.link?.trim();
        });

        if (validBanner) {
            setBannerContent(validBanner.banner_text);
            setShowBanner(true);
            window.dispatchEvent(new CustomEvent("bannerVisible", { detail: true }));
        }
    }, [data]);

    const handleDismiss = () => {
        localStorage.setItem(BANNER_DISMISSED_KEY, "true");
        setShowBanner(false);
        window.dispatchEvent(new CustomEvent("bannerVisible", { detail: false }));
    };

    // Don't render if any of these conditions are met
    if (error || isLoading || !showBanner || !bannerContent) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-sm md:text-base z-[60] 
            flex items-center justify-center px-6 py-4 shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                <span className="font-semibold">{bannerContent.text}</span>
                <a
                    href={bannerContent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium hover:opacity-80"
                >
                    Узнать больше &rarr;
                </a>
            </div>

            <button
                className="text-white text-2xl font-bold absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-75"
                onClick={handleDismiss}
                aria-label="Close banner"
            >
                ✕
            </button>
        </div>
    );
};

export default NewsBanner;