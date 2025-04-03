
import Link from 'next/link'
import { ButtonWithIcon } from '@/components/atoms/button-with-icon'
import { Heading } from '@/components/atoms/heading'
import { CompanyPostItem } from '@/components/molecules/company-post-item'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { FC } from 'react';
import { getCompanyPosts } from '@/api/Company'

interface CompanyPostListProps {
    title?: string;
}

const CompanyPostList: FC<CompanyPostListProps> = async ({ title }) => {
    const data = await getCompanyPosts();
    const t = await getTranslations("ThreePost");
    const mobilePosts = data?.items.slice(0, 3);

    return (
        <div className="w-full overflow-hidden py-20 bg-background-gray">
            <div className="max-w-[1328px] m-auto flex flex-col lg:flex-row lg:justify-between gap-5 mb-8 px-5">
                <Heading as="h2" className={cn(title ? 'w-full max-w-[1186px]' : 'lg:w-3/4 w-full max-w-[1186px] lg:text-4xl xl:text-5xl')}>{title ? title : data?.title}</Heading>
                <Link href="/cases" className="flex items-end">
                    <ButtonWithIcon variant="feature">{t('btn')}</ButtonWithIcon>
                </Link>
            </div>
            <div className="px-0">
                <Carousel
                    opts={{
                        align: "end",
                    }}
                    className="hidden md:flex max-w-[1328px] m-auto px-5"
                >
                    <CarouselContent className="gap-4">
                        {data?.items.map((post, idx) => (
                            <CarouselItem key={idx} className="md:basis-1/2 xl:basis-5/12">
                                <CompanyPostItem {...post} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="flex flex-col md:hidden px-5">
                    {mobilePosts?.map((post, idx) => (
                        <CompanyPostItem key={idx} {...post} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CompanyPostList;