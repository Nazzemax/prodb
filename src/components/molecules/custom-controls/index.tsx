import { Button } from "@/components/ui/button";
import { useCarousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const  CustomCarouselControls = () => {
    const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

    return (
        <div className="absolute bottom-28 left-5 flex justify-between items-center md:hidden gap-x-3">
            <Button
                variant={'carousel'}
                className={cn(
                    "h-14 w-14",
                )}
                disabled={!canScrollPrev}
                onClick={scrollPrev}
            >
                <ChevronLeft className={cn('h-4 w-4 text-white')} />
                <span className="sr-only">Previous slide</span>
            </Button>
            <Button
                variant={'carousel'}
                className={cn(
                    "h-14 w-14",
                )}
                disabled={!canScrollNext}
                onClick={scrollNext}
            >
                <ChevronRight className={cn('h-4 w-4 text-white')} />
                <span className="sr-only">Previous slide</span>
            </Button>
        </div>
    );
}