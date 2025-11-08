
export interface ArticleListParams {
    page?: number;
    page_size?: number;
    search?: string;
    tags?: number[];
}

export interface ArticleListItem {
    photo: string;
    date: string;
    title: string;
    description: string;
    title_seo: string;
    description_seo: string;
    keywords_seo: string;
    slug: string;
    tags: Tag[];
}

export interface ArticleListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ArticleListItem[];
}

export interface ArticleDetail extends ArticleListItem {
    sub_title?: string;
    sub_description?: string;
    sub_photo1?: string;
    sub_photo2?: string;
    sub_photo3?: string;
    sub_photo4?: string;
    content?: string;
    body?: string;
    lead?: string;
    views?: number;
    read_time_minutes?: number;
}

export interface Tag {
    id?: number;
    tags: string;
}

export type ArticleResponse = ArticleListResponse;
export type Article = ArticleDetail;
