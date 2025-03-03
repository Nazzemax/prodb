"use client"

import * as React from "react";
import Link from "next/link";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

const innerLinks: LinkProps[] = [
    { title: "Брендинг", href: "/services/branding" },
    { title: "Digital продвижение", href: "/services/smm"},
    { title: "Видеопродакшн", href: "/services/video-production"},
    { title: "Веб-разработка и дизайн", href: "/services/site-creating"},
    { title: "Комплексное маркетинговое продвижение", href: "/services/marketing-support"},
    { title: "Внедрение CRM системы", href: "/services/crm"},
    { title: "SEO-оптимизация", href: "/services/seo",},
];

const links: LinkProps[] = [
    { title: "Главная", href: "/home" },
    { title: "О нас", href: "/about" },
    { title: "Кейсы", href: "/cases" },
]

export const MobileNavigationBar = ({ closeSheet }: { closeSheet: () => void }) => {

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
                    <AccordionTrigger className="text-lg font-medium">Услуги</AccordionTrigger>
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
                linkTitle={"Контакты"}
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