'use client';

import { useEffect, useRef, useCallback } from 'react';
import { MessageBubble } from './MessageBubble';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import type { Message } from '@/lib/types/chat';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  isPaginating?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function MessageList({ messages, isLoading, isPaginating, onLoadMore, hasMore }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(0);

  // Auto-scroll to bottom on new messages (only if already near bottom)
  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 150;
    const isNewMessage = messages.length > prevCountRef.current;

    if (isNearBottom || isNewMessage) {
      bottomRef.current?.scrollIntoView({ behavior: isNewMessage ? 'smooth' : 'auto' });
    }
    prevCountRef.current = messages.length;
  }, [messages.length]);

  // Load more when scrolling to top
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !onLoadMore || !hasMore || isPaginating) return;
    if (scrollRef.current.scrollTop < 80) {
      onLoadMore();
    }
  }, [onLoadMore, hasMore, isPaginating]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`flex gap-2 ${i % 2 === 0 ? '' : 'ml-auto flex-row-reverse'}`}>
            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
            <Skeleton className={`h-10 rounded-2xl ${i % 2 === 0 ? 'w-48' : 'w-36'}`} />
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-base font-semibold text-muted-foreground">No messages yet. Say hello! 👋</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex flex-col gap-2.5 p-4 overflow-y-auto flex-1"
    >
      {/* Load more indicator */}
      {isPaginating && (
        <div className="flex justify-center py-2">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}
      {/* Messages sorted oldest first for display */}
      {[...messages].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0)).map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
