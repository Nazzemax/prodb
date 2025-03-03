import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React from "react";
import { memo } from "react"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const SearchInput = memo(
    React.forwardRef<HTMLInputElement, InputProps>(
        ({ className, type, ...props }, ref) => {
            return (
                <div className="grid items-center gap-1.5">
                    <div className="relative">
                        <div className="absolute top-2.5 left-0 z-30 text-gray2">
                            <Search  />
                        </div>
                        <Input 
                            ref={ref}
                            id="search" 
                            type={type} 
                            placeholder="Найти..." 
                            className={cn('w-full max-w-md bg-transparent pl-8 h-12 text-gray2 focus-visible:border-b-gray2', className)}
                            {...props}
                        />
                    </div>
                </div>
            );
        }
    )
);
Input.displayName = "SearchInput";

export { SearchInput };

