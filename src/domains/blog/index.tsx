"use client";

import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { RequestHandler } from "@/components/atoms/request-handler";
import { useSlug } from "@/hooks/useSlug";

import { useAppData } from "@/context/app-context";
import { useGetPromotionTypesQuery } from "@/api/Types";
import { useTranslations } from "next-intl";
import { ClientReviewList } from "@/components/organisms/client-review-list";
import { BlogPostList } from "@/components/organisms/blog-post-list";

const BlogPage = () => {
    const t = useTranslations("AboutPage");

    const slug = useSlug();
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug);
    const { data: promotion_types } = useGetPromotionTypesQuery();
    const { business_types } = useAppData();

    const names = {
        title: t("banner.title"),
        btn: t("banner.btn"),
        road: t("banner.road"),
    };

    return (
        <RequestHandler isLoading={isLoading} error={error} data={data}>
            {data && (
                <PageTitleLayout
                    bg_image={data.image}
                    title={data.title}
                    sub_title={data.content}
                    button_text={names.btn}
                    breadcrumb={[
                        { text: "Главная", href: "/home" },
                        { text: "Блог", href: "/blog" },
                    ]}
                />
            )}
            <ClientReviewList hasBg />
            <BlogPostList />
            <FormLayout
                title={"Рассчитайте стоимость услуги"}
                nestedForm={
                    <CostCalculationForm
                        business_types={business_types}
                        promotion_types={promotion_types || []}
                    />
                }
            />
        </RequestHandler>
    );
};

export default BlogPage;
