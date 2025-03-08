import MarketingSupportPage from "@/domains/services/marketing-support";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Комплексное маркетинговое сопровождение",
};

const MarketingSupport = () => {
    return <MarketingSupportPage />
}

export default MarketingSupport;