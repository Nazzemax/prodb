import Link from 'next/link';
import React from 'react';
import InstagramIcon from '@/assets/socials/instagram.svg';
import FacebookIcon from '@/assets/socials/facebook.svg';
import WhatsAppIcon from '@/assets/socials/whatsapp.svg';
import TelegramIcon from '@/assets/socials/telegram.svg';
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
        subtitle?: string;
        items: LinkProps[];
    }[] = [
        {
            title: t('titles.about'),
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
            title: t('socialLinks.title'),
            subtitle:t('socialLinks.sub_title'),
            items: [
                { href: 'https://www.instagram.com/boldbrands.international', icon: <InstagramIcon />, label: 'Instagram' },
                { href: 'https://www.facebook.com/boldbrands.kg', icon: <FacebookIcon />, label: 'Facebook' },
                { href: 'https://wa.me/996999992244', icon: <WhatsAppIcon />, label: 'WhatsApp' }
            ],
        },
        {
            title: t('socialLinks.title'),
            subtitle:t('socialLinks.sub_title2'),
            items: [
                { href: 'https://www.instagram.com/boldbrands.uz/', icon: <InstagramIcon />, label: 'Instagram' },
                { href: 'https://www.facebook.com/profile.php?id=61571120907112&locale=ru_RU', icon: <FacebookIcon />, label: 'Facebook' },
                { href: 'https://t.me/boldbrandsuz', icon: <TelegramIcon />, label: 'Telegram' }
            ],
        }
           
    ];
    
    const bishkekContacts = [
        {
            label: data?.addresses?.[0]?.title || 'Адрес (Бишкек)',
            title: data?.addresses?.[0]?.address || 'ул. Матросова, дом 102',
            href: 'https://2gis.kg/bishkek/inside/15763234350961665/firm/70000001074948407?m=74.618308%2C42.846298%2F16.57'
        },
        {
            label: data?.phones?.[0]?.title || 'Телефон (Бишкек)',
            title: data?.phones?.[0]?.phone || '+996 999 99 22 44',
            href: data?.phones?.[0]?.phone ? `tel:${data?.phones?.[0]?.phone.replace(/\s+/g, '')}` : undefined
        },
        {
            label: data?.emails?.[0]?.title || 'Электронная почта (Бишкек)',
            title: data?.emails?.[0]?.email || 'office.kg@boldbrands.pro',
            href: data?.emails?.[0]?.email ? `mailto:${data?.emails?.[0]?.email}` : undefined
        }
    ];

    const tashkentContacts = [
        {
            label: data?.addresses?.[1]?.title || 'Адрес (Ташкент)',
            title: data?.addresses?.[1]?.address || 'Яшнободский район, Янгибозор 1/4',
            href: 'https://go.2gis.com/0MCXh'
        },
        {
            label: data?.phones?.[1]?.title || 'Телефон (Ташкент)',
            title: data?.phones?.[1]?.phone || '+998 90 054 34 45',
            href: data?.phones?.[1]?.phone ? `tel:${data?.phones?.[1]?.phone.replace(/\s+/g, '')}` : undefined
        },
        {
            label: data?.emails?.[1]?.title || 'Электронная почта (Ташкент)',
            title: data?.emails?.[1]?.email || 'office.uz@boldbrands.pro',
            href: data?.emails?.[1]?.email ? `mailto:${data?.emails?.[1]?.email}` : undefined
        }
    ];

    const workHours = t('socialLinks.workHours');

    const isSocialBlock = (block: { items: LinkProps[] }) => block.items.every((i) => !!i.icon);

    // разделим links на обычные блоки и социальные блоки
    const normalLinks = links.filter((l) => !isSocialBlock(l));
    const socialBlocks = links.filter((l) => isSocialBlock(l));
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 lg:gap-y-10 gap-x-3">
            {/* Рендер обычных блоков (колонки 1 и 2 будут заполняться естественно) */}
            {normalLinks.map(({ title, items }, idx) => (
                <div key={`normal-${idx}`} className="flex flex-col gap-y-3">
                    <h2 className="text-xl">{title}</h2>
                    <ul className="text-lg text-gray2 space-y-3">
                        {items.map((item, itemIdx) =>
                            item.icon ? (
                                <SocialItem key={`normal-social-${itemIdx}`} {...item} />
                            ) : (
                                <LinkItem key={`normal-link-${itemIdx}`} {...item} />
                            )
                        )}
                    </ul>
                </div>
            ))}

            {/* Отдельный контейнер для "Мы есть" — фиксируем в 3-й колонке и ставим вертикально */}
            <div className="lg:col-start-3 flex flex-col gap-y-6">
                {socialBlocks.map((block, bIdx) => (
                    <div key={`social-block-${bIdx}`} className="flex flex-col gap-y-3">
                        <h2 className="text-xl">{block.title}</h2>
                        <h3 className='text-lg'>{block.subtitle}</h3>
                        <ul className="flex gap-y-3 gap-x-3">
                            {block.items.map((item, iIdx) => (
                                <SocialItem key={`social-${bIdx}-${iIdx}`} {...item} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
      
            <div className="flex flex-col gap-y-4 lg:col-start-1 lg:row-start-2">        
                {bishkekContacts.map((c, i) => (
                    <ContactItem key={`bish-${i}`} label={c.label} title={c.title} href={c.href} />
                ))}
            </div>

            <div className="flex flex-col gap-y-4 lg:col-start-2 lg:row-start-2">
                {tashkentContacts.map((c, i) => (
                    <ContactItem key={`tash-${i}`} label={c.label} title={c.title} href={c.href} />
                ))}
            </div>

            <div className="flex flex-col gap-y-2 lg:col-start-3 lg:row-start-2">
                <h3 className="text-gray2 text-sm">{workHours}</h3>
                <div className="text-lg text-primary">
                    {data?.work_time || 'Пн-Пт: 09:00-18:00'}
                </div>
            </div>
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