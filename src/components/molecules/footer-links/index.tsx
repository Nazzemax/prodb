import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import InstagramIcon from '@/assets/socials/instagram.svg';
import FacebookIcon from '@/assets/socials/facebook.svg';
import WhatsAppIcon from '@/assets/socials/whatsapp.svg';
import { useAppData } from '@/context/app-context';
import { useTranslations } from 'next-intl';

interface LinkProps {
    title?: string;
    label?: string;
    icon?: React.ReactNode;
    href?: string;
    hasScrollToReview?: boolean;
}



export const FooterLinks = () => {
    const t = useTranslations("footer")
    const { data } = useAppData()

    const links: {
        title: string;
        items: LinkProps[];
    }[] = [
        {
            title: 'О компании',
            items: [
                { title: t('companyLinks.aboutUs'), href: '/about' },
                { title: t('companyLinks.cases'), href: '/cases' },
                { title: t('companyLinks.reviews'), hasScrollToReview: true }
            ]
        },
        {
            title: t('title'),
            items: [
                { title: t('servicesLinks.branding'), href: '/services/branding' },
                { title: t('servicesLinks.digitalMarketing'), href: '/services/smm' },
                { title:  t('servicesLinks.videoProduction'), href: '/services/video-production' },
                { title:  t('servicesLinks.webDevelopment'), href: '/services/site-creating' },
                { title:  t('servicesLinks.marketingSupport'), href: '/services/marketing-support' },
                { title:  t('servicesLinks.automationAnalytics'), href: '/services/crm' },
                { title:  t('servicesLinks.printing'), href: '/services/operative-print'}
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
            label: data?.addresses[0].title || "",
            title: data?.addresses[0].address || "",
            href: 'https://2gis.kg/bishkek/inside/15763234350961665/firm/70000001074948407?m=74.618308%2C42.846298%2F16.57'
        },
        {
            label: data?.addresses[1].title || "",
            title: data?.addresses[1].address || "",
            href: 'https://go.2gis.com/0MCXh'
        },
        { 
            label: data?.phones[0].title || "",
            title: data?.phones[0].phone || "" ,
            href: 'https://api.whatsapp.com/send/?phone=996999504444&text&type=phone_number&app_absent=0'
        },
        {
            label: data?.phones[1].title || "",
            title: data?.phones[1].phone || "" ,
            href: 'https://api.whatsapp.com/send?phone=998909360936'
        },
        {
            label: data?.emails[0].title || "Электронная почта",
            title:  data?.emails[0].email || "info@boldbrands.kg",
            href: 'mailto:info@boldbrands.kg'
        },
        {
            label: 'Работаем',
            title: data?.work_time || "Пн-Пт: 09:00-18:00",
        },
    ]
    
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 lg:gap-y-10 gap-x-3">
            {links.map(({ title, items }, idx) => (
                <div
                    key={idx}
                    className="flex flex-col gap-y-3"
                >
                    <h2 className="text-xl">{title}</h2>
                    <ul className={cn('text-lg text-gray2', items[0].icon ? 'flex gap-x-3' : 'space-y-3')}>
                        {items.map((item) =>
                            item.icon ? (
                                <SocialItem key={item.href} {...item} />
                            ) : (
                                <LinkItem key={item.title} {...item} />
                            )
                        )}
                    </ul>
                </div>
            ))}
            {contacts.map((contact, idx) => (
                <ul
                    key={idx}
                    className="flex flex-col gap-y-3"
                >
                    <ContactItem
                        label={contact.label}
                        title={contact.title}
                        href={contact.href}
                    />
                </ul>

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