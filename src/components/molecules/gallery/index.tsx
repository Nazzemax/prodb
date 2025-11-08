import MediaTile from "../../atoms/media-tile";
import type { GalleryImage } from "../../types";

type Props = { images: GalleryImage[]; className?: string };

export default function Gallery({ images, className = "" }: Props) {
    const imgs = images.slice(0, 4); // clamp 0–4
    const count = imgs.length;
    if (!count) return null;

    // Base grid: 1 col on mobile, 2 cols from md
    const gridBase = "grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2";

    return (
        <div className={`${gridBase} ${className}`}>
            {imgs.map((img, i) => {
                // Layout rules:
                // 1 -> single large (span 2)
                // 2 -> two equal
                // 3 -> first spans 2 (hero), others equal
                // 4 -> 2x2
                const span =
          (count === 1 && "md:col-span-2") || (count === 3 && i === 0 && "md:col-span-2") || "";

                return <MediaTile key={`${img.src}-${i}`} src={img.src} alt={img.alt || ''} spanClassName={span} />;
            })}
        </div>
    );
}
