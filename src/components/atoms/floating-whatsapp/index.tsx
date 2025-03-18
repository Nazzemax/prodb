'use client';

import React from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const FloatingWhatsapp = () => {
    return <FloatingWhatsApp
        phoneNumber="+996999504444" // Номер телефона в международном формате
        accountName="Bold Brands International"
        notificationSound
        chatMessage="Доброго времени суток, чем могу вам помочь?"
        statusMessage="Онлайн"
        darkMode
        avatar="/bold_logo.svg"
        placeholder="Введите текст"
    />
}

export default FloatingWhatsapp;