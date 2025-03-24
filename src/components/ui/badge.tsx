import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
                service: "bg-white/10 px-1 py-0.5 text-sm font-normal border-none rounded-sm text-primary-foreground hover:bg-white/30",
                tag: "bg-white border rounded-sm font-thin text-gray2 py-1 text-sm md:text-base w-fit",
                post: "border-none flex items-center gap-2 rounded-sm bg-black/30 backdrop-blur-sm shadow-sm px-3 py-2 text-white whitespace-nowrap overflow-hidden text-ellipsis text-lg truncate",
                case: "border-none py-4 px-6 text-gray2 bg-background-gray2 hover:bg-background-dark rounded-[16px]"
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
