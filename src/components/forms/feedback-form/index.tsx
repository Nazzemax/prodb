"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { PhoneInput } from "@/components/ui/phone-input";
import ruLabels from "react-phone-number-input/locale/ru.json";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useFeedbackSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSendFormMutation } from "@/api/Form";
import { useTranslations } from "next-intl";
import { useAppData } from "@/context/app-context";
import { objectToQueryString } from "@/lib/utils";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Spinner } from "@/components/atoms/spinner";
import { FormTerms } from "@/components/atoms/form-terms";


const FeedbackForm = () => {
    const { data } = useAppData()
    const [sendForm, {
        isLoading,
        reset: resetApi
    }] = useSendFormMutation()
    const [openTerms, setOpenTerms] = useState(false)

    const t = useTranslations('Form')
    const showTerms = () => {
        setOpenTerms(prev => !prev)
    }

    const FeedbackSchema = useFeedbackSchema()
    const form = useForm<z.infer<typeof FeedbackSchema>>({
        resolver: zodResolver(FeedbackSchema),
        defaultValues: {
            sender_name: '',
            sender_phone: '',
            sender_email: '',
            acceptTerms: false,
        }
    })

    const onSubmit = async (data: z.infer<typeof FeedbackSchema>) => {
        const queryString = objectToQueryString({
            TITLE: "Заявка с сайта",
            NAME: data.sender_name,
            EMAIL: [{ VALUE: data.sender_email, VALUE_TYPE: "WORK" }],
            PHONE: [{ VALUE: data.sender_phone, VALUE_TYPE: "WORK" }],
        })
        await sendForm(queryString)
            .unwrap()
            .then(() => {
                toast.success('Форма успешно отправлена!');
                setTimeout(resetApi, 3000);
                form.reset();
            })
            .catch(() => {
                toast.error("Ошибка при отправке формы")
            })
    };

    return (
        <Card className="bg-[#18181A] border-none md:p-8 rounded-3xl">
            <CardHeader className="font-bold text-white text-xl md:text-2xl p-5 md:p-0 md:pb-8">
                {t("title")}
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <FormField
                                control={form.control}
                                name="sender_name"
                                render={({ field }) => (    
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel>{t("name")}</FormLabel>
                                        <FormControl className="w-full">
                                            <Input
                                                {...field}
                                                type="name"
                                                placeholder={t('namePlaceholder')}
                                                error={!!form.formState.errors.sender_name}
                                                onClear={() => form.setValue("sender_name", "")}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sender_phone"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel>{t("phone")}</FormLabel>
                                        <FormControl className="w-full">
                                            <PhoneInput
                                                {...field}
                                                defaultCountry="KG"
                                                international
                                                limitMaxLength
                                                countryCallingCodeEditable={true}
                                                labels={ruLabels}
                                                placeholder="Введите номер телефона"
                                                className="border-b-2"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sender_email"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel>{t("email")}</FormLabel>
                                        <FormControl className="w-full">
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder={t('emailPlaceholder')}
                                                error={!!form.formState.errors.sender_email}
                                                onClear={() => form.setValue("sender_email", "")}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col xl:flex-row pt-5 gap-5">
                                <FormField
                                    control={form.control}
                                    name="acceptTerms"
                                    render={({ field }) => (
                                        <FormItem className="relative flex flex-row items-start space-x-3 space-y-0 text-white">
                                            <FormControl>
                                                <div className="relative">
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </div>
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm md:text-md leading-6">
                                                    {t('terms')}{' '}
                                                    <span
                                                        onClick={showTerms}
                                                        className="text-accent underline hover:cursor-pointer"
                                                    >
                                                        {t('termsLink')}
                                                    </span>
                                                </FormLabel>
                                                <FormTerms isOpen={openTerms} onOpenChange={setOpenTerms} />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <ButtonWithIcon
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? <span className="flex gap-x-1 text-gray2">{t("submitButtonLoading")}<Spinner /></span>
                                        : (t("submitButton"))
                                    }
                                </ButtonWithIcon>
                            </div>

                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default FeedbackForm;