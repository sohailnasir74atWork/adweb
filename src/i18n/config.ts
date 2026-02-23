export const locales = ['en', 'es', 'pt', 'tr', 'fr', 'ar', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
    en: 'English',
    es: 'Español',
    pt: 'Português',
    tr: 'Türkçe',
    fr: 'Français',
    ar: 'العربية',
    de: 'Deutsch',
};
