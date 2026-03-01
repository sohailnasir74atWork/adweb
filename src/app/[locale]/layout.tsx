import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Providers } from "@/components/providers/Providers";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";
import { WebVitalsReporter } from "@/components/analytics/WebVitalsReporter";
import { routing } from "@/i18n/routing";
import "../globals.css";

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"],
    weight: ["400", "700", "800"],
    display: "swap",
});

const nunitoSans = Nunito_Sans({
    variable: "--font-nunito-sans",
    subsets: ["latin"],
    weight: ["400", "600"],
    display: "swap",
});

// Map i18n locale codes to OpenGraph locale format
const ogLocaleMap: Record<string, string> = {
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    ar: 'ar_SA',
    de: 'de_DE',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: {
            default: t('homeTitle'),
            template: "%s | Adopt Me Values",
        },
        description: t('homeDescription'),
        keywords: [
            "adopt me values",
            "adopt me trading values",
            "adopt me trade calculator",
            "adopt me value checker",
            "adopt me pet values",
            "trading values adopt me",
            "adopt me value list",
            "adopt me values 2026",
            "roblox adopt me values",
            "adopt me trading",
            "trade values adopt me",
            "adopt me trade checker",
            "adopt me gg",
            "adopt me neon values",
            "adopt me mega neon values",
        ],
        metadataBase: new URL("https://adoptmevalues.app"),
        openGraph: {
            type: "website",
            locale: ogLocaleMap[locale] || 'en_US',
            siteName: "Adopt Me Values",
            title: t('homeTitle'),
            description: t('homeDescription'),
            images: [
                {
                    url: "/og-banner.webp",
                    width: 1200,
                    height: 630,
                    alt: "Adopt Me Values — Trade Calculator, Pet Values & Community Chat",
                },
                {
                    url: "/og-portrait.webp",
                    width: 630,
                    height: 1200,
                    alt: "Adopt Me Values App — Trade, Chat, Feeds & Fun",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            site: "@adoptmevalues",
            creator: "@adoptmevalues",
            title: t('homeTitle'),
            description: t('homeDescription'),
            images: ["/og-banner.webp"],
        },
        icons: {
            icon: [
                { url: "/favicon.ico", sizes: "any" },
                { url: "/logo.webp", type: "image/webp" },
            ],
            apple: "/logo.webp",
        },
        verification: {
            other: {
                "p:domain_verify": ["955b6494657c81a62dcad3a3c68caafb"],
            },
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as typeof routing.locales[number])) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://elvebredd.com" />
                <link rel="preconnect" href="https://adoptme.b-cdn.net" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
                <meta name="p:domain_verify" content="955b6494657c81a62dcad3a3c68caafb" />
                <meta name="google-adsense-account" content="ca-pub-3701208411582706" />
            </head>
            <body
                className={`${nunito.variable} ${nunitoSans.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <Providers>{children}</Providers>
                    <ServiceWorkerRegistration />
                    <WebVitalsReporter />
                </NextIntlClientProvider>

                {/* Google Analytics (GA4) — lazy loaded to reduce TBT */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-NXXEKW69PT"
                    strategy="lazyOnload"
                />
                <Script id="ga4-init" strategy="lazyOnload">
                    {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-NXXEKW69PT');`}
                </Script>

                {/* Google AdSense — lazy loaded for better performance */}
                <Script
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3701208411582706"
                    strategy="lazyOnload"
                    crossOrigin="anonymous"
                />
            </body>
        </html>
    );
}
