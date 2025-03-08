import SiteCreatingPage from "@/domains/services/site-creating"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Создание сайтов",
};

const SiteCreating = () => {
    return <SiteCreatingPage />
}

export default SiteCreating