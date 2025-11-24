import dynamic from "next/dynamic";
import { Metadata } from "next";

import { getPromotionTypes } from "@/api/Types";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import FormLayout from "@/components/templates/form-layout";
import { LazyHydrate } from "@/components/utils/lazy-hydrate";

const Map = dynamic(() => import("./Map").then((mod) => mod.Map), {
    ssr: false,
    loading: () => (
        <div className="flex h-[60vh] items-center justify-center rounded-[32px] bg-background-dark text-lg font-semibold">
            Загрузка карты...
        </div>
    ),
});

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
            <LazyHydrate rootMargin="600px">
                <Map />
            </LazyHydrate>
        </>
    );
}

export default ContactsPage;
