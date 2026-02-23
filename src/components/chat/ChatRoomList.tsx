'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase/config';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { MessageCircle, Users, Clock, Smartphone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface GroupMetaItem {
  groupId: string;
  groupName: string;
  groupAvatar?: string | null;
  lastMessage?: string;
  lastMessageTimestamp?: number;
  unreadCount?: number;
  memberCount?: number;
  createdBy?: string | null;
}

interface ChatRoomListProps {
  activeRoomId?: string;
  hideCommunityDefault?: boolean;
}

export function ChatRoomList({ activeRoomId, hideCommunityDefault }: ChatRoomListProps) {
  const user = useAuthStore((s) => s.user);
  const [groups, setGroups] = useState<GroupMetaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If not logged in, show default community room (unless hidden)
    if (!user?.id) {
      if (hideCommunityDefault) {
        setGroups([]);
      } else {
        setGroups([{
          groupId: 'community',
          groupName: 'Community Chat',
          lastMessage: 'General discussion for all traders',
          lastMessageTimestamp: 0,
          memberCount: 0,
        }]);
      }
      setIsLoading(false);
      return;
    }

    // Load user's joined groups from RTDB group_meta_data (matches sibling RN project)
    const userGroupsRef = ref(database, `group_meta_data/${user.id}`);
    const unsub = onValue(userGroupsRef, (snapshot) => {
      if (!snapshot.exists()) {
        if (hideCommunityDefault) {
          setGroups([]);
        } else {
          setGroups([{
            groupId: 'community',
            groupName: 'Community Chat',
            lastMessage: 'General discussion for all traders',
            lastMessageTimestamp: 0,
            memberCount: 0,
          }]);
        }
        setIsLoading(false);
        return;
      }

      const data = snapshot.val();
      if (!data || typeof data !== 'object') {
        setGroups([]);
        setIsLoading(false);
        return;
      }

      const parsed: GroupMetaItem[] = Object.entries(data)
        .map(([groupId, groupData]: [string, unknown]) => {
          const gd = groupData as Record<string, unknown>;
          if (!gd || typeof gd !== 'object') return null;
          return {
            groupId,
            groupName: (gd.groupName as string) || 'Group',
            groupAvatar: (gd.groupAvatar as string) || null,
            lastMessage: (gd.lastMessage as string) || 'No messages yet',
            lastMessageTimestamp: (gd.lastMessageTimestamp as number) || 0,
            unreadCount: (gd.unreadCount as number) || 0,
            memberCount: (gd.memberCount as number) || 0,
            createdBy: (gd.createdBy as string) || null,
          };
        })
        .filter(Boolean) as GroupMetaItem[];

      // Sort by most recent activity
      parsed.sort((a, b) => (b.lastMessageTimestamp || 0) - (a.lastMessageTimestamp || 0));
      setGroups(parsed);
      setIsLoading(false);
    });

    return () => unsub();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="rounded-xl bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-950/40 dark:to-fuchsia-950/40 ring-1 ring-violet-200 dark:ring-violet-800 px-4 py-3 flex items-center gap-3">
        <Smartphone className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0" />
        <p className="text-xs text-muted-foreground flex-1">
          Create &amp; join groups on the app — <a href="https://apps.apple.com/us/app/adoptme-values/id6745400111" target="_blank" rel="noopener noreferrer" className="text-violet-600 dark:text-violet-400 font-bold hover:underline">download now</a>!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {groups.map((group) => {
        const isActive = group.groupId === activeRoomId;
        return (
          <Link key={group.groupId} href={`/chat/${group.groupId}`}>
            <Card
              className={cn(
                'flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors cursor-pointer',
                isActive && 'bg-accent border-app-primary/40',
              )}
            >
              <div className="h-10 w-10 rounded-full bg-app-primary/15 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {group.groupAvatar ? (
                  <img src={group.groupAvatar} alt={group.groupName} className="h-10 w-10 object-cover rounded-full" />
                ) : (
                  <MessageCircle className="h-5 w-5 text-app-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold truncate">{group.groupName}</p>
                  {(group.unreadCount ?? 0) > 0 && (
                    <Badge className="bg-app-primary text-white text-[8px] py-0 px-1.5 min-w-[18px] justify-center">
                      {group.unreadCount}
                    </Badge>
                  )}
                </div>
                {group.lastMessage && (
                  <p className="text-xs text-muted-foreground truncate">{group.lastMessage}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                {(group.memberCount ?? 0) > 0 && (
                  <div className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {group.memberCount}
                  </div>
                )}
                {(group.lastMessageTimestamp ?? 0) > 0 && (
                  <div className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {dayjs(group.lastMessageTimestamp).fromNow(true)}
                  </div>
                )}
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
