import AboutPage from "@/domains/about";
import CasesPage from "@/domains/cases";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Кейсы",
};

const Cases = () => {
    return <CasesPage />
}

export default Cases;