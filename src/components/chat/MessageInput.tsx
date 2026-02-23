'use client';

import { useState } from 'react';
import { Send, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { sendGroupChatMessage } from '@/lib/firebase/database';
import { toast } from 'sonner';
import Link from 'next/link';

interface MessageInputProps {
  roomId: string;
}

export function MessageInput({ roomId }: MessageInputProps) {
  const user = useAuthStore((s) => s.user);
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!user || !text.trim() || isSending) return;
    setIsSending(true);

    try {
      // Check if user has recent game win (matching RN logic)
      const now = Date.now();
      const hasRecentWin =
        typeof user.lastGameWinAt === 'number' &&
        now - user.lastGameWinAt <= 24 * 60 * 60 * 1000;

      // Send message matching sibling RN project structure
      await sendGroupChatMessage(
        roomId,
        {
          text: text.trim(),
          senderId: user.id,
          sender: user.displayName || 'Anonymous',
          avatar: user.avatar || null,
          timestamp: Date.now(),
          isPro: user.isPro || false,
          robloxUsernameVerified: user.robloxUsernameVerified || false,
          hasRecentGameWin: hasRecentWin,
          lastGameWinAt: user.lastGameWinAt || null,
          isCreator: false, // Will be overridden if needed; RN also computes this per-group
        },
        {
          id: user.id,
          displayName: user.displayName || 'Anonymous',
          avatar: user.avatar || null,
        },
      );
      setText('');
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  if (!user) {
    return (
      <div className="border-t p-4 text-center">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-app-primary hover:underline">
          <LogIn className="h-4 w-4" />
          Sign in to send messages
        </Link>
      </div>
    );
  }

  return (
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
  );
}
