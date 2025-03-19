import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const headingVariants = cva("text-primary font-bold", {
    variants: {
        variant: {
            h1: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
            h2: "text-[32px] md:text-4xl lg:text-5xl leading-9",
            h3: "text-xl md:text-4xl",
            h4: "text-2xl md:text-3xl",
        },
    },
    defaultVariants: {
        variant: "h1",
    },
});

type HeadingProps = {
    as?: "h1" | "h2" | "h3" | "h4";
    className?: string;
    children: React.ReactNode;
} & VariantProps<typeof headingVariants>;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ as: Tag = "h1", className, children }, ref) => {
        return (
            <Tag ref={ref} className={cn(headingVariants({ variant: Tag }), className)}>
                {children}
            </Tag>
        )
    });

Heading.displayName = "Heading"

