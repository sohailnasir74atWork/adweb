'use client';

import { useState, useRef, useCallback } from 'react';
import { ImagePlus, X, Loader2, Send, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { firestore } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const BUNNY_STORAGE_HOST = 'storage.bunnycdn.com';
const BUNNY_STORAGE_ZONE = 'post-gag';
const BUNNY_ACCESS_KEY = '1b7e1a85-dff7-4a98-ba701fc7f9b9-6542-46e2';
const BUNNY_CDN_BASE = 'https://pull-gag.b-cdn.net';
const MAX_IMAGES = 4;
const MAX_SIZE_BYTES = 1024 * 1024; // 1MB per image

const TAGS = ['Scam Alert', 'Looking for Trade', 'Discussion', 'Real or Fake', 'Need Help', 'Misc'];

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostCreated?: () => void;
}

export function CreatePostModal({ open, onOpenChange, onPostCreated }: CreatePostModalProps) {
  const user = useAuthStore((s) => s.user);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [desc, setDesc] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState('Discussion');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_IMAGES - imageFiles.length;
    const toAdd = files.slice(0, remaining);
    const rejected: string[] = [];

    const validFiles: File[] = [];
    const previews: string[] = [];

    for (const file of toAdd) {
      if (file.size > MAX_SIZE_BYTES) {
        rejected.push(file.name);
        continue;
      }
      validFiles.push(file);
      previews.push(URL.createObjectURL(file));
    }

    if (rejected.length > 0) {
      toast.error(`${rejected.length} image(s) exceed 1MB and were skipped`);
    }

    setImageFiles((prev) => [...prev, ...validFiles]);
    setImagePreviews((prev) => [...prev, ...previews]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (idx: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[idx]);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const uploadToBunny = useCallback(async (): Promise<string[]> => {
    const urls: string[] = [];
    const userId = user?.id ?? 'anon';

    for (const file of imageFiles) {
      const filename = `${Date.now()}-${Math.floor(Math.random() * 1e6)}.jpg`;
      const remotePath = `uploads/${encodeURIComponent(userId)}/${encodeURIComponent(filename)}`;
      const uploadUrl = `https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${remotePath}`;

      const arrayBuffer = await file.arrayBuffer();

      const res = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'AccessKey': BUNNY_ACCESS_KEY,
          'Content-Type': 'application/octet-stream',
        },
        body: new Uint8Array(arrayBuffer),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Upload failed ${res.status}: ${txt}`);
      }

      urls.push(`${BUNNY_CDN_BASE}/${decodeURIComponent(remotePath)}`);
    }

    return urls;
  }, [imageFiles, user?.id]);

  const handleSubmit = async () => {
    if (!user) return;
    if (imageFiles.length === 0 && !desc.trim()) {
      toast.error('Add an image or description');
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload images to BunnyCDN
      const imageUrls = imageFiles.length > 0 ? await uploadToBunny() : [];

      // Create post matching sibling RN project structure
      await addDoc(collection(firestore, 'designPosts'), {
        imageUrl: imageUrls,
        desc: desc.trim() || '',
        userId: user.id,
        displayName: user.displayName || 'Unknown',
        avatar: user.avatar || null,
        createdAt: serverTimestamp(),
        likes: {},
        commentCount: 0,
        selectedTags: [selectedTag],
        email: user.email || null,
        report: false,
        flage: null,
        robloxUsername: null,
        robloxUsernameVerified: false,
        hasRecentGameWin: false,
        lastGameWinAt: null,
      });

      toast.success('Post shared!');
      setDesc('');
      setImageFiles([]);
      setImagePreviews((prev) => { prev.forEach(URL.revokeObjectURL); return []; });
      setSelectedTag('Discussion');
      onOpenChange(false);
      onPostCreated?.();
    } catch (err) {
      console.error('Error creating post:', err);
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Description */}
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground tracking-wider mb-1.5">DESCRIPTION</p>
            <Textarea
              placeholder="What's on your mind?..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right mt-1">{desc.length}/500</p>
          </div>

          {/* Tag selector */}
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground tracking-wider mb-1.5">SELECT TOPIC</p>
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    'text-[11px] font-semibold px-3 py-1.5 rounded-xl border transition-colors',
                    selectedTag === tag
                      ? 'bg-app-primary text-white border-app-primary'
                      : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted',
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Image picker */}
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground tracking-wider mb-1.5">PHOTOS (MAX {MAX_IMAGES})</p>
            {imagePreviews.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {imagePreviews.map((preview, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden">
                    <Image src={preview} alt="" fill className="object-cover" />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="absolute bottom-0.5 right-0.5 bg-app-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {idx + 1}
                    </div>
                  </div>
                ))}
                {imageFiles.length < MAX_IMAGES && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                  >
                    <Plus className="h-5 w-5 text-muted-foreground" />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-2 h-28 w-full rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-app-primary/50 hover:bg-accent/50 transition-colors"
              >
                <ImagePlus className="h-7 w-7 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Tap to select photos</p>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
          />

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || (imageFiles.length === 0 && !desc.trim())}
            className="bg-app-primary hover:bg-app-primary/90 text-white gap-2"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Post Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
