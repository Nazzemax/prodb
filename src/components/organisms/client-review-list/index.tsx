"use client";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Heading } from "@/components/atoms/heading";
import { SubTitle } from "@/components/atoms/sub-title";
import { Button } from "@/components/ui/button";
import { cn, getYouTubeId } from "@/lib/utils";
import CompanyInfoSVG from "@/assets/backgrounds/company_info.svg";
import { useTranslations } from "next-intl";
import { useSlug } from "@/hooks/useSlug";
import { useGetCompanyVideoReviewsQuery } from "@/api/Company";
import { useYouTubeId } from "@/hooks/useVideoId";

const ClientReviewList = ({
    hasSubTitle,
    hasBg,
}: {
    hasSubTitle?: boolean;
    hasBg?: boolean;
}) => {
    const { data: reviews = [] } = useGetCompanyVideoReviewsQuery();
    const [currentPage, setCurrentPage] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const pathname = useSlug() as
        "blog" |
        "cases" |
        "home" |
        "smm" |
        "video-production"
        ;

    const paths = {
        "blog": {
            sub_title: reviews[2]?.sub_title || "",
            title: reviews[2]?.title || "",
            items: reviews[2]?.items || [],
            totalPages: reviews[2]?.items.length,
        },
        "cases": {
            sub_title: reviews[1]?.sub_title || "",
            title: reviews[1]?.title || "",
            items: reviews[1]?.items || [],
            totalPages: reviews[1]?.items.length,
        },
        "home": {
            sub_title: reviews[1]?.sub_title || "",
            title: reviews[1]?.title || "",
            items: reviews[1]?.items || [],
            totalPages: reviews[1]?.items.length,
        },
        "smm": {
            sub_title: reviews[1]?.sub_title || "",
            title: reviews[1]?.title || "",
            items: reviews[1]?.items || [],
            totalPages: reviews[1]?.items.length,
        },
        "video-production": {
            sub_title: reviews[0]?.sub_title || "",
            title: reviews[0]?.title || "",
            items: reviews[0]?.items || [],
            totalPages: reviews[0]?.items.length,
        },
    };


    const { sub_title, title, items, totalPages } = paths[pathname] || {};
    const t = useTranslations("Cases");

    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const videoId = useYouTubeId(items[currentPage]?.video)
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    if (!isMounted) return null;
    return (
        <section
            className={cn("", hasBg ? "bg-background-dark mx-5 rounded-lg" : "")}
        >
            <div className="relative px-5 md:px-14 lg:px-32 my-16 md:my-24 overflow-hidden z-10">
                <div className={cn("max-w-[1328px] m-auto", hasBg ? "py-16" : "")}>
                    <div className="flex flex-col md:flex-row justify-between gap-y-5">
                        <div className="space-y-4">
                            {hasSubTitle && sub_title && (
                                <SubTitle className="uppercase lg:text-xl">
                                    {sub_title}
                                </SubTitle>
                            )}
                            <Heading
                                as="h2"
                                className={cn(
                                    "max-w-screen-lg",
                                    hasBg ? "text-graphic-light" : ""
                                )}
                            >
                                {title || t("video")}
                            </Heading>
                        </div>
                        <div className="flex items-end gap-2">
                            <div className="flex items-center gap-x-2">
                                <Button
                                    className={cn(
                                        hasBg
                                            ? "bg-white/30 text-white hover:bg-graphic-gray"
                                            : "bg-background-gray2 hover:bg-graphic-gray"
                                    )}
                                    variant="ghost"
                                    onClick={handlePrev}
                                    disabled={currentPage === 0}
                                >
                                    <ChevronLeft size={18} />
                                </Button>

                                <div
                                    className={cn(
                                        "text-sm whitespace-nowrap",
                                        hasBg ? "text-graphic-light" : ""
                                    )}
                                >
                                    {currentPage + 1}{" "}
                                    <span
                                        className={cn(hasBg ? "text-gray2" : "text-graphic-gray")}
                                    >
                                        / {totalPages}
                                    </span>
                                </div>

                                <Button
                                    className={cn(
                                        hasBg
                                            ? "bg-white/30 text-white hover:bg-graphic-gray"
                                            : "bg-background-gray2 hover:bg-graphic-gray"
                                    )}
                                    variant="ghost"
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages - 1}
                                >
                                    <ChevronRight size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="player-wrapper rounded-md mt-5 md:mt-10">
                        <ReactPlayer
                            fallback={<>Загрузка...</>}
                            url={items[currentPage]?.video || ""}
                            width={"100%"}
                            height={"100%"}
                            controls={true}
                            light={true}
                            playsinline
                            className="react-player"
                        />
                    </div>
                </div>
                {hasBg && (
                    <div>
                        <CompanyInfoSVG className="absolute -z-10 top-44 max-w-[1920px] object-cover" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default ClientReviewList;