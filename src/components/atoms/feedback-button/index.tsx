"use client";

import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { useAppData } from "@/context/app-context";

interface FeedbackButtonProps {
    button_text: string;
    variant?: "primary" | "secondary" | "ghost" | "feature" | "iconless";
    onClick?: () => void | Promise<void>;
    disabled?: boolean;
}

export const FeedbackButton = ({ button_text, variant, onClick, disabled }: FeedbackButtonProps) => {
    const { scrollToFeedback } = useAppData();
    const handleClick = onClick ?? scrollToFeedback;

    return (
        <ButtonWithIcon variant={variant} onClick={handleClick} disabled={disabled}>
            {button_text}
        </ButtonWithIcon>
    );
};
