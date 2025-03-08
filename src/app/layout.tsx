import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { Providers } from "@/providers";

const cannonade = localFont({
    src: [
        {
            path: '../../public/fonts/Cannonade Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Cannonade.ttf',
            weight: '500',
            style: 'normal',
        }
    ]
})

export const metadata: Metadata = {
    title: "Bold Brands",
    description: "Bold Brands International ваш внешний отдел маркетинга",
};

function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </head>
            <body
                className={`${cannonade.className} antialiased`}
            >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}

export default RootLayout