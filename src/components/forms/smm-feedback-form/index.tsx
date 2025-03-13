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
import { useSmmFormFeedbackSchema } from "./schema";
import { Type } from "@/api/Types/types";
import { useSendSmmServiceFormMutation } from "@/api/Form";
import { SmmServiceFormRequest } from "@/api/Form/types";
import { useTranslations } from "next-intl";
import { useAppData } from "@/context/app-context";


interface SmmFeedbackFormProps {
    business_types: Type[];
    social_types: Type[];
}

export const SmmFeedbackForm = ({
    business_types,
    social_types,
}: SmmFeedbackFormProps) => {
    const [
        sendForm, {
            isLoading,
            isSuccess,
            isError,
            reset: resetApi
        }
    ] = useSendSmmServiceFormMutation()

    const t = useTranslations("Form")
    const SmmFeedbackFormSchema = useSmmFormFeedbackSchema()
    const form = useForm<z.infer<typeof SmmFeedbackFormSchema>>({
        resolver: zodResolver(SmmFeedbackFormSchema),
        defaultValues: {
            sender_name: "",
            sender_phone: "",
            sender_email: "",
            quantity_of_publications: '',
            acceptTerms: false,
        },
    });

    const [tabValue, setTabValue] = useState("business");
    const [selectedPromotionTypes, setSelectedPromotionTypes] = useState<number[]>([]);
    const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<number[]>([]);
    const [quantity, setQuantity] = useState<string>('');
    const [openTerms, setOpenTerms] = useState(false);
    const [isFirstStepCompleted, setIsFirstStepCompleted] = useState(false);
    const { data } = useAppData()
    const showTerms = () => {
        setOpenTerms((prev) => !prev);
    };

    const handleNextStep = () => {
        const publicationQuantity = form.getValues("quantity_of_publications");

        if (selectedBusinessTypes.length > 0 && selectedPromotionTypes.length > 0 && Number(publicationQuantity) > 0) {
            setIsFirstStepCompleted(true);
            setTabValue('contacts');
        } else {
            toast.error("Заполните поля!");
            setIsFirstStepCompleted(false)
        }
    };

    const onSubmit = async (data: z.infer<typeof SmmFeedbackFormSchema>) => {

        if (selectedBusinessTypes.length === 0 || selectedPromotionTypes.length === 0) {
            toast.error("Выберите хотя бы один пункт в каждом поле!");
            return;
        }


        if (!data.acceptTerms) {
            toast.error('Примите соглашение с политикой конфиденциальности!');
            return;
        }

        try {
            const formData: SmmServiceFormRequest = {
                ...data,
                business_type: selectedBusinessTypes,
                social_type: selectedPromotionTypes,
                quantity_of_publications: quantity
            };
            console.log('Data being sent:', JSON.stringify(formData, null, 2));
            await sendForm(formData).unwrap();

            form.reset({
                sender_name: "",
                sender_phone: "",
                sender_email: "",
                acceptTerms: false,
            });
            setSelectedPromotionTypes([]);
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
            <CardHeader className="font-bold text-primary-foreground text-xl md:text-3xl">
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
                                else if (selectedBusinessTypes.length > 0 && selectedPromotionTypes.length > 0) {
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
                                        label={t("socialType")}
                                        options={social_types}
                                        selected={selectedPromotionTypes}
                                        setSelected={setSelectedPromotionTypes}
                                        placeholder={t("socialTypePlaceholder")}
                                        description={t("socialTypeDescriptoin")}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="quantity_of_publications"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-left text-slate-400">{t("publicationType")}</FormLabel>
                                                <FormControl className="w-full">
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        placeholder={t("publicationTypePlaceholder")}
                                                        className="border-b-2 bg-transparent"
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setQuantity(e.target.value);
                                                        }}
                                                        onClear={() => {
                                                            form.setValue("quantity_of_publications", "");
                                                            setQuantity("");
                                                        }}
                                                    />
                                                </FormControl>
                                                <span className="text-gray text-xs">{t("publicationTypeDescription")}</span>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <ButtonWithIcon type="button" onClick={handleNextStep}>
                                        {t("nextButton")}
                                    </ButtonWithIcon>
                                </TabsContent>
                                <TabsContent value="contacts" className="space-y-5">
                                    <FormField
                                        control={form.control}
                                        name="sender_name"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-left text-slate-400">{t("name")}</FormLabel>
                                                <FormControl className="w-full">
                                                    <Input
                                                        {...field}
                                                        type="name"
                                                        placeholder={t("namePlaceholder")}
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
                                                <FormLabel className="text-left text-slate-400">{t("phone")}</FormLabel>
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
                                                <FormLabel className="text-left text-slate-400">{t("email")}</FormLabel>
                                                <FormControl className="w-full">
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        placeholder={t("emailPlaceholder")}
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
                                                            {t("terms")}{' '}
                                                            <span
                                                                onClick={showTerms}
                                                                className="text-rose-500 underline hover:cursor-pointer"
                                                            >
                                                                {t("termsLink")}
                                                            </span>
                                                        </FormLabel>
                                                        <Dialog open={openTerms} onOpenChange={setOpenTerms}>
                                                            <DialogContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                                                                <DialogTitle>
      Политика конфиденциальности Bold Brands International
                                                                </DialogTitle>
                                                                <div className="dialog-body" style={{ padding: '1rem' }}>
                                                                    <p>
                                                                        <em>
          Дата вступления в силу: <time dateTime="2025-01-01">01.01.2025</time>
                                                                        </em>
                                                                    </p>
      
                                                                    <section>
                                                                        <h2>1. Общие положения</h2>
                                                                        <p>
          Настоящая Политика конфиденциальности (далее – «Политика») определяет порядок сбора, использования, хранения и защиты персональных данных пользователей (далее – «Пользователь»), предоставляемых при использовании веб-сайта{' '}
                                                                            <a href="https://www.boldbrandsinternational.com" target="_blank" rel="noopener noreferrer">
            www.boldbrandsinternational.com
                                                                            </a>. Политика разработана и применяется Bold Brands International, маркетинговой компанией, для обеспечения безопасности и конфиденциальности информации своих клиентов и посетителей.
                                                                        </p>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>2. Сбор и обработка персональных данных</h2>
                                                                        <article>
                                                                            <h3>2.1. Виды собираемых данных:</h3>
                                                                            <ul>
                                                                                <li>
                                                                                    <strong>Личные данные:</strong> ФИО, адрес электронной почты, номер телефона и иные сведения, предоставляемые Пользователем добровольно.
                                                                                </li>
                                                                                <li>
                                                                                    <strong>Технические данные:</strong> IP-адрес, тип браузера, операционная система, информация о посещённых страницах и прочие данные, автоматически собираемые при посещении Сайта.
                                                                                </li>
                                                                                <li>
                                                                                    <strong>Данные файлов cookie:</strong> Информация, собираемая посредством файлов cookie и аналогичных технологий (см. раздел 4).
                                                                                </li>
                                                                            </ul>
                                                                        </article>
                                                                        <article>
                                                                            <h3>2.2. Правовая основа обработки:</h3>
                                                                            <p>
            Обработка персональных данных осуществляется на основании согласия Пользователя, исполнения договорных обязательств или иных оснований, предусмотренных действующим законодательством.
                                                                            </p>
                                                                        </article>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>3. Цели обработки персональных данных</h2>
                                                                        <ul>
                                                                            <li>Обеспечение работы и функциональности Сайта.</li>
                                                                            <li>Предоставление запрашиваемых услуг и информации.</li>
                                                                            <li>Улучшение качества обслуживания и оптимизация работы Сайта.</li>
                                                                            <li>
            Проведение маркетинговых и аналитических исследований (при наличии согласия Пользователя).
                                                                            </li>
                                                                            <li>Обеспечение безопасности Сайта и предотвращение мошеннических действий.</li>
                                                                        </ul>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>4. Использование файлов cookie и аналогичных технологий</h2>
                                                                        <article>
                                                                            <h3>4.1.</h3>
                                                                            <p>
            Файлы cookie и аналогичные технологии используются для повышения удобства пользования Сайтом, персонализации контента и проведения статистического анализа.
                                                                            </p>
                                                                        </article>
                                                                        <article>
                                                                            <h3>4.2.</h3>
                                                                            <p>
            Пользователь может изменить настройки браузера для ограничения использования файлов cookie, однако это может повлиять на корректную работу некоторых функций Сайта.
                                                                            </p>
                                                                        </article>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>5. Передача персональных данных третьим лицам</h2>
                                                                        <article>
                                                                            <h3>5.1.</h3>
                                                                            <p>
            Bold Brands International может передавать персональные данные следующим категориям получателей:
                                                                            </p>
                                                                            <ul>
                                                                                <li>
              Подрядчикам и партнёрам, оказывающим услуги по техническому обслуживанию, маркетингу, аналитике и обеспечению работы Сайта.
                                                                                </li>
                                                                                <li>
              Органам государственной власти и иным организациям в случаях, предусмотренных законодательством.
                                                                                </li>
                                                                            </ul>
                                                                        </article>
                                                                        <article>
                                                                            <h3>5.2.</h3>
                                                                            <p>
            Передача данных осуществляется с соблюдением всех мер безопасности, установленных законодательством.
                                                                            </p>
                                                                        </article>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>6. Защита персональных данных</h2>
                                                                        <p>
                                                                            <strong>6.1.</strong> Bold Brands International применяет современные организационные и технические меры для защиты персональных данных от несанкционированного доступа, утраты, изменения или распространения.
                                                                        </p>
                                                                        <p>
                                                                            <strong>6.2.</strong> Принятые меры регулярно пересматриваются и обновляются в соответствии с требованиями законодательства.
                                                                        </p>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>7. Права Пользователей</h2>
                                                                        <article>
                                                                            <h3>7.1.</h3>
                                                                            <p>Пользователь имеет право:</p>
                                                                            <ul>
                                                                                <li>
              Запрашивать информацию о своих персональных данных, находящихся в обработке.
                                                                                </li>
                                                                                <li>
              Требовать уточнения, блокирования или удаления своих персональных данных, если обработка данных осуществляется с нарушением законодательства.
                                                                                </li>
                                                                                <li>
              Отзывать данное ранее согласие на обработку персональных данных (обработка может быть прекращена для маркетинговых целей).
                                                                                </li>
                                                                                <li>
              Обращаться с жалобами в надзорные органы в случае нарушения прав в области обработки персональных данных.
                                                                                </li>
                                                                            </ul>
                                                                        </article>
                                                                        <article>
                                                                            <h3>7.2.</h3>
                                                                            <p>
            Для реализации своих прав Пользователь может обращаться по контактным данным, указанным в разделе 9.
                                                                            </p>
                                                                        </article>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>8. Изменения в Политике конфиденциальности</h2>
                                                                        <p>
                                                                            <strong>8.1.</strong> Bold Brands International оставляет за собой право вносить изменения в данную Политику для её актуализации и приведения в соответствие с законодательством.
                                                                        </p>
                                                                        <p>
                                                                            <strong>8.2.</strong> Новая редакция Политики вступает в силу с момента её публикации на Сайте.
                                                                        </p>
                                                                        <p>
                                                                            <strong>8.3.</strong> Рекомендуется регулярно знакомиться с актуальной версией Политики.
                                                                        </p>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>9. Контактная информация</h2>
                                                                        <p>
          По всем вопросам, связанным с обработкой персональных данных, обращайтесь по следующим контактам:
                                                                        </p>
                                                                        <ul>
                                                                            <li>
                                                                                <strong>Название компании:</strong> Bold Brands International
                                                                            </li>
                                                                            <li>
                                                                                <strong>Описание:</strong> Bold Brands International – ваш внешний отдел маркетинга
                                                                            </li>
                                                                            <li>
                                                                                <strong>Рабочее время:</strong> Пн-Пт: 09:00-18:00
                                                                            </li>
                                                                            <li>
                                                                                <strong>WhatsApp:</strong>{' '}
                                                                                <a
                                                                                    href={`https://wa.me/${data?.phones[0].phone.slice(1).split(' ').join('')}`}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
              Напишите нам на Whatsapp
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <strong>Видео-презентация:</strong>{' '}
                                                                                <a
                                                                                    href="https://api.boldbrands.pro/media/company/video/marketing_wa6DSCy.mp4"
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
              Смотреть видео
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <strong>Промо-видео:</strong>{' '}
                                                                                <a
                                                                                    href="https://api.boldbrands.pro/media/company/video/202503122240_1.mp4"
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
              Смотреть промо-видео
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <strong>Адреса:</strong>
                                                                                <ul>
                                                                                    <li>Адрес (Бишкек): {data?.addresses[0]?.address}</li>
                                                                                    <li>Адрес (Ташкент): {data?.addresses[1]?.address}</li>
                                                                                </ul>
                                                                            </li>
                                                                            <li>
                                                                                <strong>Телефоны:</strong>
                                                                                <ul>
                                                                                    <li>Телефон (Бишкек): {data?.phones[0]?.phone}</li>
                                                                                    <li>Phone (Tashkent): {data?.phones[1]?.phone}</li>
                                                                                </ul>
                                                                            </li>
                                                                            <li>
                                                                                <strong>Электронная почта:</strong>{' '}
                                                                                <a href={`mailto:${data?.emails?.[0]?.email}`}>
                                                                                    {data?.emails?.[0]?.email}
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <strong>Социальные сети:</strong>{' '}
                                                                                <a
                                                                                    href={`${data?.social_networks?.[0]?.link}`}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
              Перейти
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>10. Заключительные положения</h2>
                                                                        <p>
                                                                            <strong>10.1.</strong> Использование Сайта означает полное согласие Пользователя с условиями данной Политики конфиденциальности.
                                                                        </p>
                                                                        <p>
                                                                            <strong>10.2.</strong> Политика регулируется законодательством Кыргызской Республики.
                                                                        </p>
                                                                    </section>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>



                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <ButtonWithIcon type="submit">
                                            {t("submitButton")}
                                        </ButtonWithIcon>
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
