import { ChatPageClient } from './ChatPageClient';
import { GroupsList } from '@/components/chat/GroupsList';
import { fetchGroupsServer } from '@/lib/data/groups';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('chatTitle'),
    description: t('chatDescription'),
  };
}

export const revalidate = 300; // ISR: 5 minutes

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
