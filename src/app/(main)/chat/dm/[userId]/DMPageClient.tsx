'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { PrivateChatRoom } from '@/components/chat/PrivateChatRoom';
import { Button } from '@/components/ui/button';
import { PetImage } from '@/components/shared/PetImage';
import { getUser } from '@/lib/firebase/database';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Skeleton } from '@/components/ui/skeleton';
import type { User } from '@/lib/types/user';

export function DMPageClient() {
  const params = useParams<{ userId: string }>();
  const targetUserId = params.userId;
  const currentUser = useAuthStore((s) => s.user);
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const u = await getUser(targetUserId);
        if (u) setTargetUser({ ...u, id: targetUserId });
      } catch (err) {
        console.error('Error loading user:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [targetUserId]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[60vh] rounded-xl" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <p className="text-lg font-semibold">Sign in to send messages</p>
        <Link href="/login">
          <Button className="bg-app-primary hover:bg-app-primary/90 text-white">Sign In</Button>
        </Link>
      </div>
    );
  }

  if (!targetUser) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
        <p className="text-lg font-semibold">User not found</p>
        <Link href="/chat">
          <Button variant="outline">Back to Chat</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/chat">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {targetUser.avatar ? (
              <PetImage src={targetUser.avatar} alt={targetUser.displayName} size={32} />
            ) : (
              <span className="text-xs font-bold">
                {targetUser.displayName?.charAt(0)?.toUpperCase() || '?'}
              </span>
            )}
          </div>
          <h1 className="text-lg font-bold">{targetUser.displayName}</h1>
        </div>
      </div>

      {/* Scam warning */}
      <div className="flex items-start gap-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-3 text-xs text-yellow-700 dark:text-yellow-400">
        <ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <p>
          Never share personal information, passwords, or Roblox credentials. 
          Report suspicious users immediately.
        </p>
      </div>

      {/* DM chat — uses private_messages path matching sibling project */}
      <div className="rounded-xl border h-[calc(100vh-280px)] flex flex-col overflow-hidden">
        <PrivateChatRoom
          otherUserId={targetUserId}
          otherDisplayName={targetUser.displayName || 'Anonymous'}
          otherAvatar={targetUser.avatar || ''}
        />
      </div>
    </div>
  );
}
