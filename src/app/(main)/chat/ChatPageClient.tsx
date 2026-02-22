'use client';

import dynamic from 'next/dynamic';
import { MessageCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

const ChatRoomList = dynamic(() => import('@/components/chat/ChatRoomList').then(m => ({ default: m.ChatRoomList })), {
  loading: () => <div className="flex flex-col gap-2 p-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>,
});
const ChatRoom = dynamic(() => import('@/components/chat/ChatRoom').then(m => ({ default: m.ChatRoom })), {
  loading: () => <div className="flex-1 flex items-center justify-center"><Skeleton className="h-full w-full" /></div>,
});
const OnlineUsers = dynamic(() => import('@/components/chat/OnlineUsers').then(m => ({ default: m.OnlineUsers })), {
  loading: () => <Skeleton className="h-40" />,
});

export function ChatPageClient() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-3xl font-bold">Chat</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Chat with other traders in real-time.
          </p>
        </div>
      </div>

      {isDesktop ? (
        /* Desktop: three-panel layout */
        <div className="grid grid-cols-[260px_1fr_220px] gap-3 h-[calc(100vh-220px)]">
          {/* Room list */}
          <div className="rounded-xl border overflow-y-auto">
            <div className="p-3 border-b">
              <h2 className="text-sm font-bold">Chat Rooms</h2>
            </div>
            <div className="p-2">
              <ChatRoomList activeRoomId="community" />
            </div>
          </div>

          {/* Main chat */}
          <div className="rounded-xl border overflow-hidden flex flex-col">
            <ChatRoom roomId="community" roomName="Community Chat" />
          </div>

          {/* Online users */}
          <div className="rounded-xl border overflow-y-auto">
            <OnlineUsers />
          </div>
        </div>
      ) : (
        /* Mobile/Tablet: room list with community chat below */
        <div className="flex flex-col gap-4">
          <ChatRoomList />

          {/* Default community chat inline */}
          <div className="rounded-xl border h-[60vh] flex flex-col overflow-hidden">
            <ChatRoom roomId="community" roomName="Community Chat" />
          </div>
        </div>
      )}
    </div>
  );
}
