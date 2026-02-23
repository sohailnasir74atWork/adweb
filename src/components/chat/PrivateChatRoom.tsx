'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import {
  loadPrivateMessages,
  onNewPrivateMessage,
  sendPrivateChatMessage,
  getPrivateChatKey,
  setActiveChat,
  clearActiveChat,
  deletePrivateMessage,
} from '@/lib/firebase/database';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { MessageList } from './MessageList';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import type { Message } from '@/lib/types/chat';

interface PrivateChatRoomProps {
  otherUserId: string;
  otherDisplayName: string;
  otherAvatar: string;
}

export function PrivateChatRoom({ otherUserId, otherDisplayName, otherAvatar }: PrivateChatRoomProps) {
  const user = useAuthStore((s) => s.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const lastKeyRef = useRef<string | null>(null);
  const hasMoreRef = useRef(true);

  const chatKey = user ? getPrivateChatKey(user.id, otherUserId) : null;

  // Initial load
  useEffect(() => {
    if (!chatKey) return;
    let cancelled = false;
    setIsLoading(true);
    setMessages([]);
    lastKeyRef.current = null;
    hasMoreRef.current = true;

    loadPrivateMessages(chatKey).then(({ messages: msgs, oldestKey }) => {
      if (cancelled) return;
      setMessages(msgs);
      lastKeyRef.current = oldestKey;
      if (msgs.length < 20) hasMoreRef.current = false;
      setIsLoading(false);
    });

    return () => { cancelled = true; };
  }, [chatKey]);

  // Real-time listener for new messages
  useEffect(() => {
    if (!chatKey) return;
    const unsub = onNewPrivateMessage(chatKey, (newMsg) => {
      setMessages((prev) => {
        if (prev.some((m) => String(m.id) === String(newMsg.id))) return prev;
        return [...prev, newMsg].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      });
    });
    return () => unsub();
  }, [chatKey]);

  // Set active chat for unread optimization
  useEffect(() => {
    if (!user?.id || !chatKey) return;
    setActiveChat(user.id, chatKey);
    return () => { clearActiveChat(user.id); };
  }, [user?.id, chatKey]);

  // Load more (pagination)
  const handleLoadMore = useCallback(() => {
    if (!chatKey || isPaginating || !hasMoreRef.current || !lastKeyRef.current) return;
    setIsPaginating(true);

    loadPrivateMessages(chatKey, lastKeyRef.current).then(({ messages: older, oldestKey }) => {
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
  }, [chatKey, isPaginating]);

  // Delete own message
  const handleDeleteMessage = useCallback(async (messageId: string) => {
    if (!chatKey) return;
    try {
      await deletePrivateMessage(chatKey, messageId);
      setMessages((prev) => prev.filter((m) => String(m.id) !== messageId));
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  }, [chatKey]);

  // Send message
  const handleSend = async () => {
    if (!user || !text.trim() || isSending) return;
    setIsSending(true);

    try {
      await sendPrivateChatMessage(
        user.id,
        otherUserId,
        { text: text.trim() },
        user.displayName || 'Anonymous',
        user.avatar || '',
        otherDisplayName,
        otherAvatar,
      );
      setText('');
    } catch (err) {
      console.error('Error sending DM:', err);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages with pagination */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <MessageList
          messages={messages}
          isLoading={isLoading}
          isPaginating={isPaginating}
          onLoadMore={handleLoadMore}
          hasMore={hasMoreRef.current}
          onDeleteMessage={handleDeleteMessage}
          isDM
        />
      </div>

      {/* Input */}
      {!user ? (
        <div className="border-t p-4 text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-app-primary hover:underline">
            <LogIn className="h-4 w-4" />
            Sign in to send messages
          </Link>
        </div>
      ) : (
        <div className="border-t p-3">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              maxLength={500}
              className="flex-1 h-11 rounded-xl text-base"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={isSending || !text.trim()}
              className="bg-app-primary hover:bg-app-primary/90 text-white flex-shrink-0 h-11 w-11 rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
