import { StringValidation } from "zod";

//SMM
export interface ISmmCreatingAdData {
  eyebrow?: string;
  title: string;
  sub_title?: string;
  items: {
    image: string;
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

export interface ISmmTeamMembers {
  title: string;
  button?: string;
  items?: {
    image: React.ReactNode;
    number: string;
    title: string;
    isContextAd?: boolean;
    description?: string;
  }[];
}

export interface IDesignBrand {
  design: {
    title1: string;
    subtitle1: string;
    description1: string;
    title2: string;
    description2: string;
  };
}

export type IconProps = {
  color?: string;
  size?: string | number;
  width?: string;
  height?: string;
} & React.SVGAttributes<SVGElement>;

export type Banner = {
  title: string;
  sub_title: string;
  button_text: string;
};
