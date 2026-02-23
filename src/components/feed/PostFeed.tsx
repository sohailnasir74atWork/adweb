'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { getPosts } from '@/lib/firebase/firestore';
import { PostCard } from './PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/useAuthStore';
import type { Post } from '@/lib/types/post';
import type { ServerPost } from '@/lib/data/posts';
import type { DocumentSnapshot } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

const CLIENT_PAGE_SIZE = 10;

type FilterTab = 'all' | 'mine' | 'showcase' | 'meme' | 'looking for trade' | 'discussion' | 'scam alert' | 'real or fake' | 'need help';

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'mine', label: '🧑 My Posts' },
  { value: 'showcase', label: '🎨 Showcase' },
  { value: 'meme', label: '😂 Meme' },
  { value: 'looking for trade', label: '🔄 Trading' },
  { value: 'discussion', label: '💬 Discussion' },
  { value: 'scam alert', label: '🚨 Scam Alert' },
  { value: 'real or fake', label: '❓ Real or Fake' },
  { value: 'need help', label: '🆘 Help' },
];

interface PostFeedProps {
  initialPosts?: ServerPost[];
}

/** Convert SSR ServerPost to client Post type */
function toClientPost(sp: ServerPost): Post {
  return {
    ...sp,
    createdAt: Timestamp.fromMillis(sp.createdAt),
  };
}

export function PostFeed({ initialPosts }: PostFeedProps) {
  const currentUser = useAuthStore((s) => s.user);
  const ssrPosts = useMemo(
    () => (initialPosts || []).map(toClientPost),
    [initialPosts],
  );

  const [posts, setPosts] = useState<Post[]>(ssrPosts);
  const [isLoading, setIsLoading] = useState(ssrPosts.length === 0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [usedInitial, setUsedInitial] = useState(ssrPosts.length > 0);

  // Build filters object for Firestore
  const buildFilters = useCallback((filter: FilterTab) => {
    const filters: { tag?: string; userId?: string } = {};
    if (filter === 'mine' && currentUser?.id) {
      filters.userId = currentUser.id;
    } else if (filter !== 'all' && filter !== 'mine') {
      filters.tag = filter;
    }
    return filters;
  }, [currentUser?.id]);

  // Fetch when switching filters (not "all" with SSR data)
  useEffect(() => {
    if (activeFilter === 'all' && usedInitial) {
      setIsLoading(false);
      return;
    }

    const fetchFiltered = async () => {
      setIsLoading(true);
      setLastDoc(null);
      setHasMore(true);

      if (activeFilter === 'mine' && !currentUser?.id) {
        setPosts([]);
        setIsLoading(false);
        return;
      }

      try {
        const filters = buildFilters(activeFilter);
        const result = await getPosts(CLIENT_PAGE_SIZE, undefined, filters);
        setPosts(result.posts);
        setLastDoc(result.lastDoc);
        setHasMore(result.posts.length >= CLIENT_PAGE_SIZE);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiltered();
  }, [activeFilter, currentUser?.id, usedInitial, buildFilters]);

  // Load more
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    try {
      // If using SSR initial data, first load from Firestore without cursor
      if (usedInitial) {
        setUsedInitial(false);
        const result = await getPosts(CLIENT_PAGE_SIZE);
        const existingIds = new Set(posts.map((p) => p.id));
        const onlyNew = result.posts.filter((p) => !existingIds.has(p.id));
        setPosts((prev) => [...prev, ...onlyNew]);
        setLastDoc(result.lastDoc);
        setHasMore(result.posts.length >= CLIENT_PAGE_SIZE);
      } else if (lastDoc) {
        const filters = buildFilters(activeFilter);
        const result = await getPosts(CLIENT_PAGE_SIZE, lastDoc, filters);
        setPosts((prev) => [...prev, ...result.posts]);
        setLastDoc(result.lastDoc);
        setHasMore(result.posts.length >= CLIENT_PAGE_SIZE);
      }
    } catch (err) {
      console.error('Error loading more posts:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [lastDoc, isLoadingMore, hasMore, activeFilter, usedInitial, posts, buildFilters]);

  // Handle filter tab click
  const handleFilterClick = useCallback((tab: FilterTab) => {
    setActiveFilter(tab);
    if (tab !== 'all') setUsedInitial(false);
    else if (ssrPosts.length > 0) {
      // Switching back to "all" with SSR data
      setPosts(ssrPosts);
      setUsedInitial(true);
      setLastDoc(null);
      setHasMore(true);
    }
  }, [ssrPosts]);

  // Remove post from local list when deleted
  const handlePostDeleted = useCallback((postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }, []);

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
      {/* Filter tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleFilterClick(tab.value)}
            className={cn(
              'whitespace-nowrap text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors',
              activeFilter === tab.value
                ? 'bg-app-primary text-white border-app-primary'
                : 'bg-card text-muted-foreground border-border hover:bg-accent',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Post list */}
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground">
            {activeFilter === 'mine'
              ? "You haven't posted anything yet."
              : 'No posts found for this filter.'}
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onDeleted={handlePostDeleted} />
            ))}
          </div>

          {/* Load More button */}
          {hasMore && (
            <div className="flex justify-center py-4">
              <Button
                onClick={loadMore}
                disabled={isLoadingMore}
                variant="outline"
                className="gap-2 rounded-xl"
              >
                {isLoadingMore ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                {isLoadingMore ? 'Loading...' : 'Load More Posts'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
