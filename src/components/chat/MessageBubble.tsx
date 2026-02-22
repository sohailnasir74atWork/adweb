'use client';

import { PetImage } from '@/components/shared/PetImage';
import { useAuthStore } from '@/lib/store/useAuthStore';
import type { Message } from '@/lib/types/chat';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import { useImageBase } from '@/lib/hooks/useImageBase';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const currentUser = useAuthStore((s) => s.user);
  const imageBase = useImageBase();

  // Support both sibling (senderId/sender) and legacy (userId/userName) field names
  const msgSenderId = message.senderId || message.userId || '';
  const msgSenderName = message.sender || message.userName || 'Anonymous';
  const msgAvatar = message.avatar || message.userAvatar || '';

  const isOwn = currentUser?.id === msgSenderId;
  const time = dayjs(message.timestamp).format('h:mm A');

  return (
    <div className={cn('flex gap-2 max-w-[85%]', isOwn ? 'ml-auto flex-row-reverse' : '')}>
      {!isOwn && (
        <div className="flex-shrink-0 mt-auto">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold overflow-hidden">
            {msgAvatar ? (
              <PetImage src={msgAvatar} alt={msgSenderName} size={32} />
            ) : (
              msgSenderName?.charAt(0)?.toUpperCase() || '?'
            )}
          </div>
        </div>
      )}
      <div className={cn('flex flex-col', isOwn ? 'items-end' : 'items-start')}>
        {!isOwn && (
          <div className="flex items-center gap-1 mb-0.5 px-1">
            <p className="text-[10px] font-bold text-muted-foreground">
              {msgSenderName}
            </p>
            {message.isPro && (
              <Badge variant="outline" className="text-[7px] py-0 px-1 bg-amber-500/15 text-amber-600 border-amber-500/30">PRO</Badge>
            )}
            {message.isCreator && (
              <Badge variant="outline" className="text-[7px] py-0 px-1 bg-app-primary/15 text-app-primary border-app-primary/30">ADMIN</Badge>
            )}
          </div>
        )}

        {/* Reply context */}
        {message.replyTo && (
          <div className={cn(
            'text-[10px] px-2 py-1 mb-0.5 rounded-lg border-l-2 max-w-[200px] truncate',
            isOwn ? 'bg-white/10 border-white/30 text-white/70' : 'bg-muted/50 border-muted-foreground/30 text-muted-foreground',
          )}>
            ↩ {message.replyTo.sender}: {message.replyTo.text || (message.replyTo.hasFruits ? `🐾 ${message.replyTo.fruitsCount} pet(s)` : '📷')}
          </div>
        )}

        <div
          className={cn(
            'rounded-2xl px-3 py-2 text-sm break-words',
            isOwn
              ? 'bg-app-primary text-white rounded-br-md'
              : 'bg-muted rounded-bl-md',
          )}
        >
          {/* Images */}
          {message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="Shared image"
              className="rounded-lg max-w-[200px] mb-1"
            />
          )}
          {/* Pet fruits */}
          {message.fruits && message.fruits.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1">
              {message.fruits.map((fruit, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5 p-1 rounded-lg bg-black/5 min-w-[40px]">
                  <PetImage
                    src={`${imageBase}/${fruit.image?.replace(/^\//, '')}`}
                    alt={fruit.name}
                    size={32}
                  />
                  <span className="text-[8px] font-semibold truncate max-w-[50px]">{fruit.name}</span>
                </div>
              ))}
            </div>
          )}
          {message.text && <p>{message.text}</p>}
        </div>
        <p className="text-[9px] text-muted-foreground mt-0.5 px-1">{time}</p>
      </div>
    </div>
  );
}
