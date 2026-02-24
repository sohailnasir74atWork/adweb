import { locales, defaultLocale } from '@/i18n/config';

const DOMAIN = 'https://adoptmevalues.app';

/**
 * Generate locale-aware canonical URL and hreflang alternates for SEO.
 * Used in generateMetadata() across all pages.
 */
export function getLocalizedAlternates(path: string, locale: string) {
    // Canonical: include locale prefix only for non-default locales
    const canonical = locale === defaultLocale
        ? `${DOMAIN}${path}`
        : `${DOMAIN}/${locale}${path}`;

    // Hreflang alternates for all locales
    const languages: Record<string, string> = {};
    for (const loc of locales) {
        languages[loc] = loc === defaultLocale
            ? `${DOMAIN}${path}`
            : `${DOMAIN}/${loc}${path}`;
    }
    // x-default points to the default locale version
    languages['x-default'] = `${DOMAIN}${path}`;

    return {
        canonical,
        languages,
    };
}
