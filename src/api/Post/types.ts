
export interface Post {
    id: number;
    image: string;
    title: string;
    company_name: string;
    created_at: string;
    tags: { tags: string; }[]
    social_media: { title: string; logo: string; subscribers: string; }[]
    tasks?: { title: string; description: string; }[]
    images?: { title: string; image: string; description: string; }[]
    results?: { header: string; title: string; description: string; }[]
    target?: { title: string; description: string; }[]
}

export interface PostsResponse {
    count: number;
    next: string;
    previous: string;
    results: Post[];
}