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
import { SmmServiceFormRequest } from "@/api/Form/types";
import { useTranslations } from "next-intl";
import { useAppData } from "@/context/app-context";
import { useSendFormMutation } from "@/api/Form";
import { objectToQueryString } from "@/lib/utils";
import { Spinner } from "@/components/atoms/spinner";


interface SmmFeedbackFormProps {
    business_types: Type[];
    social_types: Type[];
}

export const SmmFeedbackForm = ({
    business_types,
    social_types,
}: SmmFeedbackFormProps) => {
    const [sendForm, {
        isLoading,
        reset: resetApi
    }] = useSendFormMutation()

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
    const [selectedPromotionTypes, setSelectedPromotionTypes] = useState<string[]>([]);
    const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>([]);
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

        const queryString = objectToQueryString({
            TITLE: "Заявка с сайта",
            NAME: data.sender_name,
            EMAIL: [{ VALUE: data.sender_email, VALUE_TYPE: "WORK" }],
            PHONE: [{ VALUE: data.sender_phone, VALUE_TYPE: "WORK" }],
            LAST_NAME: selectedBusinessTypes.join(', '),
            SECOND_NAME: selectedPromotionTypes.join(', '),
            COMMENTS:data.quantity_of_publications
        })

        await sendForm(queryString)
            .unwrap()
            .then(() => {
                toast.success('Форма успешно отправлена!');
                form.reset();
                setSelectedPromotionTypes([]);
                setSelectedBusinessTypes([]);
                setIsFirstStepCompleted(false);
                setTabValue('business');
            })
            .catch(() => {
                toast.error("Ошибка при отправке формы")
            }).finally(() => {
                setTimeout(resetApi, 3000);
            })
    };

    return (
        <Card className="bg-background-dark2 border-none md:p-8 rounded-3xl">
            <CardHeader className="font-bold text-primary-foreground text-xl md:text-3xl md:mb-8">
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
                                <TabsList className="flex flex-col items-start lg:flex-row sm:mb-10 max-sm:mb-10 mb-8 md:mb-10 mt-5 md:mt-0  bg-transparent">
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
      Политика в отношении обработки персональных данных
                                                                </DialogTitle>
                                                                <div className="dialog-body" style={{ padding: '1rem' }}>
                                                                    <section>
                                                                        <h2>1. Общие положения</h2>
                                                                        <p>
          Настоящая Политика по защите персональных данных определяет порядок, установленный Общества с ограниченной ответственностью «Болд Брендс Интернешнл» (Bold Brands International) (ОсОО «Болд Брендс Интернешнл» (Bold Brands International)) / «Компания», в отношении сбора, обработки и защиты персональных данных («Политика»). В настоящей Политике собрана вся информация о том, как и для каких целей Компания собирает и использует персональные данные, что является основанием использования персональных данных, а также каким образом субъекты персональных данных могут реализовывать свои права на доступ к персональным данным.
                                                                        </p>
                                                                        <p>
                                                                            <strong>1.1.</strong> Компания ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
                                                                        </p>
                                                                        <p>
                                                                            <strong>1.2.</strong> Настоящая политика Компании в отношении обработки персональных данных (далее — Политика) применяется ко всей информации, которую Компания может получить о посетителях веб-сайта{' '}
                                                                            <a href="https://boldbrands.pro" target="_blank" rel="noopener noreferrer">
            https://boldbrands.pro
                                                                            </a>.
                                                                        </p>
                                                                        <p>
                                                                            <strong>1.3.</strong> Настоящая Политика разработана в соответствии с Конституцией Кыргызской Республики, Гражданским кодексом Кыргызской Республики, Законом Кыргызской Республики «Об информации персонального характера», Порядком получения согласия субъекта персональных данных на сбор и обработку его персональных данных, а также с порядком и формой уведомления субъектов персональных данных о передаче их персональных данных третьей стороне.
                                                                        </p>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>2. Основные понятия, используемые в Политике</h2>
                                                                        <p><strong>2.1.</strong> Автоматизированная обработка персональных данных — обработка персональных данных с помощью средств вычислительной техники.</p>
                                                                        <p><strong>2.2.</strong> Блокирование персональных данных — временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).</p>
                                                                        <p>
                                                                            <strong>2.3.</strong> Веб-сайт — совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу{' '}
                                                                            <a href="https://boldbrands.pro" target="_blank" rel="noopener noreferrer">
            https://boldbrands.pro
                                                                            </a>.
                                                                        </p>
                                                                        <p><strong>2.4.</strong> Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку информационных технологий и технических средств.</p>
                                                                        <p><strong>2.5.</strong> Обезличивание персональных данных — действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту.</p>
                                                                        <p>
                                                                            <strong>2.6.</strong> Обработка персональных данных — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без них с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление и уничтожение персональных данных.
                                                                        </p>
                                                                        <p>
                                                                            <strong>2.7.</strong> Компания — Общество с ограниченной ответственностью «Болд Брендс Интернешнл» (Bold Brands International) (ОсОО «Болд Брендс Интернешнл» (Bold Brands International)), ИНН 02502202310383, зарегистрированное в Кыргызской Республике по адресу: г. Бишкек, Октябрьский район, ул. Матросова, д. 102, самостоятельно или совместно с другими лицами, организующее и/или осуществляющее обработку персональных данных, а также определяющее цели обработки, состав персональных данных и действия с ними.
                                                                        </p>
                                                                        <p>
                                                                            <strong>2.8.</strong> Персональные данные — любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта{' '}
                                                                            <a href="https://boldbrands.pro" target="_blank" rel="noopener noreferrer">
            https://boldbrands.pro
                                                                            </a>.
                                                                        </p>
                                                                        <p>
                                                                            <strong>2.9.</strong> Персональные данные, разрешенные субъектом для распространения — персональные данные, доступ неограниченного круга лиц к которым предоставлен субъектом путем дачи согласия на их обработку в порядке, предусмотренном Законом Кыргызской Республики «Об информации персонального характера».
                                                                        </p>
                                                                        <p>
                                                                            <strong>2.10.</strong> Пользователь — любой посетитель веб-сайта{' '}
                                                                            <a href="https://boldbrands.pro" target="_blank" rel="noopener noreferrer">
            https://boldbrands.pro
                                                                            </a>.
                                                                        </p>
                                                                        <p><strong>2.11.</strong> Предоставление персональных данных — действия, направленные на раскрытие персональных данных определенному лицу или кругу лиц.</p>
                                                                        <p>
                                                                            <strong>2.12.</strong> Распространение персональных данных — любые действия, направленные на раскрытие персональных данных неопределенному кругу лиц, включая обнародование в СМИ, размещение в информационно-телекоммуникационных сетях или предоставление доступа к ним.
                                                                        </p>
                                                                        <p>
                                                                            <strong>2.13.</strong> Трансграничная передача персональных данных — передача персональных данных на территорию иностранного государства органу власти, иностранному физическому или юридическому лицу.
                                                                        </p>
                                                                        <p>
                                                                            <strong>2.14.</strong> Уничтожение персональных данных — любые действия, в результате которых данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления.
                                                                        </p>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>3. Основные права и обязанности Компании</h2>
                                                                        <p><strong>3.1.</strong> Компания имеет право:</p>
                                                                        <ul>
                                                                            <li>получать от субъекта достоверную информацию и/или документы, содержащие персональные данные;</li>
                                                                            <li>
            в случае отзыва согласия на обработку персональных данных, продолжить обработку данных на основании, предусмотренных Законом;
                                                                            </li>
                                                                            <li>
            самостоятельно определять состав и перечень мер, необходимых для выполнения обязанностей, предусмотренных Законом и иными нормативными актами.
                                                                            </li>
                                                                        </ul>
                                                                        <p><strong>3.2.</strong> Компания обязана:</p>
                                                                        <ul>
                                                                            <li>предоставлять субъекту информацию о обработке его персональных данных по запросу;</li>
                                                                            <li>организовывать обработку данных в соответствии с законодательством Кыргызской Республики;</li>
                                                                            <li>отвечать на обращения субъектов и их законных представителей;</li>
                                                                            <li>сообщать в уполномоченный орган по защите персональных данных по его запросу в течение 10 дней;</li>
                                                                            <li>обеспечивать неограниченный доступ к настоящей Политике;</li>
                                                                            <li>
            принимать правовые, организационные и технические меры для защиты данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, предоставления и распространения;
                                                                            </li>
                                                                            <li>
            прекратить передачу, обработку и уничтожить данные в случаях, предусмотренных Законом;
                                                                            </li>
                                                                            <li>исполнять иные обязанности, предусмотренные законодательством.</li>
                                                                        </ul>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>4. Основные права и обязанности субъектов персональных данных</h2>
                                                                        <p><strong>4.1.</strong> Субъекты персональных данных имеют право:</p>
                                                                        <ul>
                                                                            <li>
            на получение информации, в том числе:
                                                                                <ol>
                                                                                    <li>подтверждение факта, цели, источников, способов сбора и обработки данных;</li>
                                                                                    <li>перечень персональных данных;</li>
                                                                                    <li>сроки обработки и хранения данных;</li>
                                                                                </ol>
                                                                            </li>
                                                                            <li>
            требовать уточнения, блокирования или уничтожения своих данных, если они неполные, устаревшие, неточные, незаконно полученные или не являются необходимыми для заявленной цели;
                                                                            </li>
                                                                            <li>отозвать согласие на обработку данных и потребовать прекращения их обработки;</li>
                                                                            <li>обжаловать неправомерные действия или бездействие Компании в уполномоченный орган или в судебном порядке;</li>
                                                                            <li>осуществлять иные права, предусмотренные законодательством Кыргызской Республики.</li>
                                                                        </ul>
                                                                        <p><strong>4.2.</strong> Субъекты обязаны:</p>
                                                                        <ul>
                                                                            <li>предоставлять Компании достоверные данные о себе;</li>
                                                                            <li>сообщать об обновлении или изменении своих данных.</li>
                                                                        </ul>
                                                                        <p><strong>4.3.</strong> Лица, предоставившие недостоверные сведения о себе или о другом субъекте без его согласия, несут ответственность согласно законодательству Кыргызской Республики.</p>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>5. Принципы обработки персональных данных</h2>
                                                                        <ul>
                                                                            <li>Данные должны быть получены и обработаны в порядке, предусмотренном законодательством КР.</li>
                                                                            <li>Данные собираются для точно определенных, законных целей и не обрабатываются несовместимым образом.</li>
                                                                            <li>Первоначальные данные должны быть точными и обновляться по необходимости.</li>
                                                                            <li>Данные хранятся не дольше, чем необходимо для достижения целей их сбора, и уничтожаются по истечении этих сроков.</li>
                                                                            <li>Для длительного хранения данных должны быть установлены гарантии их защиты.</li>
                                                                            <li>Не допускается объединение данных, собранных для разных целей, для автоматизированной обработки.</li>
                                                                            <li>Данные должны храниться и защищаться от незаконного доступа, внесения изменений, копирования и уничтожения.</li>
                                                                        </ul>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>6. Цели обработки персональных данных</h2>
                                                                        <ul>
                                                                            <li>Подготовка и заключение соглашений с субъектами для исполнения обязательств по Публичной оферте об оказании услуг;</li>
                                                                            <li>Выполнение финансовых и юридических обязательств: для учета и налогообложения;</li>
                                                                            <li>Развитие бизнеса: для улучшения сервиса и контроля качества;</li>
                                                                            <li>Маркетинг: для предоставления информации об услугах, рассылки материалов, приглашений на мероприятия, создания фото- и видеоотчетов;</li>
                                                                            <li>Рассмотрение претензий и разрешение споров: для получения подробной информации о претензиях и их разрешения;</li>
                                                                            <li>Иные цели в рамках деятельности Компании, где используются персональные данные субъектов.</li>
                                                                        </ul>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>7. Условия обработки персональных данных</h2>
                                                                        <ul>
                                                                            <li><strong>7.1.</strong> Обработка данных осуществляется с согласия субъекта на обработку его данных.</li>
                                                                            <li><strong>7.2.</strong> Обработка необходима для достижения целей, предусмотренных Политикой, законодательством КР или международными договорами, а также для выполнения обязанностей Компании.</li>
                                                                            <li><strong>7.3.</strong> Обработка необходима для осуществления правосудия, исполнения судебных актов или иных обязательных требований.</li>
                                                                            <li><strong>7.4.</strong> Обработка необходима для исполнения договоров, по которым субъект является стороной, выгодоприобретателем или поручителем, либо для их заключения по инициативе субъекта.</li>
                                                                            <li><strong>7.5.</strong> Обработка необходима для осуществления прав и законных интересов Компании или третьих лиц, либо для достижения общественно значимых целей при условии, что не нарушаются права субъекта.</li>
                                                                            <li><strong>7.6.</strong> Обрабатываются данные, доступ к которым предоставлен субъектом или по его просьбе (общедоступные данные).</li>
                                                                            <li><strong>7.7.</strong> Обрабатываются данные, подлежащие опубликованию или обязательному раскрытию в соответствии с законодательством КР.</li>
                                                                        </ul>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>8. Порядок сбора, хранения, передачи и других видов обработки персональных данных</h2>
                                                                        <ul>
                                                                            <li><strong>8.1.</strong> Компания обеспечивает сохранность данных и принимает все меры для исключения доступа неуполномоченных лиц.</li>
                                                                            <li><strong>8.2.</strong> Данные Пользователя не передаются третьим лицам, за исключением случаев, предусмотренных законодательством КР или при наличии согласия субъекта для исполнения обязательств по гражданско-правовому договору.</li>
                                                                            <li>
                                                                                <strong>8.3.</strong> При выявлении неточностей Пользователь может актуализировать данные, направив уведомление на <a href="mailto:contact@boldbrands.pro">contact@boldbrands.pro</a> с пометкой «Актуализация персональных данных».
                                                                            </li>
                                                                            <li>
                                                                                <strong>8.4.</strong> Срок обработки данных определяется достижением целей их сбора или иным сроком, предусмотренным договором или законодательством. Пользователь может отозвать согласие, направив уведомление на <a href="mailto:contact@boldbrands.pro">contact@boldbrands.pro</a> с пометкой «Отзыв согласия на обработку персональных данных».
                                                                            </li>
                                                                            <li>
                                                                                <strong>8.5.</strong> Информация, собираемая сторонними сервисами (платежными системами, средствами связи и т.д.), обрабатывается указанными лицами согласно их соглашениям и политикам конфиденциальности. Компания не несет ответственность за действия таких лиц.
                                                                            </li>
                                                                            <li>
                                                                                <strong>8.6.</strong> Запреты на передачу или обработку данных, установленные субъектом, не действуют для данных, обрабатываемых в государственных или иных публичных интересах согласно законодательству КР.
                                                                            </li>
                                                                            <li><strong>8.7.</strong> Компания обеспечивает конфиденциальность обрабатываемых данных.</li>
                                                                            <li>
                                                                                <strong>8.8.</strong> Данные хранятся в форме, позволяющей идентифицировать субъекта, не дольше, чем это необходимо для достижения целей их обработки, если иное не предусмотрено законодательством КР или договором.
                                                                            </li>
                                                                            <li>
                                                                                <strong>8.9.</strong> Обработка прекращается при достижении целей, истечении срока согласия, его отзыве или выявлении неправомерной обработки.
                                                                            </li>
                                                                        </ul>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>9. Перечень действий, производимых Компанией с полученными персональными данными</h2>
                                                                        <ul>
                                                                            <li>
                                                                                <strong>9.1.</strong> Компания осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление и уничтожение данных.
                                                                            </li>
                                                                            <li>
                                                                                <strong>9.2.</strong> Компания осуществляет автоматизированную обработку данных с получением и/или передачей информации по информационно-телекоммуникационным сетям или без них.
                                                                            </li>
                                                                        </ul>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>10. Трансграничная передача персональных данных</h2>
                                                                        <ul>
                                                                            <li>
                                                                                <strong>10.1.</strong> Компания вправе передавать и хранить данные субъектов за рубежом, гарантируя законность и безопасность таких операций.
                                                                            </li>
                                                                            <li>
                                                                                <strong>10.2.</strong> Трансграничная передача в иностранных государствах, не соответствующих требованиям, осуществляется только с письменного согласия субъекта или при исполнении договора.
                                                                            </li>
                                                                        </ul>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>11. Конфиденциальность персональных данных</h2>
                                                                        <p>
          Компания и лица, получившие доступ к данным, обязаны не раскрывать и не распространять их без согласия субъекта, если иное не предусмотрено законодательством КР.
                                                                        </p>
                                                                    </section>
      
                                                                    <section>
                                                                        <h2>12. Заключительные положения</h2>
                                                                        <ul>
                                                                            <li>
                                                                                <strong>12.1.</strong> Пользователь может получить разъяснения по вопросам обработки данных, обратившись на <a href="mailto:contact@boldbrands.pro">contact@boldbrands.pro</a>.
                                                                            </li>
                                                                            <li>
                                                                                <strong>12.2.</strong> В данном документе будут отражены любые изменения политики обработки данных. Политика действует бессрочно до замены ее новой версией.
                                                                            </li>
                                                                        </ul>
                                                                    </section>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>

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
                                </TabsContent>
                            </Tabs>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
