import MarketingSupportPage from "@/domains/services/marketing-support";
import PrintPage from "@/domains/services/operative-print";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Оперативная печать",
};

const OperativePrint = () => {
    return <PrintPage />;
};

export default OperativePrint;
