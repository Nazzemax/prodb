import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { Button } from "@/components/ui/button";

const buttonVariants = cva(
    "w-fit inline-flex items-center gap-2 text-base rounded-md px-3 py-7 font-medium",
    {
        variants: {
            variant: {
                primary: "bg-accent text-accent-foreground hover:bg-accent-hover disabled:bg-graphic-gray disabled:text-gray",
                secondary: "border bg-transparent text-primary hover:bg-graphic-dark hover:text-secondary disabled:border-graphic-gray disabled:text-gray",
                ghost: "bg-tranparent border-none text-primary disabled:text-gray",
                feature: "bg-tranparent hover:bg-background-gray2 border-none text-accent disabled:text-gray",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
);

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "feature";
    children: React.ReactNode;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
    variant = "primary",
    children,
    className,
    ...props
}) => {
    return (
        <Button
            variant="ghost"
            className={cn(buttonVariants({ variant, className }), 'group')}
            {...props}
        >
            {children}
            <span className={cn(
                'rounded-sm',
                variant == 'primary' ? 'bg-white p-3' : '',
                variant == 'secondary' ? 'rounded-none group-hover:bg-transparent' : '',
            )}>
                <ChevronRight
                    className={cn(
                        'text-primary',
                        variant == 'feature' && 'text-accent',
                        variant == 'secondary' && 'group-hover:text-white',
                    )}
                    size={32}
                />
            </span>
        </Button >
    );
};

export { ButtonWithIcon, buttonVariants };