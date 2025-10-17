import { Metadata } from "next";

import { getPromotionTypes } from "@/api/Types";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import FormLayout from "@/components/templates/form-layout";
import MapClientWrapper from "./MapClientWrapper";

export const metadata: Metadata = {
    title: "Контакты",
    description: "Получите бесплатную консультацию в Bold Brands International"
};

const ContactsPage = async () => {
    const promotion_types = await getPromotionTypes();
    return (
        <>
            <FormLayout
                isContactPage
                title={'Получите бесплатную консультацию'}
                nestedForm={<CostCalculationForm promotion_types={promotion_types} />}
            />
            <MapClientWrapper />
        </>
    );
}

export default ContactsPage;
