import Link from 'next/link';
import { config } from '@/lib/constants/config';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { Heart, TrendingUp, Calculator, Handshake, MessageCircle, Smartphone } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'about' });
    const { canonical, languages } = getLocalizedAlternates('/about', locale);
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        alternates: { canonical, languages },
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'about' });
    const tn = await getTranslations({ locale, namespace: 'nav' });

    const FEATURES = [
        {
            icon: TrendingUp,
            title: t('featureValuesTitle'),
            description: t('featureValuesDesc'),
        },
        {
            icon: Calculator,
            title: t('featureCalculatorTitle'),
            description: t('featureCalculatorDesc'),
        },
        {
            icon: Handshake,
            title: t('featureTradesTitle'),
            description: t('featureTradesDesc'),
        },
        {
            icon: MessageCircle,
            title: t('featureChatTitle'),
            description: t('featureChatDesc'),
        },
    ];

    const orgJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: config.appName,
        url: config.domain,
        logo: `${config.domain}/logo.webp`,
        description: t('metaDescription'),
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: config.supportEmail,
        },
    };

    const localizedBase = locale === 'en' ? config.domain : `${config.domain}/${locale}`;
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: tn('home'), item: localizedBase },
            { '@type': 'ListItem', position: 2, name: t('pageTitle') },
        ],
    };

    return (
        <div className="mx-auto max-w-3xl w-full">
            <JsonLd data={orgJsonLd} />
            <JsonLd data={breadcrumbJsonLd} />
            <article className="prose dark:prose-invert max-w-none">
                <h1>{t('pageTitle')}</h1>

                <p className="lead">
                    {t.rich('intro', {
                        strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                </p>

                <h2>{t('whatWeOffer')}</h2>
            </article>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {FEATURES.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.title}
                            className="rounded-2xl border bg-card p-5 flex flex-col gap-3"
                        >
                            <div className="rounded-xl bg-app-primary/10 w-10 h-10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-app-primary" />
                            </div>
                            <h3 className="font-bold text-base">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    );
                })}
            </div>

            <article className="prose dark:prose-invert max-w-none">
                <h2>{t('missionTitle')}</h2>
                <p>{t('missionP1')}</p>
                <p>
                    {t.rich('missionP2', {
                        strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                </p>

                <h2>{t('availableTitle')}</h2>
                <p>{t('availableIntro')}</p>
                <ul>
                    <li>
                        {t.rich('availableWeb', {
                            strong: (chunks) => <strong>{chunks}</strong>,
                        })}
                        {' '}<a href={config.domain}>{config.domain}</a>
                    </li>
                    <li>
                        {t.rich('availableAndroid', {
                            strong: (chunks) => <strong>{chunks}</strong>,
                            link: (chunks) => <a href={config.androidLink} target="_blank" rel="noopener noreferrer">{chunks}</a>,
                        })}
                    </li>
                    <li>
                        {t.rich('availableIos', {
                            strong: (chunks) => <strong>{chunks}</strong>,
                            link: (chunks) => <a href={config.iosLink} target="_blank" rel="noopener noreferrer">{chunks}</a>,
                        })}
                    </li>
                </ul>

                <h2>{t('notAffiliatedTitle')}</h2>
                <p>
                    {t.rich('notAffiliatedDesc', {
                        strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                </p>

                <h2>{t('contactTitle')}</h2>
                <p>{t('contactDesc')}</p>
                <ul>
                    <li>
                        Email: <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
                    </li>
                    <li>
                        <Link href="/contact">{t('contactTitle')}</Link>
                    </li>
                </ul>

                <div className="not-prose flex items-center gap-2 mt-8 text-sm text-muted-foreground">
                    <span>{t('madeWith')}</span>
                    <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                    <span>{t('forCommunity')}</span>
                </div>
            </article>
        </div>
    );
}
