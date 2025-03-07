import AboutPage from "@/domains/about";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "О нас",
};

const About = () => {
    return <AboutPage />
}

export default About;