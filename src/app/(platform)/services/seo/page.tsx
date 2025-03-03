import SeoPage from "@/domains/services/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SEO оптимизация",
};

const Seo = () => {
    return <SeoPage />
}

export default Seo