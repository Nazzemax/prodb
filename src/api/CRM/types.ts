

export interface CRMServiceResponse {
    title: string;
    items: {
        image: string;
        image_right: boolean;
        title: string;
        tags: { tags: string; }[]
    }[]
} 