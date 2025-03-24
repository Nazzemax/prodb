import { Post } from "@/api/Post/types";
import { Heading } from "@/components/atoms/heading";
import { SearchInput } from "@/components/atoms/search-input";
import { VideoLoader } from "@/components/atoms/video-loader";
import { CompanyPostItem } from "@/components/molecules/company-post-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Divide } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useMemo, useEffect } from "react";

interface CasesListProps {
    posts: Post[];
}

export const CasesList = ({ posts }: CasesListProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // состояние для загрузки
    const pageSize = 9;
    const t = useTranslations("Cases");

    const tags = [
        { name: t("text.tag1"), tag: t("text.tag1") },
        { name: t("text.tag2"), tag: t("text.tag2") },
        { name: t("text.tag3"), tag: t("text.tag3") },
    ];


    const useDebounce = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
                setIsLoading(false);
            }, delay);

            setIsLoading(true);
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
            const matchesSearch = post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every((tag) => post.tags.some((t) => t.tags === tag));
            return matchesSearch && matchesTags;
        });
    }, [posts, debouncedSearchTerm, selectedTags]);

    const totalPages = Math.ceil(filteredPosts.length / pageSize);
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <section className="max-w-[1920px] mt-16">
            <div className="max-w-[1328px] m-auto px-5">
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-y-5">
                    <div className="space-y-5">
                        <Heading as="h2">{t("text.title")}</Heading>
                        <div className="flex gap-2">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag.name}
                                    variant={'case'}
                                    className={`hover:cursor-pointer ${selectedTags.includes(tag.tag) ? 'bg-background-dark text-white' : ''}`}
                                    onClick={() => toggleTag(tag.tag)}
                                >
                                    {tag.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <SearchInput placeholder={t("text.search")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                {/* POSTS */}
                <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-3 mt-5">
                    {isLoading ? (
                        <div className="col-span-full text-center"><VideoLoader /></div>
                    ) : (
                        paginatedPosts.map((post, idx) => (
                            <CompanyPostItem key={idx} {...post} />
                        ))
                    )}
                </article>
                {paginatedPosts.length < 1 && <div className="flex justify-center items-center min-h-[250px]">По вашему запросу ничего не найдено</div>}

                {/* Pagination */}
                <div className="flex justify-end items-center gap-2 mt-5">
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
        </section>
    );
};
