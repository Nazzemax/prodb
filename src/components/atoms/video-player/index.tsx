import { Button } from "@/components/ui/button";
import { Pause, Play, Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { VideoLoader } from "../video-loader";

export const VideoPlayer = ({ video, controls }: { video: string; controls: boolean }) => {
    const playerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const currentRef = playerRef.current; // Сохраняем ссылку в локальную переменную
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (entry.isIntersecting) {
                    setIsPlaying(true);
                } else {
                    setIsPlaying(false);
                }
            },
            {
                root: null,
                threshold: 0.8,
            }
        );
    
        if (currentRef) {
            observer.observe(currentRef);
        }
    
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []); // Зависимости остаются пустыми, так как ref должен сохранять свою идентичность
    
    return (
        <div
            ref={playerRef}
            className="relative w-full h-full overflow-hidden rounded-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <ReactPlayer
                url={video}
                fallback={<VideoLoader />}
                controls={controls}
                playing={isVisible && isPlaying}
                muted={isMuted}
                playsinline
                width="100%"
                height="100%"
            />
            {/* Блок кнопок управления */}
            <div
                className={`absolute bottom-4 right-4 space-x-2 transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                }`}
            >
                <Button onClick={handleToggleMute}>
                    {isMuted ? <VolumeOff /> : <Volume2 />}
                </Button>
                <Button onClick={handleTogglePlaying}>
                    {isPlaying ? <Pause /> : <Play />}
                </Button>
            </div>
        </div>
    );
};
