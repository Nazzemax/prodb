import BlogPage from "@/domains/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Наш личный блог",
};

const Blog: React.FC = () => {
  return <BlogPage />;
};

export default Blog;
