'use client'

import { Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MobileLogo } from "@/components/atoms/logo"
import { MobileNavigationBar } from "../mobile-navigation-bar"
import { LanguageSelect } from "../language-select"

export const MenuSheet = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Sheet open={open} onOpenChange={setOpen} >
            <SheetTrigger asChild>
                <Button variant={'ghost'} className="bg-white/20 hover:bg-white/30 p-2 rounded-sm">
                    <Menu size={32} className="dark:text-graphic-gray2 text-primary-foreground" style={{ width: '21px', height: "21px" }} />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-screen p-3">
                <SheetTitle className="flex justify-between items-center">
                    <MobileLogo />
                    <span className="mr-12">
                        <LanguageSelect isMobile />
                    </span>
                </SheetTitle>
                <MobileNavigationBar closeSheet={() => setOpen(false)} />
            </SheetContent>
        </Sheet>
    )
}

