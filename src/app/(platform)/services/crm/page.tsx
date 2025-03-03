import CrmPage from "@/domains/services/crm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CRM",
};

const Crm = () => {
    return <CrmPage />
}

export default Crm;