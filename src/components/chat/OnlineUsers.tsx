'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAllPresenceChange, getUser } from '@/lib/firebase/database';
import { PetImage } from '@/components/shared/PetImage';
import { Skeleton } from '@/components/ui/skeleton';
import { Users } from 'lucide-react';
import type { User } from '@/lib/types/user';

export function OnlineUsers() {
  const [onlineUserData, setOnlineUserData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = onAllPresenceChange(async (presenceMap) => {
      const onlineIds = Object.entries(presenceMap)
        .filter(([, isOnline]) => isOnline)
        .map(([uid]) => uid);

      // Fetch user data for first 50 online users
      const limitedIds = onlineIds.slice(0, 50);
      const users: User[] = [];
      for (const uid of limitedIds) {
        try {
          const u = await getUser(uid);
          if (u && !u.isBlock) {
            users.push({ ...u, id: uid });
          }
        } catch {
          // skip
        }
      }
      setOnlineUserData(users);
      setIsLoading(false);
    });

    return () => unsub();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 p-3">
        <Skeleton className="h-5 w-24 mb-2" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col p-3">
      <div className="flex items-center gap-1.5 mb-3">
        <Users className="h-4 w-4 text-green-500" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Online — {onlineUserData.length}
        </h3>
      </div>

      {onlineUserData.length === 0 ? (
        <p className="text-xs text-muted-foreground">No one is online right now.</p>
      ) : (
        <div className="flex flex-col gap-1">
          {onlineUserData.map((user) => (
            <Link
              key={user.id}
              href={`/chat/dm/${user.id}`}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent transition-colors"
            >
              <div className="relative flex-shrink-0">
                <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold overflow-hidden">
                  {user.avatar ? (
                    <PetImage src={user.avatar} alt={user.displayName} size={28} />
                  ) : (
                    user.displayName?.charAt(0)?.toUpperCase() || '?'
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />
              </div>
              <p className="text-xs font-medium truncate">{user.displayName}</p>
              {user.flage && (
                <span className="text-xs ml-auto flex-shrink-0">{user.flage}</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
