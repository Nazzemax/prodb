"use client";

import { baseUrl } from "@/api/Base/baseApi";
import { ArticleListItem, ArticleListResponse } from "@/api/Article/types";
import { Heading } from "@/components/atoms/heading";
import { SearchInput } from "@/components/atoms/search-input";
import { VideoLoader } from "@/components/atoms/video-loader";
import { BlogPostItem } from "@/components/molecules/blog-post-item";
import { Badge } from "@/components/ui/badge";
import { useLocale, useTranslations } from "next-intl";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { FeedbackButton } from "@/components/atoms/feedback-button";
import { normalizeTagLabels } from "@/lib/tag-utils";
import { useAppData } from "@/context/app-context";
import mergeRefs from "@/lib/utils";

interface ArticleListProps {
    initialData: ArticleListResponse;
}

const resolveAbsoluteUrl = (value?: string | null) => {
    if (!value) return null;
    if (value.startsWith("http://") || value.startsWith("https://")) {
        return value;
    }
    if (value.startsWith("/")) {
        return `${baseUrl}${value}`;
    }
    return `${baseUrl}/${value}`;
};

export const ArticleList = forwardRef<HTMLDivElement, ArticleListProps>(
    ({ initialData }, ref) => {
        const locale = useLocale();
        const t = useTranslations("Cases");
        const tt = useTranslations("BlogArticle");
        const { articleListRef } = useAppData();
        const refs = mergeRefs<HTMLDivElement>(ref, articleListRef);
        const [searchTerm, setSearchTerm] = useState("");
        const [selectedTags, setSelectedTags] = useState<string[]>([]);
        const [posts, setPosts] = useState<ArticleListItem[]>(initialData?.results ?? []);
        const [nextUrl, setNextUrl] = useState<string | null>(initialData?.next ?? null);
        const [isFiltering, setIsFiltering] = useState(false);
        const [isLoadingMore, setIsLoadingMore] = useState(false);
        const [loadError, setLoadError] = useState<string | null>(null);

        useEffect(() => {
            setPosts(initialData?.results ?? []);
            setNextUrl(initialData?.next ?? null);
            setLoadError(null);
            setIsLoadingMore(false);
        }, [initialData]);

        const tags = useMemo(() => {
            const unique = new Set<string>();

            posts.forEach((post) => {
                normalizeTagLabels(post.tags).forEach((label) => unique.add(label));
            });

            return Array.from(unique);
        }, [posts]);

        const useDebounce = (value: string, delay: number) => {
            const [debouncedValue, setDebouncedValue] = useState(value);

            useEffect(() => {
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                    setIsFiltering(false);
                }, delay);

                setIsFiltering(true);
                return () => {
                    clearTimeout(handler);
                };
            }, [value, delay]);

            return debouncedValue;
        };

        const debouncedSearchTerm = useDebounce(searchTerm, 500);

        const toggleTag = (tag: string) => {
            setSelectedTags((prev) =>
                prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
            );
        };

        const filteredPosts = useMemo(() => {
            return posts.filter((post) => {
                const postTags = normalizeTagLabels(post.tags);
                const matchesSearch = post.title
                    .toLowerCase()
                    .includes(debouncedSearchTerm.toLowerCase());
                const matchesTags =
                    selectedTags.length === 0 ||
                    selectedTags.every((tag) => postTags.includes(tag));
                return matchesSearch && matchesTags;
            });
        }, [posts, debouncedSearchTerm, selectedTags]);

        const hasMore = Boolean(nextUrl);

        const handleLoadMore = useCallback(async () => {
            if (!nextUrl || isLoadingMore) return;
            setLoadError(null);
            setIsLoadingMore(true);

            try {
                const url = resolveAbsoluteUrl(nextUrl);
                if (!url) {
                    setNextUrl(null);
                    return;
                }

                const response = await fetch(url, {
                    headers: {
                        "Accept-Language": locale,
                    },
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error(`Failed to load more articles: ${response.statusText}`);
                }

                const payload: ArticleListResponse = await response.json();

                setPosts((prev) => {
                    const existing = new Set(prev.map((post) => post.slug));
                    const nextPosts =
                        payload.results?.filter((post) => !existing.has(post.slug)) ?? [];
                    return [...prev, ...nextPosts];
                });
                setNextUrl(payload.next ?? null);
            } catch (error) {
                console.error(error);
                setLoadError(t("text.loadMoreError"));
            } finally {
                setIsLoadingMore(false);
            }
        }, [nextUrl, isLoadingMore, locale, t]);

        return (
            <section ref={refs} id="article-list" className="max-w-[1920px] mt-24 mb-24">
                <div className="max-w-[1328px] m-auto px-5">
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-y-5">
                        <div className="space-y-5">
                            <Heading as="h2">{tt("article")}</Heading>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant={"case"}
                                        className={`w-fit hover:cursor-pointer ${selectedTags.includes(tag) ? "bg-background-dark text-white" : ""
                                        }`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <SearchInput
                            placeholder={t("text.search")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-7 gap-y-3 mt-5">
                        {isFiltering ? (
                            <div className="col-span-full text-center">
                                <VideoLoader />
                            </div>
                        ) : (
                            filteredPosts.map((post) => (
                                <BlogPostItem key={post.slug} {...post} />
                            ))
                        )}
                    </article>
                    {!isFiltering && filteredPosts.length < 1 && (
                        <div className="flex justify-center items-center min-h-[250px]">
                            {tt("notFound")}
                        </div>
                    )}
                    {loadError && (
                        <p className="text-center text-destructive mt-6">{loadError}</p>
                    )}
                    {hasMore && (
                        <div className="flex justify-center mt-10">
                            <FeedbackButton
                                button_text={isLoadingMore ? t("text.loading") : t("text.loadMore")}
                                onClick={handleLoadMore}
                                disabled={isLoadingMore}
                                variant="iconless"
                            />
                        </div>
                    )}
                </div>
            </section>
        );
    }
);

ArticleList.displayName = "ArticleList";
