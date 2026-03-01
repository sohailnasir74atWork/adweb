import { Newspaper, Clock, Sparkles, Calendar, ExternalLink, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { config } from '@/lib/constants/config';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';

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

const ARTICLES = [
  {
    slug: 'silverback-gorilla-guide',
    title: 'Silverback Gorilla — Complete Guide: Value, How to Get, Neon & Mega Neon (2026)',
    excerpt: 'Everything you need to know about the new Legendary Silverback Gorilla pet — hatch rates (0.1% Crystal Egg), trading value, tricks, Neon & Mega Neon forms.',
    date: 'February 28, 2026',
    readTime: '8 min read',
    tag: 'New Pet',
    tagColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
    image: '/blog-silverback-gorilla.webp',
  },
  {
    slug: 'chocolate-chip-bat-dragon-backpack-guide',
    title: 'Chocolate Chip Bat Dragon Backpack — Complete Guide: Value & Trading Tips (2026)',
    excerpt: 'Full breakdown of the Legendary animated Chocolate Chip Bat Dragon Backpack — shop rotation, chest drop rates, 25K Bucks price, and trading strategies.',
    date: 'February 28, 2026',
    readTime: '7 min read',
    tag: 'Accessory',
    tagColor: 'bg-violet-500/15 text-violet-700 dark:text-violet-400',
    image: '/blog-bat-dragon-backpack.webp',
  },
];

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const newsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('news.title'),
    description: 'Latest Adopt Me guides, new pet announcements, accessory reviews, and trading updates for 2026.',
    url: `${config.domain}/news`,
  };

  return (
    <div className="flex flex-col gap-6">
      <JsonLd data={newsJsonLd} />

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

      {/* Articles Grid */}
      <section className="grid gap-4">
        {ARTICLES.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg hover:scale-[1.005] transition-all cursor-pointer">
              <div className="flex flex-col sm:flex-row">
                {/* Thumbnail */}
                <div className="relative w-full sm:w-48 md:w-56 aspect-video sm:aspect-square flex-shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 224px"
                  />
                </div>
                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${article.tagColor}`}>
                      {article.tag}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold leading-tight">{article.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>
                  <p className="text-xs text-muted-foreground">{article.date}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </section>

      {/* Resources */}
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
