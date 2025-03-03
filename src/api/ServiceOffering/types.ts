interface Service {
    image: string;
    image_right: boolean;
    title: string;
    description: string;
}

export interface ServiceOfferingResponse {
    title: string;
    items: Service[];
}