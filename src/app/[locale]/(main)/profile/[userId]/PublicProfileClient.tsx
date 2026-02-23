'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getUser } from '@/lib/firebase/database';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTrades } from '@/components/profile/ProfileTrades';
import { ProfilePosts } from '@/components/profile/ProfilePosts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import type { User } from '@/lib/types/user';
import { toast } from 'sonner';

export function PublicProfileClient() {
  const params = useParams<{ userId: string }>();
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.user);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const u = await getUser(params.userId);
        if (u) setProfileUser({ ...u, id: params.userId });
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [params.userId]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-5">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
        <p className="text-lg font-semibold">User not found</p>
        <p className="text-sm text-muted-foreground">This profile doesn&apos;t exist or has been removed.</p>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === params.userId;

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <ProfileHeader
        user={profileUser}
        isOwnProfile={isOwnProfile}
        onMessage={() => router.push(`/chat/dm/${params.userId}`)}
        onBlock={() => toast.info('Block feature coming soon')}
        onReport={() => toast.info('Report feature coming soon')}
      />

      <Tabs defaultValue="trades">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="trades">Trades</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="trades" className="mt-4">
          <ProfileTrades userId={params.userId} />
        </TabsContent>
        <TabsContent value="posts" className="mt-4">
          <ProfilePosts userId={params.userId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
