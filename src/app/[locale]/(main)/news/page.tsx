import { Newspaper, Bell, Sparkles, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { config } from '@/lib/constants/config';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const { canonical, languages } = getLocalizedAlternates('/news', locale);
  return {
    title: t('newsTitle'),
    description: t('newsDescription'),
    alternates: { canonical, languages },
  };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="flex flex-col gap-6">
      <section>
        <div className="flex items-center gap-3">
          <Newspaper className="h-8 w-8 text-cyan-500" />
          <div>
            <h1 className="text-3xl font-bold">{t('news.title')}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {t('news.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <Card className="relative overflow-hidden border-dashed">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />
        <div className="relative flex flex-col items-center justify-center text-center py-16 px-6">
          <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4">
            <Bell className="h-8 w-8 text-cyan-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">{t('news.noNews')}</h2>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            {t('news.noNewsDesc')}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/analytics"
              className="flex items-center gap-1.5 text-xs font-semibold bg-app-primary/10 text-app-primary px-3 py-2 rounded-full hover:bg-app-primary/20 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t('news.viewValueChanges')}
            </Link>
            <a
              href="https://x.com/PlayAdoptMe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold bg-muted text-muted-foreground px-3 py-2 rounded-full hover:bg-accent transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              @PlayAdoptMe
            </a>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="text-lg font-bold mb-3">{t('news.helpfulResources')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Card className="p-4 flex items-center gap-3 hover:bg-accent/50 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-green-500" />
            </div>
            <div className="min-w-0">
              <Link href="/analytics" className="text-sm font-semibold hover:underline">
                {t('news.marketAnalytics')}
              </Link>
              <p className="text-xs text-muted-foreground">{t('news.marketAnalyticsDesc')}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3 hover:bg-accent/50 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-5 w-5 text-violet-500" />
            </div>
            <div className="min-w-0">
              <a href="https://adoptme.fandom.com/wiki/Adopt_Me!_Wiki" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline">
                {t('news.adoptMeWiki')}
              </a>
              <p className="text-xs text-muted-foreground">{t('news.adoptMeWikiDesc')}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3 hover:bg-accent/50 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
              <Image src="/logo.webp" alt="App" width={20} height={20} className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <a href={config.iosLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline">
                {t('news.getTheApp')}
              </a>
              <p className="text-xs text-muted-foreground">{t('news.getTheAppDesc')}</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
