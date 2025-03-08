import { cn } from "@/lib/utils";
import { ReactElement } from "react";

interface StatItemProps {
    title: string;
    sub_title: string;
    icon?: ReactElement;
    idx: number;
    isService?: boolean;
}

export const StatItem = ({
    title,
    sub_title,
    icon,
    idx,
    isService
}: StatItemProps) => {
    return (
        <div
            className={cn(
                'relative',
                idx === 0 ? '2xl:ml-80' : '',
                idx === 3 ? ' 2xl:mr-80' : ''
            )}
        >
            {icon}
            <div className={cn(
                'absolute left-16 md:left-20 mt-8 md:mt-0 w-52 space-y-1 text-center md:text-start',
                isService ? 'top-32 mt-0 md:top-1/3' : 'top-20 md:top-1/4'
            )}>
                {isService
                    ? <>
                        <p className="text-gray text-xs md:text-sm">{sub_title}</p>
                        <h1 className="text-3xl md:text-4xl">{title}</h1>
                    </>
                    : <>
                        <h1 className="text-3xl md:text-4xl">{title}</h1>
                        <p className="text-gray text-xs md:text-sm">{sub_title}</p>
                    </>
                }
            </div>
        </div>
    )
}
