'use client'

import { Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MobileLogo } from "@/components/atoms/logo"
import { MobileNavigationBar } from "../mobile-navigation-bar"
import { LanguageSelect } from "../language-select"
import { usePathname } from "next/navigation"

export const MenuSheet = () => {
    const [open, setOpen] = useState<boolean>(false)

    const pathname = usePathname()
    const isActivePath = /^\/(ru|en|uz)\/cases\/\d+$/.test(pathname)

    return (
        <Sheet open={open} onOpenChange={setOpen} >
            <SheetTrigger asChild>
                <Button variant={'ghost'} className={`p-2 rounded-sm ${isActivePath ? "bg-graphic-dark hover:bg-graphic-gray2" : "bg-white/20 hover:bg-white/30"}`}>
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

