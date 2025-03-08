// import { isValidPhoneNumber } from "react-phone-number-input";
// import { boolean, string, z } from "zod";


// export const BrandingFeedbackFormSchema = z.object({
//     sender_name: string().min(2, "Заполните поле!"),
//     sender_phone: string({
//         required_error: "Заполните поле!"
//     }).refine(isValidPhoneNumber, { message: "Неверный номер телефона!" }),
//     sender_email: string().email("Заполните поле!"),
//     acceptTerms: boolean().refine(value => value === true, {
//         message: "Вы должны принять условия!",
//     }),
// })

import { isValidPhoneNumber } from "react-phone-number-input";
import { boolean, string, z } from "zod";
import { useTranslations } from "next-intl";

export const useBrandingFeedbackFormSchema = () => {
    const t = useTranslations("FormErrors");

    return z.object({
        sender_name: string().min(2, t("required")),
        sender_phone: string({ required_error: t("phone_error") })
            .refine(isValidPhoneNumber, { message: t("required") }),
        sender_email: string().email(t("required")),
        acceptTerms: boolean().refine(val => val === true, { message: t("required") }),
    });
};