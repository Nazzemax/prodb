import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import InstagramIcon from '@/assets/socials/instagram.svg';
import FacebookIcon from '@/assets/socials/facebook.svg';
import WhatsAppIcon from '@/assets/socials/whatsapp.svg';
import { motion } from 'framer-motion';
import { fadeIn, viewportConfig, staggerTransition } from '@/lib/motion';
import { useAppData } from '@/context/app-context';

interface LinkProps {
    title?: string;
    label?: string;
    icon?: React.ReactNode;
    href?: string;
    hasScrollToReview?: boolean;
}

const links: {
    title: string;
    items: LinkProps[];
}[] = [
    {
        title: 'О компании',
        items: [
            { title: 'О нас', href: '/about' },
            { title: 'Кейсы', href: '/cases' },
            { title: 'Отзывы', hasScrollToReview: true }
        ]
    },
    {
        title: 'Услуги',
        items: [
            { title: 'Брендинг', href: '/services/branding' },
            { title: 'Digital продвижение', href: '/services/smm' },
            { title: 'Видеопродакшн', href: '/services/video-production' },
            { title: 'Веб-разработка и дизайн', href: '/services/site-creating' },
            { title: 'Комплексное маркетинговое продвижение', href: '/services/marketing-support' },
            { title: 'Автоматизация и аналитика', href: '/services/crm' }
        ]
    },
    {
        title: 'Мы есть',
        items: [
            { href: 'https://www.instagram.com/boldbrands.international', icon: <InstagramIcon />, label: 'Instagram' },
            { href: 'https://www.facebook.com/boldbrands.kg', icon: <FacebookIcon />, label: 'Facebook' },
            { href: 'https://wa.me/996999992244', icon: <WhatsAppIcon />, label: 'WhatsApp' }
        ]
    }
];

const contacts: { label: string; title: string; href?: string; }[] = [
    {
        label: 'Адрес (Бишкек)',
        title: 'ул. Матросова, дом 102',
        href: 'https://2gis.kg/bishkek/inside/15763234350961665/firm/70000001074948407?m=74.618308%2C42.846298%2F16.57'
    },
    {
        label: 'Адрес (Ташкент)',
        title: 'Яшнободский район, Янгибозор 1',
    },
    {
        label: 'Телефон (Бишкек)',
        title: '+996 999 50 44 44',
        href: 'tel:+996 999 50 44 44'
    },
    {
        label: 'Телефон (Ташкент)',
        title: '+998 909 36 09 36',
        href: 'tel:+998 909 36 09 36'
    },
    {
        label: 'Электронная почта',
        title: 'info@boldbrands.kg',
        href: 'mailto:info@boldbrands.kg'
    },
    {
        label: 'Работаем',
        title: 'Пн — Пт 9:00 — 18:00',
    },
]

export const FooterLinks = () => {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 lg:gap-y-10 gap-x-3">
            {links.map(({ title, items }, idx) => (
                <motion.div
                    key={title}
                    variants={fadeIn('up', 'spring', idx * 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                    transition={staggerTransition(idx)}
                    className="flex flex-col gap-y-3"
                >
                    <h2 className="text-xl">{title}</h2>
                    <ul className={cn('text-lg text-gray2', items[0].icon ? 'flex gap-x-3' : '')}>
                        {items.map((item) =>
                            item.icon ? (
                                <SocialItem key={item.href} {...item} />
                            ) : (
                                <LinkItem key={item.title} {...item} />
                            )
                        )}
                    </ul>
                </motion.div>
            ))}
            {contacts.map((contact, idx) => (
                <motion.div
                    key={contact.label}
                    variants={fadeIn('up', 'spring', idx * 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                    transition={staggerTransition(idx)}
                    className="flex flex-col gap-y-3"
                >
                    <ContactItem
                        label={contact.label}
                        title={contact.title}
                        href={contact.href}
                    />
                </motion.div>

            ))}
        </div>
    )
};

const ContactItem = ({ label, href, title }: { label: string; href?: string; title: string; }) => (
    <li className="flex flex-col gap-y-2">
        <span className='text-gray2 text-sm'>{label}</span>
        {href
            ?
            <Link
                target='_blank'
                href={href}
                className='hover:text-accent text-lg text-primary'
            >
                {title}
            </Link>
            :
            <div
                className='text-lg text-primary'
            >
                {title}
            </div>}
    </li>
);

const SocialItem = ({ href, icon, label }: LinkProps) => (
    <li className="flex items-center gap-x-2">
        <Link className="hover:text-accent rounded-full hover:shadow-md transition-all duration-300" href={href || ''} target="_blank" aria-label={label}>
            {icon}
        </Link>
    </li>
);

const LinkItem = ({ href, title, hasScrollToReview }: LinkProps) => {
    const { scrollToReview } = useAppData()

    return (
        <li className=''>
            <Link
                className="hover:text-accent"
                href={href || ''}
                onClick={(e) => {
                    if (hasScrollToReview) {
                        e.preventDefault(); // Чтобы страница не перезагружалась
                        scrollToReview();
                    }
                }}
            >
                {title}
            </Link>
        </li>
    );
}