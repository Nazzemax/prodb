import FeedbackForm from "@/components/forms/feedback-form";
import FormLayout from "@/components/templates/form-layout";
import { Map } from "./Map";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Контакты",
    description: "Получите бесплатную консультацию в Bold Brands International"
};

const ContactsPage = () => {
    return (
        <>
            <FormLayout
                isContactPage
                title={'Получите бесплатную консультацию'}
                nestedForm={<FeedbackForm />}
            />
            <Map/>
        </>
    );
}
 
export default ContactsPage;