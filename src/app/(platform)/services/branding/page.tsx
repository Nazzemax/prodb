import { Metadata } from "next";
import BrandingPage from "@/domains/services/branding"


export const metadata: Metadata = {
    title: "Брендинг",
};

const Branding = () => {
    return <BrandingPage />
}

export default Branding