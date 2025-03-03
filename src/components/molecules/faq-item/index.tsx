import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqItemProps {
    question: string;
    answer: string;
}

export const FaqItem = ({
    question,
    answer
}: FaqItemProps) => {
    return (
        <AccordionItem className="bg-background rounded-md hover:shadow-md transition-all duration-200" value={question}>
            <AccordionTrigger
                className="rounded-md px-8 py-4 text-lg md:text-2xl text-start border-none font-bold"
                title={question}
            >
                {question}
            </AccordionTrigger>
            <AccordionContent className="text-gray2 px-8">
                {answer}
            </AccordionContent>
        </AccordionItem>
    )
}