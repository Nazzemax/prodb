import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { VideoLoader } from "../video-loader";

export const VideoPlayer = ({ video }: { video: string; controls?: boolean }) => {
    const playerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

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
            className="relative w-full overflow-hidden rounded-md bg-transparent"
            style={{ aspectRatio: "16/9"}}
        >
            <ReactPlayer
                url={video}
                fallback={<VideoLoader />}
                controls={true}
                playing={isVisible && isPlaying}
                muted={true}
                // light={true}
                playsinline
                width="100%"
                height="100%"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    objectFit: "cover",
                }}
            />
        </div>
    );
};
