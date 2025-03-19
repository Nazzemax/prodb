import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import { Footer } from "@/components/organisms/footer";
import { Header } from "@/components/organisms/header";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";

import { routing } from "../../i18n/routing";

const cannonade = localFont({
    src: [
        {
            path: "../../../public/fonts/Cannonade Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../../public/fonts/Cannonade.ttf",
            weight: "500",
            style: "normal",
        },
    ],
});

export const metadata: Metadata = {
    title: "Bold Brands",
    description: "Bold Brands International ваш внешний отдел маркетинга",
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
        other: {
            rel: 'manifest',
            url: '/site.webmanifest',
        },
    }
};

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();
    return (
        <html lang={locale}>
            <head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </head>
            <body className={`${cannonade.className} antialiased `}>
                <NextIntlClientProvider messages={messages}>
                    <Providers>
                        <div className="max-w-[1920px] m-auto relative">
                            <Header />
                            <main>{children}</main>
                            <Footer />
                        </div>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
