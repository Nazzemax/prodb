"use client";

import dynamic from "next/dynamic";
import { FC, PropsWithChildren } from "react";

import { CompanyInfoResponse } from "@/api/Company/types";
import { Type } from "@/api/Types/types";
import { AppContextProvider } from "@/context/app-context";
import { StoreProvider } from "./redux-provider";

const ClientToaster = dynamic(() => import("./client-toaster"), {
    ssr: false,
});

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
                <ClientToaster />
                {children}
            </AppContextProvider>
        </StoreProvider>
    );
};

