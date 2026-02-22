'use client';

import { useEffect, useState, useCallback } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PetImage } from '@/components/shared/PetImage';
import { getComments } from '@/lib/firebase/firestore';
import { firestore } from '@/lib/firebase/config';
import { collection, addDoc, Timestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { formatTimeAgo } from '@/lib/utils/formatters';
import type { Comment } from '@/lib/types/post';
import { toast } from 'sonner';

interface CommentsSectionProps {
  postId: string;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const user = useAuthStore((s) => s.user);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getComments(postId, 100);
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSend = async () => {
    if (!user || !text.trim()) return;
    setIsSending(true);
    try {
      const newComment: Omit<Comment, 'id'> = {
        userId: user.id,
        userName: user.displayName || 'Unknown',
        userAvatar: user.avatar || '',
        text: text.trim(),
        timestamp: Timestamp.now(),
        isReported: false,
      };
      const docRef = await addDoc(collection(firestore, 'posts', postId, 'comments'), newComment);

      // Increment comment count on the post
      await updateDoc(doc(firestore, 'posts', postId), {
        commentCount: increment(1),
      });

      setComments((prev) => [...prev, { id: docRef.id, ...newComment }]);
      setText('');
    } catch (err) {
      console.error('Error sending comment:', err);
      toast.error('Failed to send comment');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Comments ({comments.length})</h3>

      {/* Comment input */}
      {user ? (
        <div className="flex gap-2">
          <Input
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            maxLength={300}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={isSending || !text.trim()}
            className="bg-app-primary hover:bg-app-primary/90 text-white flex-shrink-0"
          >
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Sign in to comment.</p>
      )}

      {/* Comments list */}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">No comments yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {comments.map((comment) => {
            const ts = comment.timestamp?.toDate
              ? comment.timestamp.toDate()
              : new Date(comment.timestamp as unknown as number);
            return (
              <div key={comment.id} className="flex gap-2.5">
                <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold flex-shrink-0 overflow-hidden">
                  {comment.userAvatar ? (
                    <PetImage src={comment.userAvatar} alt={comment.userName} size={28} />
                  ) : (
                    comment.userName?.charAt(0)?.toUpperCase() || '?'
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <p className="text-xs font-semibold">{comment.userName}</p>
                    <span className="text-[10px] text-muted-foreground">{formatTimeAgo(ts)}</span>
                  </div>
                  <p className="text-sm text-foreground/90 mt-0.5 break-words">{comment.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
