import BlogPage from "@/domains/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Наш личный блог",
};

const Blog = () => {
    return <BlogPage />
}

export default Blog;