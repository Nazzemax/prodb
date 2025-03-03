"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { PhoneInput } from "@/components/ui/phone-input";
import ruLabels from "react-phone-number-input/locale/ru.json";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { isValid, z } from "zod";
import { FeedbackSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSendContactsFormMutation } from "@/api/Form";


export const FeedbackForm = () => {
    
    const [sendForm, { 
        isLoading, 
        isSuccess, 
        isError, 
        reset: resetApi 
    }] = useSendContactsFormMutation()
    const [openTerms, setOpenTerms] = useState(false)

    const showTerms = () => {
        setOpenTerms(prev => !prev)
    }

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
        if (!form.formState.isValid) return;

        const validation = await form.trigger();
        if (!validation) {
            toast.error('Исправьте ошибки в форме');
            return;
        }
        
        if (!data.acceptTerms) {
            toast.error('Примите соглашение с политикой конфиденциальности!');
            return;
        }
    
        try {
            const { acceptTerms, ...formData } = data;
            await sendForm(formData).unwrap();
            form.reset();
       
            toast.success('Успешно отправлено');
            setTimeout(resetApi, 3000);
        } catch (err) {
            console.error('Form submission error:', err);
            toast.error('Ошибка при отправке формы');
        }
    };

    return (
        <Card className="bg-[#18181A] border-none md:p-8 rounded-3xl">
            <CardHeader className="font-bold text-white text-xl md:text-3xl">
                Заполните форму и получите предложение
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
                                        <FormLabel>Имя</FormLabel>
                                        <FormControl className="w-full">
                                            <Input
                                                {...field}
                                                type="name"
                                                placeholder="Иван Иванов Иванович"
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
                                        <FormLabel>Номер телефона</FormLabel>
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
                                        <FormLabel>Электронная почта</FormLabel>
                                        <FormControl className="w-full">
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="Введите электронную почту"
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
                                                    Я согласен на обработку моих данных в соответствии с{' '}
                                                    <span
                                                        onClick={showTerms}
                                                        className="text-accent underline hover:cursor-pointer"
                                                    >
                                                        политикой конфиденциальности
                                                    </span>
                                                </FormLabel>
                                                <Dialog open={openTerms} onOpenChange={setOpenTerms}>
                                                    <DialogContent>
                                                        <DialogTitle>
                                                            Скибиди Доп Доп Доп
                                                        </DialogTitle>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <ButtonWithIcon
                                    type="submit"
                                >
                                    Отправить
                                </ButtonWithIcon>
                            </div>

                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}


