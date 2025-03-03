export interface CompanyAchievementsResponse {
    title: string;
    sub_title: string;
    items: { title: string; sub_title: string; }[]
}

export interface CompanyAdvertisingResponse {
    title: string;
    sub_title: string;
    items: { image: string; }[];
}

export interface CompanyApplicationsResponse {
    applications: CompanyApplicationResponse[]
}

export interface CompanyApplicationResponse {
    id: number;
    title: string;
    sub_title: string;
}

export interface CompanyBrandingResponse {
    title: string;
    sub_title: string;
    sub_title_2: string;
    items: { image: string }[]
}

export interface CompanyChallengesResponse {
    title: string;
    items: { logo: string; title: string; description: string; }[]
}

export interface CompanyFeaturesResponse {
    title: string;
    items: {
        image: string;
        image_right: boolean;
        title: string;
        sub_title: string;
        description: string;
        tags: { tags: string; }[]
    }[]
}

export interface CompanyInfoResponse {
    logo: string;
    description: string;
    whatsapp_logo: string;
    whatsapp_link: string;
    whatsapp_text: string;
    work_time: string;
    video: string;
    addresses: { title: string; address: string }[];
    phones: { title: string; phone: string; }[];
    emails: { title: string; email: string; }[];
    social_networks: { logo: string; link: string; }[];
}

export interface CompanyPartnersResponse {
    title: string;
    items: { company_name: string; company_logo: string; }[]
}

export interface CompanyPostsResponse {
    title: string;
    items: {
        id: number;
        image: string;
        title: string;
        company_name: string;
        created_at: string;
        tags: { tags: string; }[];
        social_media: { title: string; logo: string; subscribers: string; }[]
    }[]
}

export interface CompanyServicesResponse {
    title: string;
    items: { 
        title: string; 
        image: string;
        tags: { tags: string; }[]
        href?: string;
    }[];
}

export interface CompanyTeamResponse {
    title: string;
    sub_title: string;
    items: { name: string; position: string; image: string; }[];
}

export interface CompanyVideoReviewsResponse {
    title: string;
    sub_title: string;
    items: { video: string; }[];
}