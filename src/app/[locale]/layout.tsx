/* eslint-disable @next/next/no-img-element */
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import Script from "next/script";

import { routing } from "../../i18n/routing";
import dynamic from "next/dynamic";
import Footer from "@/components/organisms/footer";
import Header from "@/components/organisms/header";
const FloatingWhatsapp = dynamic(
    () => import("@/components/atoms/floating-whatsapp")
);
import { getCompanyInfo } from "@/api/Company";
import { getBusinessTypes } from "@/api/BusinessType";

const cannonade = localFont({
    src: [
        {
            path: "../../../public/fonts/Cannonade Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../../public/fonts/Cannonade.woff2",
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
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: "/apple-touch-icon.png",
        other: {
            rel: "manifest",
            url: "/site.webmanifest",
        },
    },
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const revalidate = 60;

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    const [companyInfoResult, businessTypesResult] = await Promise.allSettled([
        getCompanyInfo(),
        getBusinessTypes(),
    ]);

    const companyInfo =
        companyInfoResult.status === "fulfilled" ? companyInfoResult.value : null;
    const businessTypes =
        businessTypesResult.status === "fulfilled" ? businessTypesResult.value : [];
    return (
        <html lang={locale}>
            <head>
                <Script id="gtm-init" strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TWLSLSMG');`}
                </Script>
                <Script id="yandex-metrika-script" strategy="lazyOnload">
                    {`
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) { return; }
    }
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(100644188, "init", {
         clickmap:true,
         trackLinks:true,
         accurateTrackBounce:true,
         webvisor:true
    });
  `}
                </Script>     
                <meta name="viewport" content="initial-scale=1, width=device-width" />

             
                <noscript>
                    <div>
                        <img
                            src="https://mc.yandex.ru/watch/100644188"
                            style={{ position: "absolute", left: "-9999px" }}
                            alt=""
                        />
                    </div>
                </noscript>

                {/* Метрика Facebook Pixel */}
                <Script
                    id="facebook-pixel"
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{
                        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '681332601016811');
            fbq('track', 'PageView');`,
                    }}
                />
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src="https://www.facebook.com/tr?id=681332601016811&ev=PageView&noscript=1"
                        alt=""
                    />
                </noscript>
            </head>
            <body className={`${cannonade.className} antialiased `}>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html:
              '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TWLSLSMG" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
                    }}
                ></noscript>
                <noscript>
                    <div>
                        <img
                            src="https://mc.yandex.ru/watch/100644188"
                            style={{ position: "absolute", left: "-9999px" }}
                            alt="Yandex Metrika"
                        />
                    </div>
                </noscript>
                <noscript>
                    {}
                    <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src="https://www.facebook.com/tr?id=681332601016811&ev=PageView&noscript=1"
                        alt="Facebook Pixel"
                    />
                </noscript>
                <NextIntlClientProvider messages={messages}>
                    <Providers
                        initialAppData={{
                            companyInfo,
                            businessTypes,
                        }}
                    >
                        <div className="max-w-[1920px] m-auto relative">
                            <Header />
                            <FloatingWhatsapp />
                            <main>{children}</main>
                            <Footer />
                        </div>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
