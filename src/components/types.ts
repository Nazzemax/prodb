export type HtmlSanitizer = (html: string) => string;

export type GalleryImage = {
  src: string | null;
  alt?: string | null;
  width?: number;   // optional (useful if you add blurDataURL later)
  height?: number;  // optional
  priority?: boolean;
};
