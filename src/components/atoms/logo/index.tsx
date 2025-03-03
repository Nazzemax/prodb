import BoldLogo from '@/assets/bold_logo.svg'
import BoldLogoMobile from '@/assets/bold_logo_mobile.svg'
import { cn } from '@/lib/utils'

export const Logo = ({className}: {className?: string}) => {
    return (
        <>
            <BoldLogo className={cn('hidden lg:flex', className)} />
            <BoldLogoMobile className={cn('flex lg:hidden', className)} />
        </>
    )
}

export const MobileLogo = () => {
    return (
        <BoldLogoMobile />
    )
}