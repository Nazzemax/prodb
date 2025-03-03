"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import RussianIcon from "@/assets/dropdown/rus.svg";
import UzbIcon from "@/assets/dropdown/usb.svg";
import UsaIcon from "@/assets/dropdown/usa.svg";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LanguageProps {
    id: string;
    title: string;
    shortTitle: string;
    icon: React.ReactNode;
}

const languageList: LanguageProps[] = [
    {
        id: "1",
        title: "English",
        shortTitle: "EN",
        icon: <UsaIcon />
    },
    {
        id: "2",
        title: "Русский",
        shortTitle: "РУ",
        icon: <RussianIcon />
    },
    {
        id: "3",
        title: "О'zbek",
        shortTitle: "UZ",
        icon: <UzbIcon />
    }
];

export const LanguageSelect = ({ isMobile }: { isMobile?: boolean }) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>('2');

    const onChangeLanguage = (value: string) => {
        console.log(value);
        setSelectedLanguage(value);
    };

    const selectedLang = languageList.find(
        (language) => language.id === selectedLanguage
    );

    return (
        <div>
            <Select value={selectedLanguage} onValueChange={onChangeLanguage}>
                <SelectTrigger
                    className={cn(
                        'hover:bg-white/20 transition-all focus:ring-offset-0 outline-none duration-200 w-[110px]',
                        isMobile ? 'text-black' : ''
                    )}>
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
                        <SelectItem key={language.id} value={language.id}>
                            <div className="flex items-center space-x-2 hover:text-red-500 transition-colors duration-200">
                                <span>{language.icon}</span>
                                <span>{language.title}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
