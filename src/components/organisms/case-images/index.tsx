import { Heading } from "@/components/atoms/heading";
import { CaseImageItem } from "@/components/molecules/case-image-item";

interface CaseImagesProps {
    images: {
        title: string;
        image: string[]; // Updated: image is now an array of strings
        description: string;
    }[];
}

export const CaseImages = ({ images }: CaseImagesProps) => {
    return (
        <article className="max-w-[1280px] m-auto my-8 md:my-16 px-5 flex flex-col lg:flex-row gap-y-5 w-full">
            <Heading as="h4" className="font-normal uppercase text-base md:text-lg text-gray2 min-w-[320px]">
                {images[0]?.title}
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-5 gap-y-10">
                {images?.map((item, idx) => (
                    <CaseImageItem
                        key={idx}
                        image={item.image[0]}
                        description={item.description}
                    />
                ))}
            </div>
        </article>
    );
};