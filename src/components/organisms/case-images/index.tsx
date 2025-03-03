import { Heading } from "@/components/atoms/heading";
import { CaseImageItem } from "@/components/molecules/case-image-item";

interface CaseImagesProps {
    images: { title: string; image: string; description: string; }[];
}

export const CaseImages = ({
    images,
}: CaseImagesProps) => {
    return (
        <article className="max-w-[1120px] m-auto my-8 md:my-16 px-5 flex flex-col lg:flex-row gap-y-5 w-full">
            <Heading as="h4" className="font-normal uppercase text-base md:text-lg text-gray2 min-w-[320px]">{images[0]?.title}</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {images.map((image) => (
                    <CaseImageItem
                        key={image.image} 
                        image={image.image} 
                        description={image.description}                        
                    />
                    
                ))}
            </div>
        </article>
    )
}
