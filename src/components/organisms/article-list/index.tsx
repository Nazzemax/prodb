\"use client\";

import { ArticleListItem, ArticleListResponse } from \"@/api/Article/types\";
import { Heading } from \"@/components/atoms/heading\";
import { SearchInput } from \"@/components/atoms/search-input\";
import { VideoLoader } from \"@/components/atoms/video-loader\";
import { BlogPostItem } from \"@/components/molecules/blog-post-item\";
import { Badge } from \"@/components/ui/badge\";
import { Button } from \"@/components/ui/button\";
import { normalizeTagLabels } from \"@/lib/tag-utils\";
import { ChevronLeft, ChevronRight } from \"lucide-react\";
import { useTranslations } from \"next-intl\";
import { useEffect, useMemo, useState } from \"react\";

interface ArticleListProps {
    initialData: ArticleListResponse;
}

export const ArticleList = ({ initialData }: ArticleListProps) => {
    const t = useTranslations(\"Cases\");
    const [searchTerm, setSearchTerm] = useState(\"\");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [posts, setPosts] = useState<ArticleListItem[]>(initialData?.results ?? []);
    const [isFiltering, setIsFiltering] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    useEffect(() => {
        setPosts(initialData?.results ?? []);
        setCurrentPage(1);
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
        setCurrentPage(1);
    };

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const postTags = normalizeTagLabels(post.tags);
            const matchesSearch = post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every((tag) => postTags.includes(tag));
            return matchesSearch && matchesTags;
        });
    }, [posts, debouncedSearchTerm, selectedTags]);

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <section className=\"max-w-[1920px] mt-24 mb-24\">
            <div className=\"max-w-[1328px] m-auto px-5\">
                <div className=\"flex flex-col md:flex-row justify-between md:items-end gap-y-5\">
                    <div className=\"space-y-5\">
                        <Heading as=\"h2\">{t(\"text.title\")}</Heading>
                        <div className=\"flex flex-wrap gap-2\">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant=\"case\"
                                    className={w-fit hover:cursor-pointer }
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <SearchInput
                        placeholder={t(\"text.search\")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <article className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-7 gap-y-3 mt-5\">
                    {isFiltering ? (
                        <div className=\"col-span-full text-center\">
                            <VideoLoader />
                        </div>
                    ) : (
                        paginatedPosts.map((post) => (
                            <BlogPostItem key={post.slug} {...post} />
                        ))
                    )}
                </article>
                {!isFiltering && filteredPosts.length < 1 && (
                    <div className=\"flex justify-center items-center min-h-[250px]\">
                        ???? ??????????? ?????????????? ????????? ???? ?????????????
                    </div>
                )}
                {filteredPosts.length > pageSize && (
                    <div className=\"flex justify-center items-center gap-2 mt-8\">
                        <Button
                            className=\"bg-background-gray2 hover:bg-graphic-gray\"
                            variant=\"ghost\"
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft />
                        </Button>
                        <div className=\"text-sm whitespace-nowrap\">
                            {currentPage} <span className=\"text-graphic-gray\">/ {totalPages}</span>
                        </div>
                        <Button
                            className=\"bg-background-gray2 hover:bg-graphic-gray\"
                            variant=\"ghost\"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};
