import AboutPage from "@/domains/about";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "О компании Bold Brands",
    description: "Информация о компании Bold Brands"
};

const About = () => {
    return <AboutPage />
}

export default About;