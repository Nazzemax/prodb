
export interface Article {
    image: string;
    title: string;
    description: string;
    date: string;
    link: string;
}

export interface ArticlesResponse {
    title: string;
    description: string;
    posts: Article[]
}