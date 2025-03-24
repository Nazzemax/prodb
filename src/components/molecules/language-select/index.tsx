"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import RussianIcon from "@/assets/dropdown/rus.svg";
import UzbIcon from "@/assets/dropdown/usb.svg";
import UsaIcon from "@/assets/dropdown/usa.svg";
import { memo, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { baseApi } from "@/api/Base";
import { useSelector } from "react-redux";
import { getLanguage } from "@/api/LanguageSelect/selector";
import { languageActions } from "@/api/LanguageSelect";
import { Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { useAppData } from "@/context/app-context";

interface LanguageProps {
    id: string;
    title: string;
    headers: string;
    shortTitle: string;
    icon: React.ReactNode;
}

const languageList: LanguageProps[] = [
    { id: "1", title: "English", shortTitle: "EN", headers: "en", icon: <UsaIcon /> },
    { id: "2", title: "Русский", shortTitle: "РУ", headers: "ru", icon: <RussianIcon /> },
    { id: "3", title: "O'zbek", shortTitle: "UZ", headers: "uz", icon: <UzbIcon /> },
];

export const LanguageSelect = memo(({ isMobile }: { isMobile?: boolean }) => {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();
    const { scrollToFeedback } = useAppData()

    const [isClient, setIsClient] = useState(false);
    const [isCase, setIsCase] = useState(false);
    const dispatch = useAppDispatch();
    const selectedLanguage = useSelector(getLanguage);

    useEffect(() => {
        setIsCase(/^\/cases\/[^/]+/.test(pathname));
    }, [pathname]);

    useEffect(() => {
        if (isClient && locale) {
            dispatch(languageActions.setLanguage(locale));
        }
    }, [locale, dispatch, isClient]);

    const onChangeLanguage = useCallback((value: string) => {
        dispatch(languageActions.setLanguage(value));
        dispatch(baseApi.util.resetApiState());
        document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000; SameSite=Lax`;

        if (value !== locale) {
            router.replace(pathname, { locale: value as Locale });
        }
    }, [dispatch, locale, pathname, router])

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || selectedLanguage === null) return null;

    const selectedLang =
        languageList.find((lang) => lang.headers === selectedLanguage) ||
        languageList[1];

    return (
        <div className="flex gap-[24px] items-center">
            <Select value={selectedLanguage} onValueChange={onChangeLanguage}>
                <SelectTrigger
                    className={cn(
                        "hover:bg-white/20 transition-all focus:ring-offset-0 outline-none duration-200 w-[110px]",
                        isMobile || isCase ? "text-black" : ""
                    )}
                >
                    <SelectValue>
                        {selectedLang && (
                            <div className="flex items-center space-x-1 focus:ring-offset-0">
                                <span>{selectedLang.icon}</span>
                                <span className="pr-1">{selectedLang.shortTitle}</span>
                            </div>
                        )}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className="min-w-[180px]">
                    {languageList.map((language) => (
                        <SelectItem key={language.id} value={language.headers}>
                            <div className="flex items-center space-x-2 hover:text-red-500 transition-colors duration-200">
                                <span>{language.icon}</span>
                                <span>{language.title}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {isCase &&
                <ButtonWithIcon
                    aria-label="Связаться"
                    onClick={scrollToFeedback}
                    className="max-lg:hidden"
                    variant="secondary"
                >
                    Связаться
                </ButtonWithIcon>
            }
        </div>
    );
})

LanguageSelect.displayName = "LanguageSelect";