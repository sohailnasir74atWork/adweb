'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const FLAGS: Record<Locale, string> = {
    en: '🇺🇸',
    es: '🇪🇸',
    fr: '🇫🇷',
    ar: '🇸🇦',
    de: '🇩🇪',
};

export function LanguageSwitcher() {
    const locale = useLocale() as Locale;
    const pathname = usePathname();
    const router = useRouter();

    function switchLocale(newLocale: Locale) {
        // next-intl's useRouter handles locale prefix automatically
        router.replace(pathname, { locale: newLocale });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="tap-target h-10 w-10 rounded-xl">
                    <span className="text-base">{FLAGS[locale]}</span>
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="min-w-[160px] z-[100]">
                {locales.map((loc) => (
                    <DropdownMenuItem
                        key={loc}
                        onClick={() => switchLocale(loc)}
                        className={`flex items-center gap-2.5 cursor-pointer py-2.5 ${loc === locale ? 'bg-accent font-bold' : ''}`}
                    >
                        <span className="text-base">{FLAGS[loc]}</span>
                        <span className="text-sm">{localeNames[loc]}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
