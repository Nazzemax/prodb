

export interface MarketingDepartmentResponse {
    title: string;
    sub_title: string;
    chapters: { number: string; title: string; }[]
}

export interface MarketingSupportResponse {
    title: string;
    description: string;
    items: {
        logo: string;
        title: string;
        description: string;
        video: string;
    }[]
}