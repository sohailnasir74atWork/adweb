'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTrades } from '@/components/profile/ProfileTrades';
import { ProfilePosts } from '@/components/profile/ProfilePosts';
import { EditProfileModal } from '@/components/profile/EditProfileModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ProfileContent() {
  const user = useAuthStore((s) => s.user);
  const [showEdit, setShowEdit] = useState(false);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <ProfileHeader
        user={user}
        isOwnProfile
        onEdit={() => setShowEdit(true)}
      />

      <Tabs defaultValue="trades">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="trades">My Trades</TabsTrigger>
          <TabsTrigger value="posts">My Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="trades" className="mt-4">
          <ProfileTrades userId={user.id} />
        </TabsContent>
        <TabsContent value="posts" className="mt-4">
          <ProfilePosts userId={user.id} />
        </TabsContent>
      </Tabs>

      <EditProfileModal open={showEdit} onOpenChange={setShowEdit} />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
