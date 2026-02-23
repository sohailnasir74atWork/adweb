'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Trash2, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PetImage } from '@/components/shared/PetImage';
import { ImageLightbox } from '@/components/shared/ImageLightbox';
import { Badge } from '@/components/ui/badge';
import { formatTimeAgo } from '@/lib/utils/formatters';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { firestore } from '@/lib/firebase/config';
import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { deletePost } from '@/lib/firebase/firestore';
import type { Post } from '@/lib/types/post';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useState, useCallback } from 'react';

// Tag colors matching sibling project
const TAG_COLORS: Record<string, string> = {
  'scam alert': 'bg-red-500',
  'looking for trade': 'bg-green-500',
  'discussion': 'bg-sky-500',
  'real or fake': 'bg-purple-500',
  'need help': 'bg-orange-500',
  'misc': 'bg-gray-500',
  'misc.': 'bg-gray-500',
};

interface PostCardProps {
  post: Post;
  onDeleted?: (postId: string) => void;
}

export function PostCard({ post, onDeleted }: PostCardProps) {
  const user = useAuthStore((s) => s.user);
  const [likes, setLikes] = useState<Record<string, boolean>>(post.likes || {});
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const isOwn = user?.id === post.userId;

  const likeCount = Object.keys(likes).length;
  const isLiked = user ? !!likes[user.id] : false;

  // Handle Firestore Timestamp or plain number
  const timestamp = post.createdAt?.toDate
    ? post.createdAt.toDate()
    : new Date(post.createdAt as unknown as number);

  const images = Array.isArray(post.imageUrl) ? post.imageUrl.filter(Boolean) : [];

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Sign in to like posts');
      return;
    }
    if (isLiking) return;
    setIsLiking(true);

    try {
      const postRef = doc(firestore, 'designPosts', post.id);
      if (isLiked) {
        await updateDoc(postRef, { [`likes.${user.id}`]: deleteField() });
        setLikes((prev) => {
          const next = { ...prev };
          delete next[user.id];
          return next;
        });
      } else {
        await updateDoc(postRef, { [`likes.${user.id}`]: true });
        setLikes((prev) => ({ ...prev, [user.id]: true }));
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      toast.error('Failed to update like');
    } finally {
      setIsLiking(false);
    }
  };

  const openLightbox = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleDelete = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm('Delete this post? This cannot be undone.')) return;
    setIsDeleting(true);
    try {
      await deletePost(post.id);
      toast.success('Post deleted');
      onDeleted?.(post.id);
    } catch (err) {
      console.error('Failed to delete post:', err);
      toast.error('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  }, [post.id, onDeleted]);

  return (
    <>
      <Link href={`/feed/${post.id}`}>
        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
          {/* Post image(s) — Facebook-style grid */}
          {images.length > 0 ? (
            <div className="relative w-full bg-muted">
              {/* Tag overlays */}
              {post.selectedTags?.length > 0 && (
                <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
                  {post.selectedTags.map((tag, i) => (
                    <span
                      key={i}
                      className={cn(
                        'text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full',
                        TAG_COLORS[tag.toLowerCase()] || 'bg-app-primary',
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {images.length === 1 && (
                <div
                  className="relative aspect-[4/3] w-full cursor-zoom-in"
                  onClick={(e) => openLightbox(e, 0)}
                >
                  <Image src={images[0]} alt={post.desc || 'Post image'} fill className="object-cover" unoptimized />
                </div>
              )}

              {images.length === 2 && (
                <div className="grid grid-cols-2 gap-0.5 aspect-[2/1]">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-full h-full cursor-zoom-in"
                      onClick={(e) => openLightbox(e, i)}
                    >
                      <Image src={img} alt={`Image ${i + 1}`} fill className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>
              )}

              {images.length === 3 && (
                <div className="grid grid-cols-2 gap-0.5" style={{ aspectRatio: '4/3' }}>
                  <div
                    className="relative row-span-2 cursor-zoom-in"
                    onClick={(e) => openLightbox(e, 0)}
                  >
                    <Image src={images[0]} alt="Image 1" fill className="object-cover" unoptimized />
                  </div>
                  <div
                    className="relative cursor-zoom-in"
                    onClick={(e) => openLightbox(e, 1)}
                  >
                    <Image src={images[1]} alt="Image 2" fill className="object-cover" unoptimized />
                  </div>
                  <div
                    className="relative cursor-zoom-in"
                    onClick={(e) => openLightbox(e, 2)}
                  >
                    <Image src={images[2]} alt="Image 3" fill className="object-cover" unoptimized />
                  </div>
                </div>
              )}

              {images.length >= 4 && (
                <div className="grid grid-cols-2 gap-0.5 aspect-square">
                  {images.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      className="relative cursor-zoom-in"
                      onClick={(e) => openLightbox(e, i)}
                    >
                      <Image src={img} alt={`Image ${i + 1}`} fill className="object-cover" unoptimized />
                      {i === 3 && images.length > 4 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white text-xl font-bold">+{images.length - 4}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : post.desc ? (
            <div className="w-full bg-muted/50 flex items-center justify-center p-6">
              <p className="text-sm text-muted-foreground text-center line-clamp-6">{post.desc}</p>
            </div>
          ) : null}

          <div className="p-3">
            {/* User info */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold flex-shrink-0 overflow-hidden">
                {post.avatar ? (
                  <PetImage src={post.avatar} alt={post.displayName} size={24} />
                ) : (
                  post.displayName?.charAt(0)?.toUpperCase() || '?'
                )}
              </div>
              <p className="text-xs font-semibold truncate">{post.displayName}</p>
              {post.isPro && (
                <Badge variant="outline" className="text-[8px] py-0 bg-amber-500/15 text-amber-600 border-amber-500/30">
                  PRO
                </Badge>
              )}
              {post.robloxUsernameVerified && (
                <Badge variant="outline" className="text-[8px] py-0 bg-blue-500/15 text-blue-600 border-blue-500/30">
                  ✓
                </Badge>
              )}
              <span className="text-[10px] text-muted-foreground ml-auto flex-shrink-0">
                {formatTimeAgo(timestamp)}
              </span>
              {isOwn && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="ml-1 p-1 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  title="Delete post"
                >
                  {isDeleting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </button>
              )}
            </div>

            {/* Description */}
            {post.desc && images.length > 0 && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{post.desc}</p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors"
              >
                <Heart
                  className={cn(
                    'h-3.5 w-3.5',
                    isLiked && 'fill-red-500 text-red-500',
                  )}
                />
                <span>{likeCount}</span>
              </button>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{post.commentCount || 0}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* Image lightbox — fullscreen viewer */}
      <ImageLightbox
        images={images}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
