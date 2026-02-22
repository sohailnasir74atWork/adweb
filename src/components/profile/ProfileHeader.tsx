'use client';

import { useState } from 'react';
import { PetImage } from '@/components/shared/PetImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, MessageCircle, Flag, ShieldBan, Calendar } from 'lucide-react';
import type { User } from '@/lib/types/user';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

interface ProfileHeaderProps {
  user: User;
  isOwnProfile: boolean;
  onEdit?: () => void;
  onMessage?: () => void;
  onBlock?: () => void;
  onReport?: () => void;
}

export function ProfileHeader({
  user,
  isOwnProfile,
  onEdit,
  onMessage,
  onBlock,
  onReport,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold overflow-hidden border-4 border-background shadow-md">
          {user.avatar ? (
            <PetImage src={user.avatar} alt={user.displayName} size={96} />
          ) : (
            user.displayName?.charAt(0)?.toUpperCase() || '?'
          )}
        </div>
        {user.online && (
          <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <h1 className="text-2xl font-bold">{user.displayName}</h1>
          {user.isPro && (
            <Badge className="bg-app-primary/15 text-app-primary border-app-primary/30" variant="outline">
              PRO
            </Badge>
          )}
          {user.flage && <span className="text-lg">{user.flage}</span>}
        </div>

        <p className="text-sm text-muted-foreground mt-1">{user.email}</p>

        <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-muted-foreground mt-1.5">
          <Calendar className="h-3 w-3" />
          <span>Joined {user.createdAt ? dayjs(user.createdAt).format('MMM D, YYYY') : 'Unknown'}</span>
        </div>

        <div className="flex items-center gap-2 mt-1.5">
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium',
              user.online ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground',
            )}
          >
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                user.online ? 'bg-green-500' : 'bg-muted-foreground/50',
              )}
            />
            {user.online ? 'Online' : 'Offline'}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-4">
          {isOwnProfile ? (
            <Button variant="outline" size="sm" onClick={onEdit} className="gap-1.5">
              <Pencil className="h-3.5 w-3.5" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                onClick={onMessage}
                className="bg-app-primary hover:bg-app-primary/90 text-white gap-1.5"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Message
              </Button>
              <Button variant="outline" size="sm" onClick={onBlock} className="gap-1.5">
                <ShieldBan className="h-3.5 w-3.5" />
                Block
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onReport}
                className="gap-1.5 text-destructive hover:text-destructive"
              >
                <Flag className="h-3.5 w-3.5" />
                Report
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
