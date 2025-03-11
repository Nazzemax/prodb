// src/api/types.ts
export interface BannerText {
    text: string;
    link: string;
  }
  
export interface Banner {
    title: string;
    sub_title: string;
    button_text: string;
    image: string;
    is_active: boolean;
    banner_text: BannerText | null; 
  }
  