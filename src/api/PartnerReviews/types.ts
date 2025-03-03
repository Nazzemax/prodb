

export interface PartnersReviewsResponse {
    title: string;
    description: string;
    items: {
        rating: number;
        user_image: string;
        user_name: string;
        user_position: string;
        text: string;
    }[]
}