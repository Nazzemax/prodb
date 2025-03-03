import React from "react";

interface MapButtonProps {
    text: string;
    isActive: boolean;
    onClick: () => void;
}

const MapButton: React.FC<MapButtonProps> = ({ text, isActive, onClick }) => {
    return (
        <button
            className={`px-4 py-2 border border-none rounded-2xl text-sm pt-3 pb-3 transition-all duration-300 
                  max-sm:text-[0.7rem] max-sm:px-[0.85rem]
                  ${isActive
            ? "bg-white text-black"
            : "bg-[#313336] text-[#AAADB5]"
        }`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

// For the container component (where you use MapButton):
export function MapButtonsContainer() {
    return (
        <div className="absolute top-10 left-14 z-10 max-sm:top-8 max-sm:left-8">
            {/* Your MapButton components here */}
        </div>
    );
}

export default MapButton;