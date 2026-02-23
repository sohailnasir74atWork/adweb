'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const FLAGS: Record<Locale, string> = {
    en: '🇺🇸',
    es: '🇪🇸',
    pt: '🇧🇷',
    tr: '🇹🇷',
    fr: '🇫🇷',
    ar: '🇸🇦',
    de: '🇩🇪',
};

export function LanguageSwitcher() {
    const locale = useLocale() as Locale;
    const pathname = usePathname();
    const router = useRouter();

    function switchLocale(newLocale: Locale) {
        // Remove current locale prefix from pathname
        let path = pathname;
        for (const loc of locales) {
            if (path.startsWith(`/${loc}/`)) {
                path = path.slice(loc.length + 1);
                break;
            } else if (path === `/${loc}`) {
                path = '/';
                break;
            }
        }

        // Build new path
        const newPath = newLocale === 'en' ? path : `/${newLocale}${path}`;
        router.push(newPath);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="tap-target h-10 w-10 rounded-xl">
                    <span className="text-base">{FLAGS[locale]}</span>
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px]">
                {locales.map((loc) => (
                    <DropdownMenuItem
                        key={loc}
                        onClick={() => switchLocale(loc)}
                        className={`flex items-center gap-2.5 cursor-pointer ${loc === locale ? 'bg-accent font-bold' : ''}`}
                    >
                        <span className="text-base">{FLAGS[loc]}</span>
                        <span className="text-sm">{localeNames[loc]}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
