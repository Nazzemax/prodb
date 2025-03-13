import React, { useEffect, useState } from "react";
import { useGetBannersQuery } from "@/api/Banners";

export interface BannerText {
  text: string;
  link: string;
}

const BANNER_DISMISSED_KEY_PREFIX = "banner_dismissed_";

const NewsBanner: React.FC = () => {
    const { data, error, isLoading } = useGetBannersQuery();
    const [showBanner, setShowBanner] = useState(false);
    const [bannerContent, setBannerContent] = useState<BannerText | null>(null);
    const [currentBannerKey, setCurrentBannerKey] = useState<string | null>(null);

    useEffect(() => {
    // Find valid banner content
        const validBanner = data?.find((b) => {
            const banner = b.banner_text as BannerText | undefined;
            return banner?.text?.trim() && banner?.link?.trim();
        });

        if (validBanner) {
            const banner = validBanner.banner_text as BannerText;
            // Use text and link to create a unique dismissal key
            const dismissKey = `${BANNER_DISMISSED_KEY_PREFIX}${banner.text}-${banner.link}`;
            const isDismissed = localStorage.getItem(dismissKey);

            // Only show if this specific banner hasn't been dismissed
            if (!isDismissed) {
                setBannerContent(banner);
                setCurrentBannerKey(dismissKey); // Store the dismissal key instead of id
                setShowBanner(true);
                window.dispatchEvent(
                    new CustomEvent("bannerVisible", {
                        detail: {
                            visible: true,
                            bannerKey: dismissKey, // Use dismissKey in event
                        },
                    })
                );
            }
        }
    }, [data]);

    const handleDismiss = () => {
        if (currentBannerKey) {
            localStorage.setItem(currentBannerKey, "true");
        }
        setShowBanner(false);
        window.dispatchEvent(
            new CustomEvent("bannerVisible", {
                detail: {
                    visible: false,
                    bannerKey: currentBannerKey,
                },
            })
        );
    };

    // Don't render if any of these conditions are met
    if (error || isLoading || !showBanner || !bannerContent) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-sm md:text-base z-[60] flex items-center justify-center px-6 py-4 shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                <span className="font-semibold">{bannerContent.text}</span>
                <a
                    href={bannerContent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium hover:opacity-80"
                >
          Узнать больше →
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