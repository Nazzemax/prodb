import Image from "next/image";

interface CaseImageItemProps {
    image: string;
    description: string;
}

export const CaseImageItem = ({
    image,
    description
}: CaseImageItemProps) => {
    return (
        <div className="flex flex-col gap-y-5">
            {/* Отсутствует фото в бд, Поставил загрушку */}
            {/* <Image
                src={image}
                alt={image}
                width={480}
                height={400}
                className="w-auto h-auto"
            /> */}
            <div className="bg-background-gray2 w-full h-[330px] md:h-[400px] rounded-md" />
            <p className="text-gray2 text-sm md:text-base">{description}</p>
        </div>
    )
}
