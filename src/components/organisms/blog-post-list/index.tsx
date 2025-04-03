"use client";

import { ArticlesResponse } from "@/api/Article/types";
import { Heading } from "@/components/atoms/heading"
import { BlogPostItem } from "@/components/molecules/blog-post-item"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface BlogPostListProps {
    data: ArticlesResponse;
}

const BlogPostList = ({ data: articles }: BlogPostListProps) => {
    const t = useTranslations("BlogPage")
    const pageSize = 12;
    const [currentPage, setCurrentPage] = useState(1);

    if(!articles) return

    const totalPages = Math.ceil(articles?.posts?.length / pageSize);
    const paginatedPosts = articles?.posts?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className="max-w-[1328px] flex flex-col m-auto px-5 mb-10 min-h-[944px]">
            <div>
                <Heading className="pt-8" as="h2">{articles.title}</Heading>
                <p className="text-gray2 text-sm md:text-base mt-3">{articles.description}</p>
            </div>
            <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 mt-10 mb-10">
                {paginatedPosts.map((card) => (
                    <BlogPostItem
                        key={card.title}
                        {...card}
                    />
                ))}
            </article>
            {paginatedPosts.length < 1 && <div className="flex justify-center items-center min-h-[250px]">По вашему запросу ничего не найдено</div>}
            <div className="flex justify-between items-center mt-auto">
                <span className="text-gray2">{t("totalPosts")} {articles.posts.length}</span>
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
                        {currentPage} <span className="text-graphic-gray">/ {totalPages}</span>
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
    )
}

export default BlogPostList;