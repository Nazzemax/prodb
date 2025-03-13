import { Heading } from "@/components/atoms/heading"


export const BlogPostList = () => {
    return (
        <div className="max-w-[1328px] m-auto">
            <div>
                <Heading as="h2">Статьи</Heading>
                <p className="text-gray2 text-sm md:text-base mt-3">Статьи что помогут вам следить за новостями и нашими работами.</p>
            </div>
        </div>
    )
}