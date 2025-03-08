import { Heading } from "@/components/atoms/heading"
import { MarketingResultItem } from "@/components/molecules/marketing-result-item"
import { AwardBg } from "@/assets/backgrounds";


const data = [
    {
        number: '01',
        text: 'Сформированный отдел маркетинга, работающий как слаженный механизм.'
    },
    {
        number: '02',
        text: 'Чёткая политика продвижения и финансовая модель, позволяющая прогнозировать расходы и доходы.'
    },
    {
        number: '03',
        text: 'Подготовленный маркетолог, знающий все тонкости продвижения именно вашего продукта или услуги.'
    },
    {
        number: '04',
        text: 'Постоянный рост ключевых показателей: заявок, продаж, лояльности клиентов.'
    },
]

export const MarketingResults = () => {
    return (
        <div className="relative w-full max-w-[1920px] bg-background-dark overflow-hidden">
            <div className="max-w-[1280px] m-auto flex flex-col py-8 md:py-28 px-4 md:px-16 lg:px-32 xl:px-0">
                <Heading as="h2" className="text-primary-foreground">Результат</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    {data.map((item) => (
                        <MarketingResultItem
                            key={item.number}
                            number={item.number}
                            text={item.text}
                        />
                    ))}
                </div>
            </div>
            <AwardBg className="absolute top-0 md:top-20 md:left-2/4" />
        </div>
    )
}