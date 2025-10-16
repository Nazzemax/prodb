"use client";

import { FC, PropsWithChildren } from "react"
import { Toaster } from 'sonner';
import { StoreProvider } from "./redux-provider";
import { AppContextProvider } from "@/context/app-context";
import { CompanyInfoResponse } from "@/api/Company/types";
import { Type } from "@/api/Types/types";

type ProvidersProps = PropsWithChildren<{
    initialAppData: {
        companyInfo: CompanyInfoResponse | null;
        businessTypes: Type[];
    };
}>;

export const Providers: FC<ProvidersProps> = ({ children, initialAppData }) => {
    return (
        <StoreProvider>
            <AppContextProvider
                initialData={initialAppData.companyInfo}
                initialBusinessTypes={initialAppData.businessTypes}
            >
                <Toaster
                    className="toaster group"
                    richColors
                    position="top-center"
                    duration={3000}
                    visibleToasts={3}
                />
                {children}
            </AppContextProvider>
        </StoreProvider>

    )
}

