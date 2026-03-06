import { ChatPageClient } from './ChatPageClient';
import { GroupsList } from '@/components/chat/GroupsList';
import { fetchGroupsServer } from '@/lib/data/groups';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { MessageCircle, Users } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const { canonical, languages } = getLocalizedAlternates('/chat', locale);
  return {
    title: t('chatTitle'),
    description: t('chatDescription'),
    alternates: { canonical, languages },
    openGraph: {
      title: t('chatTitle'),
      description: t('chatDescription'),
    },
    twitter: {
      title: t('chatTitle'),
      description: t('chatDescription'),
    },
  };
}

export const revalidate = 1800; // ISR: 30 min — fully real-time via Firebase, shell rarely matters

export default async function ChatPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'chat' });

  const groups = await fetchGroupsServer();

  return (
    <div className="flex flex-col gap-4">
      <ChatPageClient />
      <GroupsList groups={groups} />

      {/* SEO Content */}
      <div className="mt-4 space-y-3 sm:space-y-4">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-950/40 dark:to-fuchsia-950/40 ring-1 ring-violet-200 dark:ring-violet-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-violet-200 dark:bg-violet-800/50 p-2.5">
              <MessageCircle className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('faqRoomsTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('faqRoomsDesc', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-950/40 dark:to-cyan-950/40 ring-1 ring-sky-200 dark:ring-sky-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-sky-200 dark:bg-sky-800/50 p-2.5">
              <Users className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('faqFindTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('faqFindDesc', {
              strong: (chunks) => <strong>{chunks}</strong>,
              link: (chunks) => <Link href="/scammer" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">{chunks}</Link>,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
