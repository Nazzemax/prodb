"use client";

import { Logo } from "@/components/atoms/logo";
import { LanguageSelect } from "@/components/molecules/language-select";
import { MenuSheet } from "@/components/molecules/menu-sheet";
import { NavigationBar } from "@/components/molecules/navigation-bar";
import { memo, useEffect, useState } from "react";

export const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollUpDistance, setScrollUpDistance] = useState(0);
    const [isBlurred, setIsBlurred] = useState(true);
    const [isShadowVisible, setIsShadowVisible] = useState(true);
    const [hasBanner, setHasBanner] = useState(false);
    const [lastBannerId, setLastBannerId] = useState<string | null>(null);

    const MemoizedNavBar = memo(NavigationBar);
    const MemoizedMobileMenu = memo(MenuSheet);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const deltaY = lastScrollY - currentScrollY;

            if (currentScrollY === 0) {
                setIsBlurred(false);
            } else {
                setIsBlurred(true);
            }

            if (currentScrollY === 0) {
                setIsShadowVisible(false);
            } else {
                setIsShadowVisible(true);
            }

            if (deltaY > 0) {
                setScrollUpDistance((prev) => prev + deltaY);
                if (scrollUpDistance + deltaY > 50) {
                    setIsVisible(true);
                }
            } else {
                setScrollUpDistance(0);
                if (currentScrollY > 50) {
                    setIsVisible(false);
                }
            }

            setLastScrollY(currentScrollY);
        };

        const handleBannerVisibility = (e: CustomEvent) => {
            const {
                detail: { visible, bannerId },
            } = e;

            // Show banner if it's a new one (different ID)
            if (bannerId !== lastBannerId) {
                setHasBanner(visible);
                setLastBannerId(bannerId);
            } else {
                setHasBanner(visible);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener(
            "bannerVisible",
            handleBannerVisibility as EventListener
        );

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener(
                "bannerVisible",
                handleBannerVisibility as EventListener
            );
        };
    }, [lastScrollY, scrollUpDistance, lastBannerId]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 w-full max-w-[1920px] m-auto z-[50] transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
            } ${isBlurred ? "bg-black/30 backdrop-blur-md" : "bg-black/0"} ${isShadowVisible ? "shadow-md" : "shadow-none"
            }`}
            style={{ marginTop: hasBanner ? "4rem" : "0" }}
        >
            <div className="flex justify-between items-center p-5 md:px-14 md:py-5">
                <Logo />
                <MemoizedNavBar />
                <div className="flex gap-x-0.5 items-center">
                    <LanguageSelect />
                    <div className="flex xl:hidden">
                        <MemoizedMobileMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};
