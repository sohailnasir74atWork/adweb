'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { loadGroupMessages, onNewGroupMessage, setActiveGroupChat, clearActiveGroupChat, deleteGroupMessage } from '@/lib/firebase/database';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import type { Message } from '@/lib/types/chat';

interface ChatRoomProps {
  roomId: string;
  roomName?: string;
}

export function ChatRoom({ roomId, roomName }: ChatRoomProps) {
  const user = useAuthStore((s) => s.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);
  const lastKeyRef = useRef<string | null>(null);
  const hasMoreRef = useRef(true);

  // Initial load — fetch first batch of messages
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setMessages([]);
    lastKeyRef.current = null;
    hasMoreRef.current = true;

    loadGroupMessages(roomId).then(({ messages: msgs, oldestKey }) => {
      if (cancelled) return;
      setMessages(msgs);
      lastKeyRef.current = oldestKey;
      if (msgs.length < 20) hasMoreRef.current = false;
      setIsLoading(false);
    });

    return () => { cancelled = true; };
  }, [roomId]);

  // Real-time listener for new messages (onValue limitToLast(1))
  useEffect(() => {
    const unsub = onNewGroupMessage(roomId, (newMsg) => {
      setMessages((prev) => {
        if (prev.some((m) => String(m.id) === String(newMsg.id))) return prev;
        return [...prev, newMsg].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      });
    });

    return () => unsub();
  }, [roomId]);

  // Set active group chat for unread optimization
  useEffect(() => {
    if (!user?.id) return;
    setActiveGroupChat(user.id, roomId);
    return () => { clearActiveGroupChat(user.id, roomId); };
  }, [user?.id, roomId]);

  // Load more (pagination)
  const handleLoadMore = useCallback(() => {
    if (isPaginating || !hasMoreRef.current || !lastKeyRef.current) return;
    setIsPaginating(true);

    loadGroupMessages(roomId, lastKeyRef.current).then(({ messages: older, oldestKey }) => {
      if (older.length === 0) {
        hasMoreRef.current = false;
      } else {
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => String(m.id)));
          const onlyNew = older.filter((m) => !existingIds.has(String(m.id)));
          return [...prev, ...onlyNew].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        });
        lastKeyRef.current = oldestKey;
      }
      setIsPaginating(false);
    });
  }, [roomId, isPaginating]);

  // Delete own message
  const handleDeleteMessage = useCallback(async (messageId: string) => {
    try {
      await deleteGroupMessage(roomId, messageId);
      setMessages((prev) => prev.filter((m) => String(m.id) !== messageId));
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  }, [roomId]);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header */}
      {roomName && (
        <div className="border-b px-4 py-3 flex-shrink-0">
          <h2 className="font-bold text-base">{roomName}</h2>
        </div>
      )}

      {/* Messages with pagination */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <MessageList
          messages={messages}
          isLoading={isLoading}
          isPaginating={isPaginating}
          onLoadMore={handleLoadMore}
          hasMore={hasMoreRef.current}
          onDeleteMessage={handleDeleteMessage}
        />
      </div>

      {/* Input — login required to send */}
      <MessageInput roomId={roomId} />
    </div>
  );
}

