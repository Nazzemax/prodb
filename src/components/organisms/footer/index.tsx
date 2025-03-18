"use client";

import { FormTerms } from "@/components/atoms/form-terms";
import { Logo } from "@/components/atoms/logo";
import { FooterLinks } from "@/components/molecules/footer-links";
import { Separator } from "@/components/ui/separator";
import { useAppData } from "@/context/app-context";
import React, { memo, useState } from "react";

export const Footer = () => {
    const { data } = useAppData();
    const MemoizedLinks = memo(FooterLinks);
    const [openTerms, setOpenTerms] = useState(false)

    const showTerms = () => {
        setOpenTerms(prev => !prev)
    }

    return (
        <footer className="space-y-16 p-4 md:p-16 bg-background">
            <div className="flex flex-col xl:flex-row justify-between gap-y-5 mt-8">
                <div className="flex flex-col justify-between">
                    <div
                        className="flex flex-col gap-4"
                    >
                        <Logo />
                        <p className="text-gray2 text-base max-w-sm">{data?.description}</p>
                    </div>
                </div>
                <MemoizedLinks />
            </div>
            <div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 mt-3 text-gray2">
                    <span className="text-left">
                        &copy; 2024 Bold Brands International. Все права защищены
                    </span>
                    <span onClick={showTerms} className="md:text-right hover:cursor-pointer hover:text-gray transition-all duration-200">Политика конфиденциальности</span>
                    <FormTerms isOpen={openTerms} onOpenChange={setOpenTerms} />
                </div>
            </div>
        </footer>
    );
};
