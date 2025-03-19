import { Post } from "@/api/Post/types"
import { Heading } from "@/components/atoms/heading"
import { BreadcrumbProps } from "@/components/templates/page-title-layout/type"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Image from "next/image"
import { memo } from "react"

interface CaseItemHeaderProps {
    post: Post;
    breadcrumb?: BreadcrumbProps[]
}

export const CaseItemHeader = memo(({
    post,
    breadcrumb,
}: CaseItemHeaderProps) => {

    return (
        <div className="max-w-[1920px] pt-12 my-8 md:my-32">
            <div className="max-w-[1280px] m-auto px-5">
                <Breadcrumb>
                    <BreadcrumbList className="">
                        {breadcrumb?.map((item, idx) => (
                            <div
                                key={item.text}
                                className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
                            >
                                <BreadcrumbItem className="text-primary">
                                    {idx !== breadcrumb.length - 1
                                        ? <BreadcrumbLink href={item.href}>{item.text}</BreadcrumbLink>
                                        : <BreadcrumbPage className="text-primary">{item.text}</BreadcrumbPage>
                                    }
                                </BreadcrumbItem>
                                {idx !== breadcrumb.length - 1 && <BreadcrumbSeparator className="text-primary" />}
                            </div>

                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col lg:flex-row mt-5 md:mt-10 gap-8">
                    <div className="space-y-2 md:space-y-5">
                        <div className="flex items-center gap-2 mt-2 text-gray text-sm md:text-base">
                            <span className="text-sm">{post.company_name}</span>
                            <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
                            <span className="text-sm">{post.created_at}</span>
                        </div>
                        <Heading as="h3" className="text-[32px] leading-8">{post.title}</Heading>
                    </div>
                    <div className="relative rounded-md group">
                        <Image
                            src={post.image}
                            alt={post.company_name}
                            width={535}
                            height={400}
                            className="rounded-2xl object-cover md:min-w-[400px]"
                        />
                        <div className="absolute top-7 max-w-[500px] left-6 flex gap-2 flex-wrap">
                            {post.tags.map((tag) => (
                                <Badge variant={'post'} className="text-sm" key={tag.tags}>
                                    {tag.tags}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})


CaseItemHeader.displayName = 'CaseItemHeader';