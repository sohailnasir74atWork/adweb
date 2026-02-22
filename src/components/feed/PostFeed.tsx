'use client';

import { useEffect, useState, useCallback } from 'react';
import { getPosts } from '@/lib/firebase/firestore';
import { PostCard } from './PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { Post } from '@/lib/types/post';
import type { DocumentSnapshot } from 'firebase/firestore';
import { useInView } from 'react-intersection-observer';

export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { ref: loadMoreRef, inView } = useInView({ threshold: 0 });

  const fetchInitial = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getPosts(10);
      setPosts(result.posts);
      setLastDoc(result.lastDoc);
      setHasMore(result.posts.length >= 10);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!lastDoc || isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const result = await getPosts(10, lastDoc);
      setPosts((prev) => [...prev, ...result.posts]);
      setLastDoc(result.lastDoc);
      setHasMore(result.posts.length >= 10);
    } catch (err) {
      console.error('Error loading more posts:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [lastDoc, isLoadingMore, hasMore]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  // Auto-load more when scrolling into view
  useEffect(() => {
    if (inView && hasMore && !isLoadingMore && !isLoading) {
      loadMore();
    }
  }, [inView, hasMore, isLoadingMore, isLoading, loadMore]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 max-w-lg mx-auto w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center max-w-lg mx-auto">
        <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-lg mx-auto w-full">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Infinite scroll trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isLoadingMore && <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />}
        </div>
      )}
    </div>
  );
}
