import Image from "next/image";

interface CaseImageItemProps {
    image: string;
    description: string;
}

export const CaseImageItem = ({
    image,
    description
}: CaseImageItemProps) => {
    console.log(image)
    return (
        <div className="flex flex-col gap-y-5">
            {image && (
                <Image
                    src={image}
                    alt={image}
                    width={480}
                    height={400}
                    className="w-auto min-h-[400px] max-h-[400px] max-w-[480px]"
                />
            )}
            {!image && <div className="bg-background-gray2 w-full h-[330px] md:h-[400px] rounded-md" />}
            <p className="text-gray2 text-sm md:text-base">{description}</p>
        </div>
    )
}
