import * as React from "react";
import { cn } from "@/lib/utils";
import { CircleAlert, X } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
    error?: boolean;
    onClear?: () => void;
    isPhone?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, onClear, isPhone, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full bg-transparent px-3 py-2 text-secondary rounded-none text-base border-b-2 placeholder-gray2 focus-visible:outline-none focus-visible:border-b-graphic-light transition duration-200 disabled:cursor-not-allowed disabled:opacity-50",
                        error ? "border-b-accent" : "border-b-graphic-gray2",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error ? (
                    <CircleAlert className="absolute right-3 top-1/2 -translate-y-1/2 text-accent text-lg" />
                ) : props.value && onClear ? (
                    <div 
                        className={cn(
                            "absolute right-3 top-1/2 -translate-y-1/2",
                            isPhone ? "hidden" : "block"
                        )}
                    >
                        <X
                            style={{ width: '24px', height: '24px' }}
                            className="text-secondary hover:bg-white/20 rounded cursor-pointer transition-all duration-300"
                            onClick={onClear}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
