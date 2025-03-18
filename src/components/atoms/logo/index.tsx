import { Link } from '@/i18n/navigation'
import localFont from 'next/font/local'
import { memo } from 'react'

const Reload = () => location.reload()

const akrobatFontExtraBold = localFont({
    src: "../../../../public/fonts/Akrobat-ExtraBold.otf",
})
const akrobatFontSemibold = localFont({
    src: "../../../../public/fonts/Akrobat-Bold.otf",
})

export const Logo = memo(() => {
    return (
        <Link href={'/home'} target='_top' onClick={Reload} className={`flex items-center text-accent ${akrobatFontExtraBold.className} text-2xl md:text-3xl font-extrabold`}>
            <div className="flex flex-col gap-1 mr-2">
                <div className="w-[26px] h-[8px] bg-accent rounded-bl-[4px] rounded-tr-[4px]"></div>
                <div
                    className={`w-[26px] h-[8px] bg-accent rounded-l-[4px]`}
                    style={{ clipPath: "polygon(100% 0%, 97.8% 13.62%, 94.86% 27.11%, 89.47% 39.45%, 82.25% 49.27%, 89.47% 60.82%, 94.86% 74.68%, 97.8% 87.14%, 100% 99.75%, 0% 100%, 0% 49.27%, 0% 0%)" }}
                ></div>
                <div className="w-[26px] h-[8px] bg-accent rounded-t-[4px]"></div>
            </div>
            <div className="relative" style={{ transform: "scaleY(0.85)" }}>
                <span className="leading-none tracking-tight">Bold Brands</span>
                <span className={`absolute top-0 -right-4 text-xs md:text-sm ${akrobatFontSemibold.className}`}>int</span>
            </div>
        </Link>
    )
})

Logo.displayName = 'Logo'