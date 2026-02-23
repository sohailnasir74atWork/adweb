'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Loader2 } from 'lucide-react';
import { PetImage } from '@/components/shared/PetImage';
import { useAuthStore } from '@/lib/store/useAuthStore';
import type { Message } from '@/lib/types/chat';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import { useImageBase } from '@/lib/hooks/useImageBase';

interface MessageBubbleProps {
  message: Message;
  onDelete?: (messageId: string) => void;
  isDM?: boolean;
}

export function MessageBubble({ message, onDelete, isDM }: MessageBubbleProps) {
  const currentUser = useAuthStore((s) => s.user);
  const imageBase = useImageBase();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // Support both sibling (senderId/sender) and legacy (userId/userName) field names
  const msgSenderId = message.senderId || message.userId || '';
  const msgSenderName = message.sender || message.userName || 'Anonymous';
  const msgAvatar = message.avatar || message.userAvatar || '';

  const isOwn = currentUser?.id === msgSenderId;
  const time = dayjs(message.timestamp).format('h:mm A');

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!confirm('Delete this message?')) return;
    setIsDeleting(true);
    try {
      await onDelete(String(message.id));
    } catch (err) {
      console.error('Failed to delete message:', err);
    } finally {
      setIsDeleting(false);
      setShowActions(false);
    }
  };

  const profileLink = msgSenderId ? `/profile/${msgSenderId}` : '#';

  return (
    <div
      className={cn('flex gap-2 max-w-[85%] group relative', isOwn ? 'ml-auto flex-row-reverse' : '')}
      onMouseEnter={() => isOwn && setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!isOwn && !isDM && (
        <Link href={profileLink} className="flex-shrink-0 mt-auto hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold overflow-hidden cursor-pointer">
            {msgAvatar ? (
              <PetImage src={msgAvatar} alt={msgSenderName} size={32} />
            ) : (
              msgSenderName?.charAt(0)?.toUpperCase() || '?'
            )}
          </div>
        </Link>
      )}
      <div className={cn('flex flex-col', isOwn ? 'items-end' : 'items-start')}>
        {!isOwn && !isDM && (
          <div className="flex items-center gap-1 mb-0.5 px-1">
            <Link href={profileLink} className="hover:underline">
              <p className="text-[10px] font-bold text-muted-foreground cursor-pointer">
                {msgSenderName}
              </p>
            </Link>
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

        <div className="flex items-center gap-1">
          {/* Delete button (own messages — shows on hover) */}
          {isOwn && showActions && onDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-6 w-6 flex items-center justify-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-50"
              title="Delete message"
            >
              {isDeleting ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Trash2 className="h-3 w-3" />
              )}
            </button>
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
            {/* Pet fruits — matched to RN project */}
            {message.fruits && message.fruits.length > 0 && (() => {
              const fruits = message.fruits;
              const totalValue = fruits.reduce((sum, f) => sum + (Number(f.value) || 0), 0);
              return (
                <div className={cn(
                  'rounded-lg p-1.5 mb-1 space-y-0.5',
                  isOwn ? 'bg-white/10' : 'bg-black/5',
                )}>
                  {fruits.map((fruit, i) => {
                    const valueType = (fruit.valueType || 'd').toLowerCase();
                    const fruitName = fruit.name || fruit.Name || '';
                    const fruitImage = fruit.imageUrl || fruit.image || '';
                    return (
                      <div key={`${fruit.id || fruitName}-${i}`} className="flex items-center gap-1.5">
                        {/* Pet image */}
                        <PetImage
                          src={fruitImage}
                          alt={fruitName}
                          size={22}
                          className="rounded-sm flex-shrink-0"
                        />
                        {/* Name + Value + Badges */}
                        <div className="flex items-center gap-1 flex-wrap min-w-0">
                          <span className={cn('text-[11px] font-semibold truncate max-w-[80px]', isOwn ? 'text-white' : 'text-foreground')}>
                            {fruitName}
                          </span>
                          <span className={cn('text-[10px]', isOwn ? 'text-white/70' : 'text-muted-foreground')}>
                            Val: {Number(fruit.value || 0).toLocaleString()}
                          </span>
                          {/* Badges */}
                          <span className={cn(
                            'text-[8px] font-bold text-white px-1 py-px rounded',
                            valueType === 'n' ? 'bg-emerald-500'
                              : valueType === 'm' ? 'bg-purple-500'
                                : 'bg-[#ff6666]',
                          )}>
                            {valueType.toUpperCase()}
                          </span>
                          {fruit.isFly && (
                            <span className="text-[8px] font-bold text-white bg-blue-500 px-1 py-px rounded">F</span>
                          )}
                          {fruit.isRide && (
                            <span className="text-[8px] font-bold text-white bg-red-500 px-1 py-px rounded">R</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {/* Total row */}
                  {fruits.length > 1 && (
                    <div className={cn(
                      'flex items-center gap-1 pt-1 mt-0.5 border-t text-[10px] font-semibold',
                      isOwn ? 'border-white/20 text-white/80' : 'border-black/10 text-muted-foreground',
                    )}>
                      <span>Total:</span>
                      <span className="text-[#ff6666] font-bold">{totalValue.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              );
            })()}
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
        <p className="text-[9px] text-muted-foreground mt-0.5 px-1">{time}</p>
      </div>
    </div>
  );
}
