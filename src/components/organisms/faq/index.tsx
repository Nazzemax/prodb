import { Heading } from '@/components/atoms/heading'
import { FaqItem } from '@/components/molecules/faq-item'
import { Accordion } from '@/components/ui/accordion'
import React from 'react'

const faq = [
    {
        question: 'Сколько времени занимает SEO-оптимизация?',
        answer: 'SEO — это долгосрочная стратегия. Первые результаты обычно видны через 2-3 месяца, но значимые достижения требуют 6-12 месяцев работы.'
    },
    {
        question: 'Можно ли гарантировать выход в топ-1?',
        answer: 'SEO — это долгосрочная стратегия. Первые результаты обычно видны через 2-3 месяца, но значимые достижения требуют 6-12 месяцев работы.'
    },
    {
        question: 'Сколько стоит SEO-продвижение?',
        answer: 'SEO — это долгосрочная стратегия. Первые результаты обычно видны через 2-3 месяца, но значимые достижения требуют 6-12 месяцев работы.'
    },
]

export const Faq = () => {
    return (
        <div className='max-w-[1920px] bg-background-gray'>
            <div className='max-w-[1280px] m-auto py-10 md:py-24'>
                <Heading as='h2' className='text-center mb-16'>Часто задаваемые вопросы</Heading>
                <Accordion type="single" collapsible className='max-w-[800px] m-auto space-y-3 px-5 lg:px-0'>
                    {faq.map((item) => (
                        <FaqItem
                            key={item.question}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
