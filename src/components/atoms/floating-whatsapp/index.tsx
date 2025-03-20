'use client';

import { useAppData } from '@/context/app-context';
import React, { useEffect, useState } from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const FloatingWhatsapp = () => {
    const [mounted, setMounted] = useState(false)
    // const isUz = localStorage.getItem("locale")
    const { data } = useAppData()
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null;
    }

    if(!data) return null

    return (
        <FloatingWhatsApp
            phoneNumber={data?.phones[0].phone.split(" ").join("")} 
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