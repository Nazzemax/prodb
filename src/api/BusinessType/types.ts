export interface BusinessCard {
  image: string;
  speed?: number;
  text?: string;
}

export interface ParallaxData {
  title?: string;
  businesscards: BusinessCard[];
}
