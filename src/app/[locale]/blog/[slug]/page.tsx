import { getArticleBySlug, getArticles, getSimilarArticles } from "@/api/Article";
import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { BlogItemHeader } from "@/components/molecules/blog-item-header";
import SimilarArticlesList from "@/components/organisms/similar-articles-list";
import { normalizeTagIds, normalizeTagLabels } from "@/lib/tag-utils";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
    const params = await props.params;
    const data = await getArticleBySlug(params.slug);

    return {
        title: data?.title || "Blog article",
    };
}

const BlogsPage = async (props: { params: Params }) => {
    const params = await props.params;
    const article = await getArticleBySlug(params.slug);
    const t = await getTranslations("BlogArticle");

    const tagIds = normalizeTagIds(article?.tags);

    let similarPosts = tagIds.length
        ? await getSimilarArticles(params.slug, tagIds, 3)
        : [];

    if (!similarPosts.length) {
        const articlesList = await getArticles({ page_size: 12 });
        const currentTags = normalizeTagLabels(article?.tags);

        similarPosts =
            articlesList?.results
                ?.filter((post) => post.slug !== article?.slug)
                .filter((post) =>
                    post.tags?.some((tag) => tag.tags && currentTags.includes(tag.tags))
                )
                .slice(0, 3) ?? [];
    }

    return (
        <>
            {article && (
                <BlogItemHeader
                    post={article}
                    breadcrumb={[
                        { text: t("back"), href: "/blog" },
                        { text: article.title, href: `/blog/${article.slug}` },
                    ]}
                />
            )}

            {similarPosts.length > 0 && (
                <SimilarArticlesList
                    posts={similarPosts}
                    title={t("similarTitle")}
                    ctaLabel={t("allArticles")}
                />
            )}
            <div className="flex justify-center mb-24">
                <a href="/blog">
                    <ButtonWithIcon>{t("back")}</ButtonWithIcon>
                </a>
            </div>
        </>
    );
};

export default BlogsPage;
