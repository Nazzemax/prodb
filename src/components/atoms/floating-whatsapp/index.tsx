'use client';

import { useAppData } from '@/context/app-context';
import React, { useEffect, useState } from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const FloatingWhatsapp = () => {
    const [mounted, setMounted] = useState(false)
    const [locale, setLocale] = useState<string | null>(null);
    const { data } = useAppData()
    useEffect(() => {
        setMounted(true);
        setLocale(localStorage.getItem("locale"));
    }, [])

    if (!mounted || !data) return null;

    return (   
        <FloatingWhatsApp
            phoneNumber={locale === "uz"
                ? data?.phones[1].phone.replace(/\s/g, "")
                : data?.phones[0].phone.replace(/\s/g, "")
            }
            accountName="Bold Brands International"
            notificationSound
            chatMessage="Доброго времени суток, чем могу вам помочь?"
            statusMessage="Онлайн"
            darkMode
            avatar="https://bishkek.headhunter.kg/employer-logo/6266415.png"
            placeholder="Введите текст"
        /> 
    );
}

export default FloatingWhatsapp;