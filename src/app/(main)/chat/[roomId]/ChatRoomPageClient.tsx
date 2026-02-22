'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ChatRoom } from '@/components/chat/ChatRoom';
import { OnlineUsers } from '@/components/chat/OnlineUsers';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';

export function ChatRoomPageClient() {
  const params = useParams<{ roomId: string }>();
  const roomId = params.roomId;
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Format room name from id
  const roomName = roomId
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="flex flex-col gap-3">
      {/* Back button (mobile) */}
      <div className="flex items-center gap-2">
        <Link href="/chat">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold">{roomName}</h1>
      </div>

      {isDesktop ? (
        <div className="grid grid-cols-[1fr_220px] gap-3 h-[calc(100vh-220px)]">
          <div className="rounded-xl border overflow-hidden flex flex-col">
            <ChatRoom roomId={roomId} />
          </div>
          <div className="rounded-xl border overflow-y-auto">
            <OnlineUsers />
          </div>
        </div>
      ) : (
        <div className="rounded-xl border h-[calc(100vh-200px)] flex flex-col overflow-hidden">
          <ChatRoom roomId={roomId} />
        </div>
      )}
    </div>
  );
}
