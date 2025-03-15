'use client';

import { Logo } from "@/components/atoms/logo";
import { FooterLinks } from "@/components/molecules/footer-links";
import { Separator } from "@/components/ui/separator";
import { useAppData } from "@/context/app-context";
import { textVariant, viewportConfig, staggerTransition } from "@/lib/motion";
import { motion } from "framer-motion";
import React from "react";

export const Footer = () => {
    const { data } = useAppData()

    return (
        <footer className="space-y-16 p-4 md:p-16 bg-background">
            <div className="flex flex-col xl:flex-row justify-between gap-y-5 mt-8">
                <div className="flex flex-col justify-between">
                    <motion.div
                        variants={textVariant(0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig}
                        transition={staggerTransition(0)}
                        className="flex flex-col gap-4"
                    >
                        <Logo />
                        <p className="text-gray2 text-base max-w-sm">{data?.description}</p>
                    </motion.div>
                </div>
                <FooterLinks />
            </div>
            <div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 mt-3 text-gray2">
                    <span className="text-left">&copy; 2024 Bold Brands International. Все права защищены</span>
                    <span className="md:text-right">Политика конфиденциальности</span>
                </div>
            </div>
        </footer>
    );
};