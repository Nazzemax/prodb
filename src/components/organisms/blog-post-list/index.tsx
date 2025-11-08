"use client";

import { ArticleListResponse } from "@/api/Article/types";
import { Heading } from "@/components/atoms/heading";
import { BlogPostItem } from "@/components/molecules/blog-post-item";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

interface BlogPostListProps {
    data: ArticleListResponse | null;
}

const BlogPostList = ({ data }: BlogPostListProps) => {
    const t = useTranslations("BlogPage");
    const pageSize = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const articles = useMemo(() => data?.results ?? [], [data]);
    const totalCount = data?.count ?? articles.length;
    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(articles.length / pageSize)),
        [articles.length]
    );

    const paginatedPosts = useMemo(
        () =>
            articles.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
            ),
        [articles, currentPage, pageSize]
    );

    const handleNext = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    useEffect(() => {
        setCurrentPage((prev) => Math.min(prev, totalPages));
    }, [totalPages]);

    if (!data) return null;

    return (
        <div className="max-w-[1328px] flex flex-col m-auto px-5 mb-10 min-h-[944px]">
            <div>
                <Heading className="pt-8" as="h2">
                    {t("title")}
                </Heading>
                <p className="text-gray2 text-sm md:text-base mt-3">
                    {t("sub_title")}
                </p>
            </div>
            <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 mt-10 mb-10">
                {paginatedPosts.map((card) => (
                    <BlogPostItem
                        key={card.slug}
                        title={card.title}
                        description={card.description}
                        photo={card.photo}
                        date={card.date}
                        slug={`/blog/${card.slug}`} 
                        title_seo={card.title_seo} 
                        description_seo={card.description_seo} 
                        keywords_seo={card.keywords_seo} 
                        tags={card.tags}                    />
                ))}
            </article>
          
            <div className="flex justify-between items-center mt-auto">
                <span className="text-gray2">
                    {t("totalPosts")} {totalCount}
                </span>
                <div className="flex justify-end items-center gap-2">
                    <Button
                        className="bg-background-gray2 hover:bg-graphic-gray"
                        variant="ghost"
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft />
                    </Button>

                    <div className="text-sm whitespace-nowrap">
                        {currentPage}{" "}
                        <span className="text-graphic-gray">/ {totalPages}</span>
                    </div>

                    <Button
                        className="bg-background-gray2 hover:bg-graphic-gray"
                        variant="ghost"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BlogPostList;
