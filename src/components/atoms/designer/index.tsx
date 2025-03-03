import { cn } from '@/lib/utils'
import Link from 'next/link'

export const Designer = ({className}: {className?: string}) => {
    return (
        <span className={cn(className)}>
            Веб-дизайн — <Link className="hover:underline text-[#FF2B44]" target='_blank' href={"https://aidarsopubekov.framer.ai"}>aidarsopubekov.framer.ai</Link>
        </span>
    )
}
