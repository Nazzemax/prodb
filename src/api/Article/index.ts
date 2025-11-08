import { getLocale } from "next-intl/server";
import { fetchData } from "../Base/baseApi";
import {
    Article,
    ArticleListParams,
    ArticleListResponse
} from "./types";

const buildArticlesQuery = (params: ArticleListParams = {}) => {
    const searchParams = new URLSearchParams();

    if (params.page) {
        searchParams.set("page", params.page.toString());
    }

    if (params.page_size) {
        searchParams.set("page_size", params.page_size.toString());
    }

    if (params.search) {
        searchParams.set("search", params.search);
    }

    if (params.tags?.length) {
        params.tags.forEach((tag) => searchParams.append("tags", tag.toString()));
    }

    const query = searchParams.toString();
    return query ? `?${query}` : "";
};

export async function getArticles(
    params: ArticleListParams = {},
    cache?: RequestCache
) {
    const locale = await getLocale();
    const query = buildArticlesQuery(params);

    return fetchData<ArticleListResponse>(`/blog/${query}`, locale, cache);
}

export async function getArticleBySlug(slug: string, cache?: RequestCache) {
    const locale = await getLocale();
    return fetchData<Article>(`/blog/${encodeURIComponent(slug)}/`, locale, cache);
}

export async function getSimilarArticles(
    slug: string,
    tagIds: number[] = [],
    limit = 3,
    cache?: RequestCache
) {
    if (!tagIds.length) {
        return [];
    }

    const data = await getArticles(
        {
            tags: tagIds,
            page_size: limit + 1,
        },
        cache
    );

    return (
        data?.results
            ?.filter((article) => article.slug !== slug)
            .slice(0, limit) ?? []
    );
}

// Backward compatibility for existing imports
export const getArticlesBySlug = getArticleBySlug;
