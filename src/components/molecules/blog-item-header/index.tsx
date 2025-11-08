import { ArticleDetail } from "@/api/Article/types"
import { Heading } from "@/components/atoms/heading"
import ProseHtml from "@/components/atoms/prose-html"
import TextWithGallery from "@/components/organisms/text-with-gallery"
import { BreadcrumbProps } from "@/components/templates/page-title-layout/type"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Image from "next/image"
import { memo } from "react"
import { normalizeTagLabels } from "@/lib/tag-utils"


interface CaseItemHeaderProps {
    post: ArticleDetail;
    breadcrumb?: BreadcrumbProps[]
}

export const BlogItemHeader = memo(({
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
                <div className="flex flex-col mt-5 md:mt-10 gap-8">
                    <div className="space-y-2 md:space-y-5">
                        <div className="flex items-center gap-2 mt-2 text-gray text-sm md:text-base">
                            <span className="text-sm">{post.date}</span>
                        </div>
                        <Heading as="h3" className="text-[32px] leading-8">{post.title}</Heading>
                    </div>
                    <div className="relative rounded-md group">
                        <Image
                            src={post.photo}
                            alt={post.title}
                            width={535}
                            height={400}
                            className="rounded-2xl object-cover md:min-w-[320px] w-full min-h-[320px] max-h-[436px]"
                        />
                        <div className="absolute top-7 max-w-[500px] left-6 flex gap-2 flex-wrap">
                            {normalizeTagLabels(post.tags).map((label) => (
                                <Badge variant={'post'} className="text-sm" key={label}>
                                    {label}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <ProseHtml html={post.description} />
                    <section className={`w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6`}>
                        <TextWithGallery title={post.sub_title} bodyHtml={post.sub_description || ''} images={[
                            {src: post.sub_photo1 || null, alt: post.sub_photo1 || null},
                            {src: post.sub_photo2 || null, alt: post.sub_photo2 || null},
                            {src: post.sub_photo3 || null, alt: post.sub_photo3 || null},
                            {src: post.sub_photo4 || null, alt: post.sub_photo4 || null}
                        ]} />
                    </section>
                </div>
            </div>
        </div>
    )
})


BlogItemHeader.displayName = 'blogItemHeader';
