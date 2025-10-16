"use client";

import { Toaster } from "sonner";

const ClientToaster = () => {
    return (
        <Toaster
            className="toaster group"
            richColors
            position="top-center"
            duration={3000}
            visibleToasts={3}
        />
    );
};

export default ClientToaster;
