import ProseHtml from "../../atoms/prose-html";
import Gallery from "../../molecules/gallery";
import type { GalleryImage, HtmlSanitizer } from "../../types";
import { sanitizeCkHtml } from "@/lib/sanitizeCkHtml";

type Props = {
    title?:string;
  bodyHtml?: string;
  sanitize?: HtmlSanitizer;
  images?: GalleryImage[];
  className?: string;
};

export default function TextWithGallery({
    bodyHtml: html = "",
    title: title = "",
    sanitize = sanitizeCkHtml,
    images = [],
    className = "",
}: Props) {
    const hasImages = images.length > 0;

    return (
        <div className={`grid items-start gap-6 md:gap-8 md:grid-cols-12 ${className}`}>
            <article className="md:col-span-6">
                {title && (
                    <h2 className="text-slate-900 text-xl sm:text-2xl font-semibold leading-snug mb-4">
                        {title}
                    </h2>
                )}

                <ProseHtml html={html} sanitize={sanitize} />
            </article>

            {hasImages && (
                <aside className="md:col-span-6">
                    <Gallery images={images} />
                </aside>
            )}
        </div>
    );
}
