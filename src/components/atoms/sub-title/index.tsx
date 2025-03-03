import { cn } from "@/lib/utils";

interface SubTitleProps {
    children: React.ReactNode;
    className?: string;
}

export const SubTitle = ({
    children,
    className,
}: SubTitleProps) => {
    return (
        <div className={cn(
            'text-gray2 text-sm md:text-base',
            className
        )}>
            {children}
        </div>
    )
}
