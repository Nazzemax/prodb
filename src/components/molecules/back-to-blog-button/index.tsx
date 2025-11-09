"use client";

import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { useAppData } from "@/context/app-context";
import { useLocale } from "next-intl";
import { ButtonHTMLAttributes, MouseEvent, useCallback } from "react";

type BackToBlogButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const BackToBlogButton = ({
    children,
    onClick,
    ...props
}: BackToBlogButtonProps) => {
    const { scrollToArticleList } = useAppData();
    const locale = useLocale();

    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);
            if (event.defaultPrevented) return;

            const targetHref = locale ? `/${locale}/blog#article-list` : "/blog#article-list";
            scrollToArticleList(targetHref);
        },
        [locale, onClick, scrollToArticleList]
    );

    return (
        <ButtonWithIcon type="button" {...props} onClick={handleClick}>
            {children}
        </ButtonWithIcon>
    );
};

export default BackToBlogButton;
