'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ImagePlus, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/lib/store/useAuthStore';

const PostFeed = dynamic(() => import('@/components/feed/PostFeed').then(m => ({ default: m.PostFeed })), {
  loading: () => <div className="flex flex-col gap-4 max-w-lg mx-auto w-full">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />)}</div>,
});
const CreatePostModal = dynamic(() => import('@/components/feed/CreatePostModal').then(m => ({ default: m.CreatePostModal })), {
  ssr: false,
});

export function FeedPageClient() {
  const user = useAuthStore((s) => s.user);
  const [showCreate, setShowCreate] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Home className="h-8 w-8 text-purple-500" />
          <div>
            <h1 className="text-3xl font-bold">Feed</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Community posts and designs from Adopt Me players.
            </p>
          </div>
        </div>
        {user && (
          <Button
            onClick={() => setShowCreate(true)}
            className="bg-app-primary hover:bg-app-primary/90 text-white gap-1.5"
            size="sm"
          >
            <ImagePlus className="h-4 w-4" />
            <span className="hidden sm:inline">New Post</span>
          </Button>
        )}
      </div>

      <PostFeed key={refreshKey} />

      <CreatePostModal
        open={showCreate}
        onOpenChange={setShowCreate}
        onPostCreated={() => setRefreshKey((k) => k + 1)}
      />

      {/* SEO content */}
      <section className="prose dark:prose-invert max-w-none mt-4">
        <h2>Adopt Me Community Feed</h2>
        <p>
          Share your Adopt Me designs, trade screenshots, and pet collections with the community.
          Like, comment, and connect with other players from around the world.
        </p>
      </section>
    </div>
  );
}
