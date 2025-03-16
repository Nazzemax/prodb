"use client";
import { FC, PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { StoreProvider } from "./redux-provider";
import { AppContextProvider } from "@/context/app-context";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <AppContextProvider>
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
  );
};
