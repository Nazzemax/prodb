"use client";

import { Logo } from "@/components/atoms/logo";
import { LanguageSelect } from "@/components/molecules/language-select";
import { MenuSheet } from "@/components/molecules/menu-sheet";
import { NavigationBar } from "@/components/molecules/navigation-bar";
import { memo, useEffect, useState } from "react";

export const Header = () => {
  const [isVisible, setIsVisible] = useState<boolean | string>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [scrollUpDistance, setScrollUpDistance] = useState<number>(0);
  const [isBlurred, setIsBlurred] = useState<boolean | string>(true);
  const [isShadowVisible, setIsShadowVisible] = useState<boolean | string>(true);
  const [hasBanner, setHasBanner] = useState<boolean | string>(false);
  const [lastBannerId, setLastBannerId] = useState<string | null>(null);

  const MemoizedNavBar = memo(NavigationBar);
  const MemoizedMobileMenu = memo(MenuSheet);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = lastScrollY - currentScrollY;

      if (currentScrollY === 0) {
        setIsBlurred(true);
        setIsShadowVisible(false);
      } else {
        setIsBlurred(false); 
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
    <main
      className={`fixed top-0 left-0 right-0 w-full max-w-[1920px] m-auto z-[50] transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isBlurred ? "bg-transparent" : "bg-white"} ${
        isShadowVisible ? "shadow-md" : "shadow-none"
      }`}
      style={{ marginTop: hasBanner ? "3.6rem" : "0" }}
    >
      <section className="flex justify-between items-center p-5 md:px-14 md:py-5">
        <Logo />
        <MemoizedNavBar />
        <article className="flex gap-x-0.5 items-center">
          <LanguageSelect />
          <div className="flex xl:hidden">
            <MemoizedMobileMenu />
          </div>
        </article>
      </section>
    </main>
  );
};
