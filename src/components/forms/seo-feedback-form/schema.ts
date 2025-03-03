import { isValidPhoneNumber } from "react-phone-number-input";
import { boolean, string, z } from "zod";


export const SeoFeedbackFormSchema = z.object({
    sender_name: string().min(2, "Заполните поле!"),
    sender_phone: string({
        required_error: "Заполните поле!"
    }).refine(isValidPhoneNumber, { message: "Неверный номер телефона!" }),
    sender_email: string().email("Заполните поле!"),
    purpose_of_promotion: string({
        required_error: 'Заполните поле!'
    }),
    acceptTerms: boolean().refine(value => value === true, {
        message: "Вы должны принять условия!",
    }),
})