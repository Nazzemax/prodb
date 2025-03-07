import VideoProductionPage from "@/domains/services/video-production"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Digital продвижение",
};

const VideoProduction = () => {
    return <VideoProductionPage />
}

export default VideoProduction