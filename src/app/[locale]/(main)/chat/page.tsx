import { ChatPageClient } from './ChatPageClient';
import { GroupsList } from '@/components/chat/GroupsList';
import { fetchGroupsServer } from '@/lib/data/groups';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const { canonical, languages } = getLocalizedAlternates('/chat', locale);
  return {
    title: t('chatTitle'),
    description: t('chatDescription'),
    alternates: { canonical, languages },
  };
}

export const revalidate = 1800; // ISR: 30 min — fully real-time via Firebase, shell rarely matters

export default async function ChatPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const groups = await fetchGroupsServer();

  return (
    <div className="flex flex-col">
      <ChatPageClient />
      <GroupsList groups={groups} />
    </div>
  );
}
