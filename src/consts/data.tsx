import CreatingAd1SVG from "@/assets/services/smm/creating-ad_1.svg";
import CreatingAd2SVG from "@/assets/services/smm/creating-ad_2.svg";
import CreatingAd3SVG from "@/assets/services/smm/creating-ad_3.svg";

import { ISmmCreatingAdData, ISmmTeamMembers } from "./types";
import {
    ServiceBrandingIcon1,
    ServiceBrandingIcon2,
    ServiceBrandingIcon3,
    ServiceBrandingIcon4,
    ServiceBrandingIcon5,
} from "@/assets/services/branding";
import {
    Card1Icon,
    Card2Icon,
    Card3Icon,
    SeoHowWeWork2,
    SeoHowWeWork3,
    SeoHowWeWork4,
    SeoHowWeWork5,
} from "@/assets/services/seo";
import {
    ServiceSmmIcon1,
    ServiceSmmIcon2,
    ServiceSmmIcon3,
    ServiceSmmIcon4,
    ServiceSmmIcon5,
    ServiceSmmIcon6,
} from "@/assets/services/smm";
import {
    ServiceCrmIcon1,
    ServiceCrmIcon2,
    ServiceCrmIcon3,
} from "@/assets/services/crm";
import {
    ContextAd2Icon,
    ContextAd3Icon,
    ContextAd4Icon,
    ContextAd5Icon,
    ContextAd6Icon,
    ContextAdCard1Icon,
    ContextAdCard2Icon,
    ContextAdCard3Icon,
} from "@/assets/services/context-ad";

// SERVICES
// SMM
export const smmCreatingAdData: ISmmCreatingAdData = {
    eyebrow: "Инфлюенс-маркетинг",
    title: "Создаем рекламу, которой доверяют",
    sub_title:
    "Привлекаем блогеров и лидеров мнений, чтобы ваш бизнес стал доступнее для тысяч клиентов. ",
    items: [
        {
            image: "/images/services/smm/creating-ad_1.webp",
            icon: <CreatingAd1SVG />,
            title: "Тщательный подбор",
            description:
        "анализируем блогеров, их аудиторию и репутацию, чтобы сотрудничество принесло максимальный результат.",
        },
        {
            image: "/images/services/smm/creating-ad_2.webp",
            icon: <CreatingAd2SVG />,
            title: "Разработка креативных интеграций",
            description:
        "анализируем блогеров, их аудиторию и репутацию, чтобы сотрудничество принесло максимальный результат.",
        },
        {
            image: "/images/services/smm/creating-ad_3.webp",
            icon: <CreatingAd3SVG />,
            title: "Оценка эффективности",
            description:
        "измеряем охваты, вовлеченность и конверсии, чтобы вы видели, как инфлюенсеры влияют на рост вашего бизнеса.",
        },
    ],
};

//SMM
export const smmTeamMembers: ISmmTeamMembers = {
    title: "Ваш личный SMM-отдел из 6 экспертов",
    items: [
        {
            image: <ServiceSmmIcon1 />,
            number: "01",
            title: "Project Manager",
            description:
        "Координирует работу команды, управляет сроками и постоянно взаимодействует с вами для достижения поставленных целей.",
        },
        {
            image: <ServiceSmmIcon2 />,
            number: "02",
            title: "SMM-менеджер",
            description:
        "Разрабатывает стратегию продвижения, анализирует аудиторию и конкурентов, планирует контент и рекламные кампании.",
        },
        {
            image: <ServiceSmmIcon3 />,
            number: "03",
            title: "Мобилограф",
            description:
        "Создает динамичный визуальный контент: фото, видео, Reels — все, что привлекает и удерживает внимание аудитории.",
        },
        {
            image: <ServiceSmmIcon4 />,
            number: "04",
            title: "Графический дизайнер",
            description:
        "Разрабатывает уникальные визуальные решения, создавая графику, которая выделит ваш бренд среди конкурентов.",
        },
        {
            image: <ServiceSmmIcon5 />,
            number: "05",
            title: "Копирайтер",
            description:
        "Пишет тексты, которые цепляют и побуждают к действию: посты, заголовки, описания продуктов и услуг.",
        },
        {
            image: <ServiceSmmIcon6 />,
            number: "06",
            title: "Таргетолог",
            description:
        "Привлечет вашу целевую аудиторию и настроит рекламу для максимального количества заявок и новых клиентов.",
        },
    ],
};


//CRM
export const serviceCrmData: ISmmTeamMembers = {
    title: "Почему вашему бизнесу нужна CRM?",
    items: [
        {
            image: <ServiceCrmIcon1 />,
            number: "01",
            title: "Увеличение продаж",
            description:
        "Автоматизация рутинных задач и структурирование клиентских данных помогают сосредоточиться на главном — привлечении и удержании клиентов, что значительно повышает конверсию и общий объем продаж.",
        },
        {
            image: <ServiceCrmIcon2 />,
            number: "02",
            title: "Простота управления клиентами",
            description:
        "Все данные о клиентах собраны в одном месте, что упрощает доступ к информации и позволяет вашей команде выстраивать персонализированное взаимодействие.",
        },
        {
            image: <ServiceCrmIcon3 />,
            number: "03",
            title: "Экономия времени и ресурсов",
            description:
        "Оптимизация рабочих процессов снижает нагрузку на сотрудников, ускоряет выполнение задач и минимизирует ошибки, помогая снизить издержки.",
        },
        {
            image: <SeoHowWeWork5 />,
            number: "04",
            title: "Аналитика для роста",
            description:
        "Систематизированная CRM-платформа предоставляет глубокую аналитику и отчеты, которые помогают выявлять слабые места, принимать стратегические решения и улучшать бизнес-процессы.",
        },
    ],
};

export const serviceData = {
    title: "Наши услуги по интеграции CRM",
    items: [
        {
            image: "/images/services/crm/crm1.png",
            image_right: false,
            title: "Выбор и настройка CRM-системы",
            description: "",
            tags: [
                {
                    tags: "Подбор наиболее подходящей CRM-платформы для вашего бизнеса.",
                },
                {
                    tags: "Индивидуальная настройка системы под ваши требования.",
                },
            ],
        },
        {
            image: "/images/services/crm/crm2.png",
            image_right: true,
            title: "Миграция данных",
            description: "",
            tags: [
                {
                    tags: "Безопасный и точный перенос данных из существующих систем.",
                },
                {
                    tags: "Обеспечение целостности и сохранности информации.",
                },
            ],
        },
        {
            image: "/images/services/crm/crm3.png",
            image_right: false,
            title: "Автоматизация процессов",
            description: "",
            tags: [
                {
                    tags: "Настройка автоматизированных рабочих процессов для повышения эффективности",
                },
                {
                    tags: "Интеграция CRM с другими инструментами и системами вашего бизнеса.",
                },
            ],
        },
        {
            image: "/images/services/crm/crm4.png",
            image_right: true,
            title: "Обучение и поддержка",
            description: "",
            tags: [
                {
                    tags: "Проведение обучающих сессий для вашей команды.",
                },
                {
                    tags: "Предоставление технической поддержки и сопровождение после внедрения.",
                },
            ],
        },
    ],
};

//SEO
export const seoData: ISmmCreatingAdData = {
    title: "Почему SEO-оптимизация необходима вашему бизнесу?",
    items: [
        {
            image: "/images/services/seo/card_1.webp",
            icon: <Card1Icon />,
            title: "Увеличение органического трафика",
            description:
        "Более 70% пользователей кликают на первые три результата поиска. Попадая в топ, вы увеличиваете посещаемость сайта без дополнительных затрат на рекламу.",
        },
        {
            image: "/images/services/seo/card_2.webp",
            icon: <Card2Icon />,
            title: "Повышение доверия и узнаваемости",
            description:
        "Сайты в топе считаются более надежными, что повышает доверие клиентов и стимулирует повторные продажи.",
        },
        {
            image: "/images/services/seo/card_3.webp",
            icon: <Card3Icon />,
            title: "Долгосрочные результаты",
            description:
        "Инвестиции в SEO приносят плоды долгое время, в отличие от платной рекламы, эффект от которой краткосрочен.",
        },
    ],
};

export const seoPostsData = {
    title: "Наши услуги по SEO-оптимизации",
    items: [
        {
            image: "/images/services/seo/seo1-min.png",
            image_right: false,
            title: "Технический аудит сайта",
            tags: [
                { tags: "Проверка скорости загрузки страниц" },
                { tags: "Поиск и исправление ошибок в коде" },
                { tags: "Оптимизация для мобильных устройств" },
            ],
        },
        {
            image: "/images/services/seo/seo2-min.png",
            image_right: true,
            title: "Подбор эффективных ключевых слов",
            tags: [
                { tags: "Анализ поисковых запросов целевой аудитории" },
                { tags: "Оценка конкурентности и частотности запросов" },
                { tags: "Составление семантического ядра" },
            ],
        },
        {
            image: "/images/services/seo/seo3-min.png",
            image_right: false,
            title: "Внутренняя оптимизация",
            tags: [
                { tags: "Улучшение структуры сайта и навигации" },
                { tags: "Оптимизация мета-тегов и заголовков" },
                { tags: "Создание качественного и уникального контента" },
            ],
        },
        {
            image: "/images/services/seo/seo4-min.png",
            image_right: true,
            title: "Внешняя оптимизация (линкбилдинг)",
            tags: [
                { tags: "Размещение статей и ссылок на авторитетных ресурсах" },
                { tags: "Работа с отзывами и упоминаниями бренда" },
                { tags: "Создание естественного ссылочного профиля" },
            ],
        },
        {
            image: "/images/services/seo/seo5-min.png",
            image_right: false,
            title: "Локальное SEO",
            tags: [
                { tags: "Оптимизация для местных поисковых запросов" },
                { tags: "Настройка профилей в Google My Business и Яндекс.Справочник" },
                { tags: "Сбор и управление отзывами клиентов" },
            ],
        },
        {
            image: "/images/services/seo/seo6-min.png",
            image_right: true,
            title: "Постоянный мониторинг и аналитика",
            tags: [
                { tags: "Отслеживание позиций в поисковой выдаче" },
                { tags: "Анализ поведения пользователей на сайте" },
                { tags: "Корректировка стратегии на основе данных" },
            ],
        },
    ],
};

export const seoCardsData: ISmmTeamMembers = {
    title: "Как мы работаем",
    items: [
        {
            image: <ServiceBrandingIcon1 />,
            number: "01",
            title: "Анализ бизнеса и конкурентов",
            description:
        "Погружаемся в специфику вашего рынка, изучаем сильные и слабые стороны конкурентов.",
        },
        {
            image: <SeoHowWeWork2 />,
            number: "02",
            title: "Разработка индивидуальной стратегии",
            description:
        "Создаем план действий, учитывая особенности вашего бизнеса и цели",
        },
        {
            image: <SeoHowWeWork3 />,
            number: "03",
            title: "Внедрение оптимизационных мер",
            description:
        "Проводим техническую и контентную оптимизацию, работаем над внешними факторами ранжирования.",
        },
        {
            image: <SeoHowWeWork4 />,
            number: "04",
            title: "Отслеживание результатов и отчеты",
            description:
        "Регулярно предоставляем отчеты о проделанной работе и достигнутых результатах",
        },
        {
            image: <SeoHowWeWork5 />,
            number: "05",
            title: "Постоянное улучшение",
            description:
        "Адаптируем стратегию в соответствии с изменениями алгоритмов поисковых систем и рыночными тенденциями",
        },
    ],
};

//CONTEXT AD
export const contextAdData: ISmmCreatingAdData = {
    title: "Почему контекстная реклама?",
    items: [
        {
            image: "/images/services/context-ad/card_1.webp",
            icon: <ContextAdCard1Icon />,
            title: "Точный таргетинг",
            description:
        "Ваши объявление видят пользователи уже заинтересованные в ваших товарах или услугах.",
        },
        {
            image: "/images/services/context-ad/card_2.webp",
            icon: <ContextAdCard2Icon />,
            title: "Гибкий бюджет",
            description:
        "Контролируйте расходы, оплачивая только реальные клики по вашим объявлениям.",
        },
        {
            image: "/images/services/context-ad/card_3.webp",
            icon: <ContextAdCard3Icon />,
            title: "Измеримый эффект",
            description:
        "Отслеживайте эффективность рекламы с помощью точной аналитики.",
        },
    ],
};

export const contextAdCardData: ISmmTeamMembers = {
    title: "Как мы работаем",
    items: [
        {
            image: <ServiceBrandingIcon1 />,
            number: "01",
            title: "Изучаем вашу нишу, конкурентов и целевую аудиторию",
            isContextAd: true,
        },
        {
            image: <ContextAd2Icon />,
            number: "02",
            title: "Определяем запросы, по которым вас будут находить клиенты",
            isContextAd: true,
        },
        {
            image: <ContextAd3Icon />,
            number: "03",
            title: "Пишем привлекательные тексты и создаем эффективные креативы",
            isContextAd: true,
        },
        {
            image: <ContextAd4Icon />,
            number: "04",
            title:
        "Запускаем кампании в Google Ads и Яндекс Директ с точным таргетингом",
            isContextAd: true,
        },
        {
            image: <ContextAd5Icon />,
            number: "05",
            title: "Постоянно следим за результатами и вносим улучшения",
            isContextAd: true,
        },
        {
            image: <ContextAd6Icon />,
            number: "06",
            title: "Предоставляем регулярные отчеты и предлагаем стратегии для роста",
            isContextAd: true,
        },
    ],
};
