"use client"

import * as React from "react"
import useEmblaCarousel, {
    type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress";

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
    opts?: CarouselOptions
    plugins?: CarouselPlugin
    orientation?: "horizontal" | "vertical"
    setApi?: (api: CarouselApi) => void
    hasProgressBar?: boolean
}

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0]
    api: ReturnType<typeof useEmblaCarousel>[1]
    scrollPrev: () => void
    scrollNext: () => void
    canScrollPrev: boolean
    canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

export function useCarousel() {
    const context = React.useContext(CarouselContext)

    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />")
    }

    return context
}

const Carousel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
    (
        {
            orientation = "horizontal",
            opts,
            setApi,
            plugins,
            className,
            children,
            hasProgressBar,
            ...props
        },
        ref
    ) => {
        const [carouselRef, api] = useEmblaCarousel(
            {
                ...opts,
                axis: orientation === "horizontal" ? "x" : "y",
            },
            plugins
        )
        const [canScrollPrev, setCanScrollPrev] = React.useState(false)
        const [canScrollNext, setCanScrollNext] = React.useState(false)

        // Состояние для прогресса (от 0 до 100)
        const [progress, setProgress] = React.useState(0)
        // Реф для отметки времени последнего сброса таймера
        const timerStartRef = React.useRef(Date.now())

        // Функция сброса таймера прогрессбара
        const resetTimer = React.useCallback(() => {
            timerStartRef.current = Date.now()
            setProgress(0)
        }, [])

        const onSelect = React.useCallback(
            (api: CarouselApi) => {
                if (!api) return
                setCanScrollPrev(api.canScrollPrev())
                setCanScrollNext(api.canScrollNext())
            },
            []
        )

        const scrollPrev = React.useCallback(() => {
            api?.scrollPrev()
            if (hasProgressBar) resetTimer()
        }, [api, hasProgressBar, resetTimer])

        const scrollNext = React.useCallback(() => {
            api?.scrollNext()
            if (hasProgressBar) resetTimer()
        }, [api, hasProgressBar, resetTimer])

        React.useEffect(() => {
            if (!api || !setApi) return
            setApi(api)
        }, [api, setApi])

        React.useEffect(() => {
            if (!api) return
            onSelect(api)
            api.on("reInit", onSelect)
            api.on("select", onSelect)
            return () => {
                api?.off("select", onSelect)
            }
        }, [api, onSelect])

        // Эффект для автоматического обновления прогрессбара и переключения слайда
        React.useEffect(() => {
            if (!hasProgressBar) return
            const interval = setInterval(() => {
                const elapsed = Date.now() - timerStartRef.current
                const newProgress = (elapsed / 8000) * 100
                if (newProgress >= 100) {
                    scrollNext()
                    resetTimer()
                } else {
                    setProgress(newProgress)
                }
            }, 100)
            return () => clearInterval(interval)
        }, [hasProgressBar, scrollNext, resetTimer])

        return (
            <CarouselContext.Provider
                value={{
                    carouselRef,
                    api: api,
                    opts,
                    orientation:
                        orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                }}
            >
                <div className="relative">
                    <div
                        ref={ref}
                        onKeyDownCapture={(e) => {
                            if (e.key === "ArrowLeft") {
                                e.preventDefault()
                                scrollPrev()
                            } else if (e.key === "ArrowRight") {
                                e.preventDefault()
                                scrollNext()
                            }
                        }}
                        className={cn("relative", className)}
                        role="region"
                        aria-roledescription="carousel"
                        {...props}
                    >
                        {children}
                    </div>

                    {hasProgressBar && (
                        <Progress
                            className="absolute bottom-0 h-2"
                            value={progress}
                        />
                    )}
                </div>
            </CarouselContext.Provider>
        )
    }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel()

    return (
        <div ref={carouselRef} className="overflow-hidden">
            <div
                ref={ref}
                className={cn(
                    "flex",
                    orientation === "horizontal" ? "" : "-mt-4 flex-col",
                    className
                )}
                {...props}
            />
        </div>
    )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {

    return (
        <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            className={cn(
                "min-w-0 shrink-0 grow-0 basis-full",
                className
            )}
            {...props}
        />
    )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
>(({ className, variant = "carousel", iconColor, size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    return (
        <Button
            ref={ref}
            variant={variant}
            size={size}
            className={cn(
                "absolute h-14 w-14",
                orientation === "horizontal"
                    ? "left-14 top-1/2 -translate-y-1/2"
                    : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
                className
            )}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <ChevronLeft className={cn('h-4 w-4', iconColor)} />
            <span className="sr-only">Previous slide</span>
        </Button>
    )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
>(({ className, variant = "carousel", iconColor, size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    return (
        <Button
            ref={ref}
            variant={variant}
            size={size}
            className={cn(
                "absolute h-14 w-14",
                orientation === "horizontal"
                    ? "right-14 top-1/2 -translate-y-1/2"
                    : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
                className
            )}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
            <ChevronRight className={cn('h-4 w-4', iconColor)} />
            <span className="sr-only">Next slide</span>
        </Button>
    )
})
CarouselNext.displayName = "CarouselNext"

export {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
}
