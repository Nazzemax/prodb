export interface VideoProductionResponse {
    title: string;
    description: string;
    items: {
        video: string;
        logo: string;
        title: string;
        description: string;
    }[];
}