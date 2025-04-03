"use client";

import * as React from "react";
import { Link } from "@/i18n/navigation";
import BrandingIcon from "@/assets/dropdown/dropdown_1.svg";
import DigitalPromotionIcon from "@/assets/dropdown/dropdown_2.svg";
import VideoProductionIcon from "@/assets/dropdown/dropdown_3.svg";
import WebDevIcon from "@/assets/dropdown/dropdown_4.svg";
import MarketingPromotionIcon from "@/assets/dropdown/dropdown_5.svg";
import CRMIcon from "@/assets/dropdown/dropdown_6.svg";

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePrevSlug } from "@/hooks/useSlug";
import { useTranslations } from "next-intl";

export const NavigationBar = () => {
    const prevSlug = usePrevSlug();
    const isCases = prevSlug === "cases";
    const t = useTranslations("HomePage");

    const components = React.useMemo(
        () => [
            {
                title: t("navLinks.services.branding"),
                href: "/services/branding",
                page: "branding",
                icon: <BrandingIcon />,
            },
            {
                title: t("navLinks.services.smm"),
                href: "/services/smm",
                page: "smm",
                icon: <DigitalPromotionIcon />,
            },
            {
                title: t("navLinks.services.videoProduction"),
                href: "/services/video-production",
                page: "video-production",
                icon: <VideoProductionIcon />,
            },
            {
                title: t("navLinks.services.siteCreating"),
                href: "/services/site-creating",
                page: "site-creating",
                icon: <WebDevIcon />,
            },
            {
                title: t("navLinks.services.marketingSupport"),
                href: "/services/marketing-support",
                page: "marketing-support",
                icon: <MarketingPromotionIcon />,
            },
            {
                title: t("navLinks.services.crm"),
                href: "/services/crm",
                page: "crm",
                icon: <CRMIcon />,
            },
            {
                title: t("navLinks.services.seo"),
                href: "/services/seo",
                page: "seo",
                icon: <CRMIcon />,
            },
            {
                title: t("navLinks.services.contextAd"),
                href: "/services/context-ads",
                page: "context-ads",
                icon: <CRMIcon />,
            },
            {
                title: t("navLinks.services.operativePrint"),
                href: "/services/operative-print",
                page: "operative-print",
                icon: <CRMIcon />,
            }
        ],
        [t]
    );

    return (
        <NavigationMenu>
            <NavigationMenuList className={cn("hidden lg:flex")}>
                <NavigationMenuItem>
                    <Link
                        href="/home"
                        className={cn(
                            navigationMenuTriggerStyle(),
                            isCases ? "text-primary hover:bg-black/5" : "text-white"
                        )}
                    >
                        {t("navLinks.home")}
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link
                        // onMouseEnter={() => prefetchPage('about')}
                        href="/about"
                        className={cn(
                            navigationMenuTriggerStyle(),
                            isCases ? "text-primary hover:bg-black/5" : "text-white"
                        )}
                    >
                        {t("navLinks.about")}
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link
                        // onMouseEnter={() => prefetchPage('cases')}
                        href="/cases"
                        className={cn(
                            navigationMenuTriggerStyle(),
                            isCases ? "text-primary hover:bg-black/5" : "text-white"
                        )}
                    >
                        {t("navLinks.cases")}
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className={cn(
                            navigationMenuTriggerStyle(),
                            isCases ? "text-primary hover:bg-black/5" : "text-white"
                        )}
                    >
                        {t("navLinks.services.initial")}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col w-[400px] gap-2 p-3">
                            {components.map((component, idx) => (
                                <ListItem
                                    key={idx}
                                    title={component.title}
                                    href={component.href}
                                    icon={component.icon}
                                    prefetchingPage={component.page}
                                />
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link
                        // onMouseEnter={() => prefetchPage('blog')}
                        href="/blog"
                        className={cn(
                            navigationMenuTriggerStyle(),
                            isCases ? "text-primary hover:bg-black/5" : "text-white"
                        )}
                    >
                        {t("navLinks.blog")}
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link
                        href="/contacts"
                        className={cn(
                            navigationMenuTriggerStyle(),
                            isCases ? "text-primary hover:bg-black/5" : "text-white"
                        )}
                    >
                        {t("navLinks.contacts")}
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

NavigationBar.displayName = 'NavigationBar'

const ListItem = React.forwardRef<
    React.ComponentRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode, prefetchingPage: string; }
>(({ className, title, icon, prefetchingPage, ...props }, ref) => {
    // const prefetchPage = usePrefetch("getStaticPageBySlug")
    
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    // onMouseEnter={() => prefetchPage(prefetchingPage)}
                    ref={ref}
                    className={cn(
                        "flex items-center gap-2 select-none space-y- 1 rounded-sm p-3 leading-normal no-underline outline-none transition-colors hover:bg-background-gray2 hover:text-foreground focus:bg-background-gray2 focus:text-primary",
                        className
                    )}
                    {...props}
                >
                    {icon && <span className="w-5 h-5">{icon}</span>}
                    <div className="text-lg font-normal leading-none">{title}</div>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
