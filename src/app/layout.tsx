import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Adopt Me Values — Free Pet Value List & Trade Calculator 2025",
    template: "%s | Adopt Me Values",
  },
  description:
    "Check Adopt Me pet values and use our free trade calculator to see if your trade is fair. Updated daily with every pet, neon, and mega neon value.",
  keywords: [
    "adopt me values",
    "adopt me trading",
    "adopt me calculator",
    "adopt me pet values",
    "adopt me trade checker",
    "adopt me value list",
    "roblox adopt me",
  ],
  metadataBase: new URL("https://adoptmevalues.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Adopt Me Values",
    title: "Adopt Me Values — Free Pet Value List & Trade Calculator",
    description: "The #1 Adopt Me value list and trade calculator. Check every pet value and see if your trade is fair.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adopt Me Values — Free Pet Value List & Trade Calculator",
    description: "Check every Adopt Me pet value. Free trade calculator updated daily.",
  },
  alternates: {
    canonical: "https://adoptmevalues.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${nunitoSans.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
