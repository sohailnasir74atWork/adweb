import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
    title: 'Blog — Adopt Me Values',
    description: 'Read the latest Adopt Me guides, pet reviews, trading tips, and value updates for Roblox Adopt Me 2026.',
};

export default async function BlogLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="mx-auto max-w-4xl w-full">
            {children}
        </div>
    );
}
