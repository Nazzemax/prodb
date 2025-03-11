"use client"

import * as React from "react";
import Link from "next/link";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface LinkProps {
    title: string;
    href: string;
    icon?: React.ReactNode;
}

interface innerLinksProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    linkTitle: string,
    linkHref?: string,
    linkIcon?: React.ReactNode
}

export const MobileNavigationBar = ({ closeSheet }: { closeSheet: () => void }) => {
    const pathname = usePathname();
    const [isCase, setIsCase] = React.useState(false);
    
    React.useEffect(() => {
        setIsCase(/^\/cases\/[^/]+/.test(pathname));
    }, [pathname]);

    const t = useTranslations("HomePage");

    const links: LinkProps[] = React.useMemo(() => [
        { title: t("navLinks.home"), href: "/home" },
        { title: t("navLinks.about"), href: "/about" },
        { title: t("navLinks.cases"), href: "/cases" },
    ], [t]);

    const innerLinks: LinkProps[] = React.useMemo(() => [
        { title: t("navLinks.services.branding"), href: "/services/branding" },
        { title: t("navLinks.services.smm"), href: "/services/smm" },
        { title: t("navLinks.services.videoProduction"), href: "/services/video-production" },
        { title: t("navLinks.services.siteCreating"), href: "/services/site-creating" },
        { title: t("navLinks.services.marketingSupport"), href: "/services/marketing-support" },
        { title: t("navLinks.services.crm"), href: "/services/crm" },
        { title: t("navLinks.services.seo"), href: "/services/seo" },
    ], [t]);

    return (
        <nav className="mt-8 space-y-2 font-bold">
            {links.map((link) => (
                <LinkItem
                    className="text-lg"
                    key={link.title}
                    linkTitle={link.title}
                    linkHref={link.href}
                    closeSheet={closeSheet}
                />
            ))}
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="services">
                    <AccordionTrigger className="text-lg font-medium">{t('navLinks.services.initial')}</AccordionTrigger>
                    <AccordionContent className="flex flex-col text-primary space-y-1 pl-4">
                        {innerLinks.map((link) => (
                            <LinkItem
                                key={link.title}
                                linkTitle={link.title}
                                linkHref={link.href}
                                linkIcon={link.icon}
                                closeSheet={closeSheet}
                            />
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <LinkItem
                closeSheet={closeSheet}
                linkHref="/contacts"
                linkTitle={t('navLinks.contacts')}
            />
        </nav>
    );
};

const LinkItem = ({
    linkTitle,
    linkHref,
    className,
    closeSheet
}: innerLinksProps & { closeSheet: () => void }) => {
    return (
        <Button
            onClick={() => closeSheet()}
            key={linkTitle}
            variant={'ghost'}
            className={
                cn('flex justify-start text-base w-full text-wrap rounded-none border-b-2 border-graphic-gray hover:border-graphic-gray2  hover:bg-background-gray', className)
            }
        >
            <Link href={linkHref || ''} className="text-start leading-5 gap-x-2">
                <span>{linkTitle}</span>
            </Link>
        </Button>
    )
}