import { fetchPostsServer } from '@/lib/data/posts';
import { FeedPageClient } from './FeedPageClient';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { Users } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const { canonical, languages } = getLocalizedAlternates('/feed', locale);
  return {
    title: `${t('feed.title')} | Adopt Me Values`,
    description: t.raw('feed.seoDesc').replace(/<[^>]*>/g, ''),
    alternates: { canonical, languages },
  };
}

export const revalidate = 600; // ISR: 10 min — client handles real-time, cost-optimized

export default async function FeedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const initialPosts = await fetchPostsServer(5);

  return (
    <div className="flex flex-col gap-4">
      <FeedPageClient initialPosts={initialPosts} />

      {/* SEO Content */}
      <div className="mt-4">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/40 dark:to-pink-950/40 ring-1 ring-rose-200 dark:ring-rose-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-rose-200 dark:bg-rose-800/50 p-2.5">
              <Users className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('feed.seoTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('feed.seoDesc', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
