import { fetchPostsServer } from '@/lib/data/posts';
import { FeedPageClient } from './FeedPageClient';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const { canonical, languages } = getLocalizedAlternates('/feed', locale);
  return {
    title: `${t('feed.title')} | Adopt Me Values`,
    description: 'Browse the Adopt Me community feed. Share designs, trade screenshots, and connect with other players.',
    alternates: { canonical, languages },
  };
}

export const revalidate = 600; // ISR: 10 min — client handles real-time, cost-optimized

export default async function FeedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const initialPosts = await fetchPostsServer(5);

  return <FeedPageClient initialPosts={initialPosts} />;
}
