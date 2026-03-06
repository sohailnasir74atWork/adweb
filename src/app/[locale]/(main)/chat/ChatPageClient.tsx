'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MessageCircle, Smartphone, Search, Inbox as InboxIcon, Users, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useTranslations } from 'next-intl';
import { config } from '@/lib/constants/config';
import { cn } from '@/lib/utils';
import { CHAT_CHANNELS, channelToRoomId, type ChatChannel } from '@/lib/constants/chatChannels';
import { ChannelSwitcher } from '@/components/chat/ChannelSwitcher';

const ChatRoomList = dynamic(() => import('@/components/chat/ChatRoomList').then(m => ({ default: m.ChatRoomList })), {
  loading: () => <div className="flex flex-col gap-2 p-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>,
});
const ChatRoom = dynamic(() => import('@/components/chat/ChatRoom').then(m => ({ default: m.ChatRoom })), {
  loading: () => <div className="flex-1 flex items-center justify-center"><Skeleton className="h-full w-full" /></div>,
});
const Inbox = dynamic(() => import('@/components/chat/Inbox').then(m => ({ default: m.Inbox })), {
  loading: () => <Skeleton className="h-40" />,
});
const UserSearch = dynamic(() => import('@/components/chat/UserSearch').then(m => ({ default: m.UserSearch })), {
  loading: () => <Skeleton className="h-24 rounded-xl" />,
});

type MobileTab = 'chat' | 'groups' | 'inbox' | 'search';

export function ChatPageClient() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [mobileTab, setMobileTab] = useState<MobileTab>('chat');
  const [hasMounted, setHasMounted] = useState(false);
  const [activeChannel, setActiveChannel] = useState<ChatChannel>(CHAT_CHANNELS[0]);
  const t = useTranslations('chat');

  useEffect(() => { setHasMounted(true); }, []);

  const handleChannelChange = useCallback((channel: ChatChannel) => {
    setActiveChannel(channel);
  }, []);

  if (!hasMounted) return null;

  const roomId = channelToRoomId(activeChannel.id);

  if (isDesktop) {
    return (
      <DesktopLayout
        t={t}
        roomId={roomId}
        activeChannel={activeChannel}
        onChannelChange={handleChannelChange}
      />
    );
  }

  return (
    <MobileLayout
      activeTab={mobileTab}
      onTabChange={setMobileTab}
      t={t}
      roomId={roomId}
      activeChannel={activeChannel}
      onChannelChange={handleChannelChange}
    />
  );
}

/* ─── Desktop — same three-panel layout ─── */
function DesktopLayout({
  t,
  roomId,
  activeChannel,
  onChannelChange,
}: {
  t: ReturnType<typeof useTranslations<'chat'>>;
  roomId: string;
  activeChannel: ChatChannel;
  onChannelChange: (channel: ChatChannel) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* App Download CTA */}
      <div className="rounded-xl bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-950/40 dark:to-fuchsia-950/40 ring-1 ring-violet-200 dark:ring-violet-800 px-4 py-3 flex items-center gap-3">
        <Smartphone className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0" />
        <p className="text-xs sm:text-sm text-muted-foreground flex-1">
          For the full chat experience — pet lists creation, group creation, image sharing &amp; more —{' '}
          <Link href={config.iosLink} target="_blank" className="text-violet-600 dark:text-violet-400 font-bold hover:underline">download the app</Link>!
        </p>
      </div>

      <div className="grid grid-cols-[260px_1fr_240px] gap-3 h-[calc(100vh-220px)]">
        {/* Room list + User search */}
        <div className="rounded-xl border overflow-y-auto flex flex-col">
          <div className="p-3 border-b">
            <h2 className="text-sm font-bold">Chat Rooms</h2>
          </div>
          <div className="p-2">
            <ChatRoomList activeRoomId={roomId} />
          </div>
          <div className="border-t p-3">
            <UserSearch />
          </div>
        </div>

        {/* Main chat with channel switcher */}
        <div className="rounded-xl border overflow-hidden flex flex-col">
          <ChannelSwitcher activeChannelId={activeChannel.id} onChannelChange={onChannelChange} />
          <ChatRoom roomId={roomId} />
        </div>

        {/* Inbox */}
        <div className="rounded-xl border overflow-y-auto">
          <Inbox />
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile — chat-first tabbed layout ─── */
function MobileLayout({
  activeTab,
  onTabChange,
  t,
  roomId,
  activeChannel,
  onChannelChange,
}: {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  t: ReturnType<typeof useTranslations<'chat'>>;
  roomId: string;
  activeChannel: ChatChannel;
  onChannelChange: (channel: ChatChannel) => void;
}) {
  return (
    <div className={cn(
      'flex flex-col',
      activeTab === 'chat' ? 'h-[calc(100vh-180px)]' : '',
    )}>
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-purple-500/15 p-2">
            <MessageCircle className="h-5 w-5 text-purple-500" />
          </div>
          <h1 className="text-xl font-extrabold">{t('title')}</h1>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTabChange(activeTab === 'search' ? 'chat' : 'search')}
            className={cn(
              'h-9 w-9 rounded-xl flex items-center justify-center transition-colors',
              activeTab === 'search'
                ? 'bg-purple-500 text-white'
                : 'bg-muted text-muted-foreground hover:bg-accent',
            )}
          >
            {activeTab === 'search' ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </button>
          <button
            onClick={() => onTabChange(activeTab === 'inbox' ? 'chat' : 'inbox')}
            className={cn(
              'h-9 w-9 rounded-xl flex items-center justify-center transition-colors',
              activeTab === 'inbox'
                ? 'bg-purple-500 text-white'
                : 'bg-muted text-muted-foreground hover:bg-accent',
            )}
          >
            <InboxIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex gap-1 mb-2 px-1">
        <button
          onClick={() => onTabChange('chat')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-bold transition-all',
            activeTab === 'chat'
              ? 'bg-purple-500 text-white shadow-md shadow-purple-500/25'
              : 'bg-muted text-muted-foreground hover:bg-accent',
          )}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          {t('title')}
        </button>
        <button
          onClick={() => onTabChange('groups')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-bold transition-all',
            activeTab === 'groups'
              ? 'bg-purple-500 text-white shadow-md shadow-purple-500/25'
              : 'bg-muted text-muted-foreground hover:bg-accent',
          )}
        >
          <Users className="h-3.5 w-3.5" />
          {t('groups')}
        </button>
      </div>

      {/* ── Content area ── */}
      <div className="flex-1 min-h-0 flex flex-col">
        {activeTab === 'chat' && (
          <div className="flex-1 min-h-0 flex flex-col rounded-2xl border overflow-hidden bg-card">
            <div className="flex-shrink-0">
              <ChannelSwitcher activeChannelId={activeChannel.id} onChannelChange={onChannelChange} />
            </div>
            <ChatRoom roomId={roomId} />
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-1.5 px-1">
            <ChatRoomList hideCommunityDefault />
          </div>
        )}

        {activeTab === 'inbox' && (
          <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl border bg-card">
            <Inbox />
          </div>
        )}

        {activeTab === 'search' && (
          <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl border bg-card p-3">
            <UserSearch />
          </div>
        )}
      </div>
    </div>
  );
}
