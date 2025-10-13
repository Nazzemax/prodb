import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import FormLayout from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import { getStaticPageBySlug } from "@/api/StaticPages";

import ClientReviewList from "@/components/organisms/client-review-list";
import BlogPostList from "@/components/organisms/blog-post-list";
import { getTranslations } from "next-intl/server";
import { getArticles } from "@/api/Article";
import { getPromotionTypes } from "@/api/Types";

export const revalidate = 60;

const BlogPage = async () => {
    const [data, t, promotion_types, articles] = await Promise.all([
        getStaticPageBySlug("blog"),
        getTranslations("AboutPage"),
        getPromotionTypes(),
        getArticles(),
    ]);

    const names = {
        title: t("banner.title"),
        btn: t("banner.btn"),
        road: t("banner.road"),
    };

    return (
        <>
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
            <BlogPostList data={articles} />
            <FormLayout
                nestedForm={
                    <CostCalculationForm
                        promotion_types={promotion_types || []}
                    />
                }
            />
        </>
    );
};

export default BlogPage;
