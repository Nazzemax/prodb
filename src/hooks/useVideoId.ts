'use client';

import { getYouTubeId } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useYouTubeId = (url: string) => {
    const [videoId, setVideoId] = useState<string | null | undefined>(() => getYouTubeId(url));

    useEffect(() => {
        setVideoId(getYouTubeId(url));
    }, [url]);

    return videoId;
};