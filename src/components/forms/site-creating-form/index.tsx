"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import ruLabels from "react-phone-number-input/locale/ru.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PhoneInput } from "@/components/ui/phone-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiSelect } from "@/components/atoms/multi-select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Type } from "@/api/Types/types";
import { useSendSiteServiceFormMutation } from "@/api/Form";
import { SiteServiceFormRequest } from "@/api/Form/types";
import { useTranslations } from "next-intl";
import { useFeedbackSchema } from "../feedback-form/schema";


interface FeedbackFormProps {
    business_types: Type[];
    site_types: Type[];
}

export const SiteCreatingFeedbackForm = ({
    business_types,
    site_types,
}: FeedbackFormProps) => {

    const [
        sendForm, {
            isLoading,
            isSuccess,
            isError,
            reset: resetApi
        }
    ] = useSendSiteServiceFormMutation()

    const BrandingFeedbackFormSchema = useFeedbackSchema()
    const form = useForm<z.infer<typeof BrandingFeedbackFormSchema>>({
        resolver: zodResolver(BrandingFeedbackFormSchema),
        defaultValues: {
            sender_name: "",
            sender_phone: "",
            sender_email: "",
            acceptTerms: false,
        },
    });

    const t = useTranslations("Form")
    const [tabValue, setTabValue] = useState("business");
    const [selectedSiteTypes, setSelectedSiteTypes] = useState<number[]>([]);
    const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<number[]>([]);
    const [openTerms, setOpenTerms] = useState(false);
    const [isFirstStepCompleted, setIsFirstStepCompleted] = useState(false);

    const showTerms = () => {
        setOpenTerms((prev) => !prev);
    };

    const handleNextStep = () => {
        if (selectedBusinessTypes.length > 0 && selectedSiteTypes.length > 0) {
            setIsFirstStepCompleted(true);
            setTabValue('contacts');
        } else {
            toast.error("Заполните поля!");
            setIsFirstStepCompleted(false)
        }
    };

    const onSubmit = async (data: z.infer<typeof BrandingFeedbackFormSchema>) => {

        if (selectedBusinessTypes.length === 0 || selectedSiteTypes.length === 0) {
            toast.error("Выберите хотя бы один пункт в каждом поле!");
            return;
        }


        if (!data.acceptTerms) {
            toast.error('Примите соглашение с политикой конфиденциальности!');
            return;
        }

        try {
            const formData: SiteServiceFormRequest = {
                ...data,
                business_type: selectedBusinessTypes,
                site_type: selectedSiteTypes
            };
            console.log('Data being sent:', JSON.stringify(formData, null, 2));
            await sendForm(formData).unwrap();

            form.reset({
                sender_name: "",
                sender_phone: "",
                sender_email: "",
                acceptTerms: false,
            });
            setSelectedSiteTypes([]);
            setSelectedBusinessTypes([]);
            setIsFirstStepCompleted(false);
            setTabValue('business');

            toast.success('Успешно отправлено');
            setTimeout(resetApi, 3000);
        } catch (err) {
            console.error('Form submission error:', err);
            toast.error('Ошибка при отправке формы');
        }
    };

    return (
        <Card className="bg-background-dark2 border-none md:p-8 rounded-3xl">
            <CardHeader className="font-bold text-primary-foreground text-xl md:text-2xl">
                {t("title")}
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <Tabs value={tabValue} onValueChange={(value) => {
                                if (value === "business") {
                                    setTabValue(value);
                                }
                                else if (selectedBusinessTypes.length > 0 && selectedSiteTypes.length > 0) {
                                    setTabValue(value);
                                } else {
                                    toast.error("Выберите хотя бы один вариант в каждом поле");
                                }
                            }}>
                                <TabsList className="flex flex-col items-start lg:flex-row mb-8 mt-5 md:mt-0 bg-transparent">
                                    <TabsTrigger value='business' className="space-x-2 group">
                                        {isFirstStepCompleted
                                            ? <div className="border-2 rounded-full p-2  group-data-[state=active]:border-accent">
                                                <Check />
                                            </div>
                                            : <div className="border-2 rounded-full py-2 px-4  group-data-[state=active]:border-accent">
                                                1
                                            </div>
                                        }


                                        <div className="flex flex-col text-left">
                                            <span className="text-sm xl:text-base">{t("tabs.title1")}</span>
                                            <span className="text-xs xl:text-sm">{t("tabs.subTitle1")}</span>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger value='contacts' className="space-x-2 group">
                                        <div className="border-2 rounded-full py-2 px-3.5  group-data-[state=active]:border-accent">
                                            2
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-sm xl:text-base">{t("tabs.title2")}</span>
                                            <span className="text-xs xl:text-sm">{t("tabs.subTitle2")}</span>
                                        </div>
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="business" className="space-y-8">
                                    <MultiSelect
                                        label={t("businessType")}
                                        options={business_types}
                                        selected={selectedBusinessTypes}
                                        setSelected={setSelectedBusinessTypes}
                                        placeholder={t("businessTypePlaceholder")}
                                        description={t("businessTypeDescriptoin")}
                                    />
                                    <MultiSelect
                                        label={t("siteType")}
                                        options={site_types}
                                        selected={selectedSiteTypes}
                                        setSelected={setSelectedSiteTypes}
                                        placeholder={t("siteTypePlaceholder")}
                                        description={t("siteTypeDescription")}
                                    />
                                    <ButtonWithIcon type="button" onClick={handleNextStep}>
                                        Продолжить
                                    </ButtonWithIcon>
                                </TabsContent>
                                <TabsContent value="contacts" className="space-y-5">
                                    <FormField
                                        control={form.control}
                                        name="sender_name"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-left text-slate-400">Имя</FormLabel>
                                                <FormControl className="w-full">
                                                    <Input
                                                        {...field}
                                                        type="name"
                                                        placeholder="Иван Иванов Иванович"
                                                        className="border-b-2 bg-transparent"
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
                                                <FormLabel className="text-left text-slate-400">Номер телефона</FormLabel>
                                                <FormControl className="w-full">
                                                    <PhoneInput
                                                        defaultCountry="KG"
                                                        international
                                                        limitMaxLength
                                                        countryCallingCodeEditable={false}
                                                        labels={ruLabels}
                                                        placeholder="Введите номер телефона"
                                                        className="border-b-2"
                                                        {...field}
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
                                                <FormLabel className="text-left text-slate-400">Электронная почта</FormLabel>
                                                <FormControl className="w-full">
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        placeholder="Введите электронную почту"
                                                        className="border-b-2 bg-transparent"
                                                        onClear={() => form.setValue("sender_email", "")}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex flex-col xl:flex-row pt-3 gap-5">
                                        <FormField
                                            control={form.control}
                                            name="acceptTerms"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 text-white">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className="text-sm md:text-md leading-6">
                                                            Я согласен на обработку моих данных в соответствии с{' '}
                                                            <span
                                                                onClick={showTerms}
                                                                className="text-rose-500 underline hover:cursor-pointer"
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
                                        <ButtonWithIcon type="submit">Отправить</ButtonWithIcon>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
