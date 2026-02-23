import { ChatPageClient } from './ChatPageClient';
import { GroupsList } from '@/components/chat/GroupsList';
import { fetchGroupsServer } from '@/lib/data/groups';

export const metadata = {
  title: 'Adopt Me Chat & Trading Groups 2026 — Chat with Traders',
  description:
    'Chat with other Roblox Adopt Me players in real-time. Join Adopt Me trading groups, discuss trading values, and find trades. Community chat and groups updated daily in 2026.',
};

export const revalidate = 300; // ISR: 5 minutes

export default async function ChatPage() {
  const groups = await fetchGroupsServer();

  return (
    <div className="flex flex-col">
      {/* Community Chat — client-side (existing) */}
      <ChatPageClient />

      {/* Community Groups — SSR rendered for SEO */}
      <GroupsList groups={groups} />
    </div>
  );
}
