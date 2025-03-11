"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import React, { useState } from "react";
import AboutUsSVG from "@/assets/company-info/about_us.svg";
import MobileAboutUsSVG from "@/assets/company-info/mobile_about_us.svg";
import { useAppData } from "@/context/app-context";
import ReactPlayer from "react-player";
import { VideoLoader } from "@/components/atoms/video-loader";

export const VideoAboutCompany = () => {
    const { data } = useAppData();
    const [showVideo, setShowVideo] = useState(false);
    const [play, setPlay] = useState(false);

    const onClickVideo = () => {
        setShowVideo(true);
    
    };

    return (
        <div className="relative mt-8">
            {!showVideo ? (
                <div className="h-[400px] md:h-screen bg-[url('/images/main_page/video_bg.webp')] bg-cover bg-center flex justify-center items-center">
                    <Button
                        onClick={onClickVideo}
                        variant={"clean"}
                        size={"clean"}
                        className="z-20 p-[22px] md:p-[70px] rounded-full bg-black/30 backdrop-blur-sm shadow-md cursor-pointer hover:shadow-2xl transition-all duration-200"
                    >
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Play
                                size={20}
                                color="#ffffff"
                                style={{ width: "64px", height: "64px" }}
                            />
                        </motion.div>
                    </Button>
                    <motion.div
                        className="absolute"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        <AboutUsSVG className="hidden md:block" />
                        <MobileAboutUsSVG className="md:hidden" />
                    </motion.div>
                </div>
            ) : (
                <div className="max-w-[1920px] h-[400px] md:h-[700px] mx-2 md:mx-0">
                    <ReactPlayer
                        onReady={() => setPlay(true)}
                        key={data?.video}
                        fallback={<VideoLoader />}
                        playing={play}
                        url={data?.video}
                        width={"100%"}
                        height={"100%"}
                        controls={true}
                        playsinline
                        className="react-player-about"
                    />
                </div>
            )}
        </div>
    );
};
