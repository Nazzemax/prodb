'use client';

import { useGetBusinessTypesQuery } from "@/api/BusinessType";
import { useGetCompanyInfoQuery } from "@/api/Company";
import { CompanyInfoResponse } from "@/api/Company/types";
import { Type } from "@/api/Types/types";
import { createContext, RefObject, useContext, useRef } from "react";

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

interface AppContextProviderProps {
    children: React.ReactNode;
    initialData?: CompanyInfoResponse | null;
    initialBusinessTypes?: Type[];
}

export const AppContextProvider = ({
    children,
    initialData = null,
    initialBusinessTypes = [],
}: AppContextProviderProps) => {
    const {
        data: fetchedData,
        isLoading: isCompanyLoading,
        error: companyError,
    } = useGetCompanyInfoQuery(undefined, {
        skip: Boolean(initialData),
    })

    const {
        data: fetchedBusinessTypes,
        isLoading: isBusinessTypesLoading,
        error: businessTypesError,
    } = useGetBusinessTypesQuery(undefined, {
        skip: initialBusinessTypes.length > 0,
    })

    const data = fetchedData ?? initialData ?? null
    const business_types =
        fetchedBusinessTypes ??
        (initialBusinessTypes.length ? initialBusinessTypes : ([] as Type[]))

    const isLoading = Boolean(
        (!initialData && isCompanyLoading) ||
            (initialBusinessTypes.length === 0 && isBusinessTypesLoading)
    )

    const error = companyError ?? businessTypesError ?? null
    const feedbackRef = useRef<HTMLDivElement>(null);
    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollToFeedback = () => {
        feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToReview = () => {
        reviewRef.current?.scrollIntoView({ behavior: "smooth" });
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