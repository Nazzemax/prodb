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
    const slug = usePrevSlug();
    const isCases = slug === "cases";
    const t = useTranslations("HomePage");

    const components = React.useMemo(
        () => [
            {
                title: t("navLinks.services.branding"),
                href: "/services/branding",
                icon: <BrandingIcon />,
            },
            {
                title: t("navLinks.services.smm"),
                href: "/services/smm",
                icon: <DigitalPromotionIcon />,
            },
            {
                title: t("navLinks.services.videoProduction"),
                href: "/services/video-production",
                icon: <VideoProductionIcon />,
            },
            {
                title: t("navLinks.services.siteCreating"),
                href: "/services/site-creating",
                icon: <WebDevIcon />,
            },
            {
                title: t("navLinks.services.marketingSupport"),
                href: "/services/marketing-support",
                icon: <MarketingPromotionIcon />,
            },
            {
                title: t("navLinks.services.crm"),
                href: "/services/crm",
                icon: <CRMIcon />,
            },
            {
                title: t("navLinks.services.seo"),
                href: "/services/seo",
                icon: <CRMIcon />,
            },
            {
                title: t("navLinks.services.contextAd"),
                href: "/services/context-ads",
                icon: <CRMIcon />,
            },
            {
                title: t("navLinks.services.operativePrint"),
                href: "/services/operative-print",
                icon: <CRMIcon />,
            },
        ],
        [t]
    );

    return (
        <NavigationMenu>
            <NavigationMenuList className={cn("hidden lg:flex")}>
                <NavigationMenuItem>
                    <Link href="/home" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={cn(
                                navigationMenuTriggerStyle(),
                                isCases ? "text-primary hover:bg-black/5" : "text-white"
                            )}
                        >
                            {t("navLinks.home")}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={cn(
                                navigationMenuTriggerStyle(),
                                isCases ? "text-primary hover:bg-black/5" : "text-white"
                            )}
                        >
                            {t("navLinks.about")}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/cases" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={cn(
                                navigationMenuTriggerStyle(),
                                isCases ? "text-primary hover:bg-black/5" : "text-white"
                            )}
                        >
                            {t("navLinks.cases")}
                        </NavigationMenuLink>
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
                            {components.map((component,idx) => (
                                <ListItem
                                    key={idx}
                                    title={component.title}
                                    href={component.href}
                                    icon={component.icon}
                                />
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/contacts" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={cn(
                                navigationMenuTriggerStyle(),
                                isCases ? "text-primary hover:bg-black/5" : "text-white"
                            )}
                        >
                            {t("navLinks.contacts")}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, icon, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
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
