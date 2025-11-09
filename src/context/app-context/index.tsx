'use client';

import { useGetBusinessTypesQuery } from "@/api/BusinessType";
import { useGetCompanyInfoQuery } from "@/api/Company";
import { CompanyInfoResponse } from "@/api/Company/types";
import { Type } from "@/api/Types/types";
import { createContext, RefObject, useContext, useRef } from "react";
import { useRouter } from "next/navigation";

interface AppContextType {
    data: CompanyInfoResponse | null;
    business_types: Type[];
    isLoading: boolean;
    error: unknown;
    scrollToFeedback: () => void;
    scrollToReview: () => void;
    feedbackRef: RefObject<HTMLDivElement | null>;
    reviewRef: RefObject<HTMLDivElement | null>;
}

const AppContext = createContext<AppContextType | null>(null)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, isLoading, error } = useGetCompanyInfoQuery()
    const { data: business_types } = useGetBusinessTypesQuery()
    const feedbackRef = useRef<HTMLDivElement>(null);
    const reviewRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const scrollToFeedback = () => {
        feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToReview = () => {
        if (reviewRef.current) {
            reviewRef.current.scrollIntoView({ behavior: "smooth" });
            return;
        }

        router.push("/about#company-review");
    };

    return (
        <AppContext.Provider value={{
            data: data ?? null,
            isLoading,
            error,
            business_types: business_types ?? [],
            scrollToFeedback,
            scrollToReview,
            feedbackRef,
            reviewRef
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppData = () => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error("useAppData must be used within an AppContextProvider");
    }
    return context
}
