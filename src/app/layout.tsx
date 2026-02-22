import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Adopt Me Values — Free Pet Value List & Trade Calculator 2026",
    template: "%s | Adopt Me Values",
  },
  description:
    "Check Adopt Me trading values and use our free trade calculator to see if your Roblox Adopt Me trade is fair. Updated daily with every pet, neon, mega neon, fly, and ride value.",
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
    locale: "en_US",
    siteName: "Adopt Me Values",
    title: "Adopt Me Values 2026 — Free Pet Trading Values & Trade Calculator",
    description: "The #1 Adopt Me value list and trade calculator for Roblox. Check every pet trading value, use our value checker, and see if your trade is fair.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adopt Me Values — Free Pet Value List & Trade Calculator 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adopt Me Values 2026 — Pet Trading Values & Trade Calculator",
    description: "Check every Adopt Me pet trading value. Free value checker and trade calculator updated daily for Roblox.",
  },
  alternates: {
    canonical: "https://adoptmevalues.app",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.webp", type: "image/webp" },
    ],
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://elvebredd.com" />
        <link rel="preconnect" href="https://adoptme.b-cdn.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google Analytics (GA4) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NXXEKW69PT"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-NXXEKW69PT');`,
          }}
        />
        {/* Pinterest Domain Verification */}
        <meta name="p:domain_verify" content="955b6494657c81a62dcad3a3c68caafb" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5740215782746766"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${nunito.variable} ${nunitoSans.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
