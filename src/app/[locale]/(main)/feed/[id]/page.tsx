import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { getPostById } from '@/lib/firebase/firestore';
import { CommentsSection } from '@/components/feed/CommentsSection';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatTimeAgo } from '@/lib/utils/formatters';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const post = await getPostById(id);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const images = Array.isArray(post.imageUrl) ? post.imageUrl.filter(Boolean) : [];
  const { canonical, languages } = getLocalizedAlternates(`/feed/${id}`, locale);

  return {
    title: `${post.displayName}'s Post — Adopt Me Feed`,
    description: post.desc || `A post by ${post.displayName} on the Adopt Me community feed.`,
    openGraph: {
      title: `${post.displayName}'s Post | Adopt Me Feed`,
      description: post.desc || 'Community post on Adopt Me Values',
      images: images.length > 0 ? [images[0]] : undefined,
    },
    alternates: { canonical, languages },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const timestamp = post.createdAt?.toDate
    ? post.createdAt.toDate()
    : new Date(post.createdAt as unknown as number);

  const images = Array.isArray(post.imageUrl) ? post.imageUrl.filter(Boolean) : [];
  const likeCount = post.likes ? Object.keys(post.likes).length : 0;

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          {t('nav.home')}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/feed" className="hover:text-foreground transition-colors">
          {t('nav.feed')}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Post</span>
      </nav>

      <Card className="overflow-hidden">
        {/* User info */}
        <div className="flex items-center gap-3 p-4 border-b">
          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-sm font-bold overflow-hidden">
            {post.avatar ? (
              <Image
                src={post.avatar}
                alt={post.displayName}
                width={36}
                height={36}
                className="object-cover rounded-full"
              />
            ) : (
              post.displayName?.charAt(0)?.toUpperCase() || '?'
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm">{post.displayName}</p>
              {post.isPro && (
                <Badge variant="outline" className="text-[9px] py-0 bg-amber-500/15 text-amber-600 border-amber-500/30">
                  PRO
                </Badge>
              )}
              {post.robloxUsernameVerified && (
                <Badge variant="outline" className="text-[9px] py-0 bg-blue-500/15 text-blue-600 border-blue-500/30">
                  ✓ Verified
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{formatTimeAgo(timestamp)}</p>
          </div>
        </div>

        {/* Tags */}
        {post.selectedTags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-4 pt-3">
            {post.selectedTags.map((tag, i) => (
              <span key={i} className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full bg-app-primary">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Post images */}
        {images.length === 1 && (
          <div className="relative aspect-square w-full bg-muted">
            <Image
              src={images[0]}
              alt={post.desc || 'Post image'}
              fill
              className="object-cover"
              sizes="(max-width: 672px) 100vw, 672px"
            />
          </div>
        )}
        {images.length > 1 && (
          <div className="grid grid-cols-2 gap-1 p-1">
            {images.slice(0, 4).map((url, idx) => (
              <div key={idx} className="relative aspect-square bg-muted rounded-md overflow-hidden">
                <Image
                  src={url}
                  alt={`Image ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 672px) 50vw, 336px"
                />
              </div>
            ))}
          </div>
        )}

        {/* Description & stats */}
        <div className="p-4">
          {post.desc && <p className="text-sm mb-3">{post.desc}</p>}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{likeCount} likes</span>
            <span>{post.commentCount || 0} comments</span>
          </div>
        </div>
      </Card>

      {/* Comments */}
      <CommentsSection postId={id} />
    </div>
  );
}
