"use client";

import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { useAppData } from "@/context/app-context";

interface FeedbackButtonProps {
    button_text: string,
    variant?: "primary" | "secondary" | "ghost" | "feature"; 
}

export const FeedbackButton = ({ button_text, variant }: FeedbackButtonProps) => {
    const { scrollToFeedback } = useAppData();
    return <ButtonWithIcon variant={variant} onClick={scrollToFeedback}>{button_text}</ButtonWithIcon>;
};