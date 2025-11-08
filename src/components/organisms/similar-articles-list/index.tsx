"use client";

import { ArticleListItem } from "@/api/Article/types";
import { Heading } from "@/components/atoms/heading";
import { BlogPostItem } from "@/components/molecules/blog-post-item";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SimilarArticlesListProps {
    posts: ArticleListItem[];
    title?: string;
    ctaLabel?: string;
    ctaHref?: string;
    limit?: number;
}

export const SimilarArticlesList = ({
    posts,
    title = "Related articles",
    ctaLabel,
    ctaHref = "/blog",
    limit = 3,
}: SimilarArticlesListProps) => {
    if (!posts?.length) {
        return null;
    }

    const items = posts.slice(0, limit);

    return (
        <section className="w-full bg-background-gray py-14 mb-24">
            <div className="max-w-[1328px] m-auto px-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                    <Heading as="h2">{title}</Heading>
                    {ctaLabel && (
                        <Link
                            href={ctaHref}
                            className="text-accent text-sm font-medium flex items-center gap-2"
                        >
                            {ctaLabel}
                            <ArrowRight size={16} />
                        </Link>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((post) => (
                        <BlogPostItem key={post.slug} {...post} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SimilarArticlesList;
