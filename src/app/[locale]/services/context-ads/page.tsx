import ContextAdsPage from "@/domains/services/context-ad";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Контекстная реклама",
};

const ContextAds = () => {
    return <ContextAdsPage />
}

export default ContextAds;