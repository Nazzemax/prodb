import { Heading } from "@/components/atoms/heading";

interface CaseTaskProps {
    title: string;
    description: string;
}

export const CaseTask = ({
    title,
    description
}: CaseTaskProps) => {
    return (
        <div className="flex flex-wrap lg:flex-nowrap gap-y-2 w-full">
            <Heading
                as="h4"
                className="mb-2 lg:mb-4 font-normal uppercase text-base md:text-lg text-gray2 min-w-[320px]"
            >
                {title}
            </Heading>
            <p className="text-gray2 text-sm md:text-base lg:flex-1 mb-4">
                {description}
            </p>
        </div>
    );
};
