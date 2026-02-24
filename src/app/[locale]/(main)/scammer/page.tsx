import { ShieldAlert } from 'lucide-react';
import { ScammerDatabase } from '@/components/scammer/ScammerDatabase';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const { canonical, languages } = getLocalizedAlternates('/scammer', locale);
    return {
        title: t('scammerTitle'),
        description: t('scammerDescription'),
        alternates: { canonical, languages },
    };
}

export default async function ScammerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale });

    return (
        <div className="flex flex-col gap-6">
            <section>
                <div className="flex items-center gap-3">
                    <ShieldAlert className="h-8 w-8 text-red-500" />
                    <div>
                        <h1 className="text-3xl font-bold">{t('scammer.title')}</h1>
                        <p className="text-muted-foreground text-sm mt-0.5">
                            {t('scammer.subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            <ScammerDatabase />

            <section className="prose dark:prose-invert max-w-none mt-4">
                <h2>{t('scammer.howItWorks')}</h2>
                <p>{t('scammer.howItWorksDesc')}</p>
                <h3>{t('scammer.safetyTips')}</h3>
                <ul>
                    <li>{t('scammer.tip1')}</li>
                    <li>{t('scammer.tip2')}</li>
                    <li>{t('scammer.tip3')}</li>
                    <li>{t('scammer.tip4')}</li>
                </ul>
            </section>
        </div>
    );
}
