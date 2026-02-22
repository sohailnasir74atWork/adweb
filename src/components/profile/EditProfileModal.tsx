'use client';

import { useState, useRef } from 'react';
import { Loader2, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PetImage } from '@/components/shared/PetImage';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { updateUser } from '@/lib/firebase/database';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'sonner';

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileModal({ open, onOpenChange }: EditProfileModalProps) {
  const user = useAuthStore((s) => s.user);
  const updateStoreUser = useAuthStore((s) => s.updateUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Avatar must be under 2MB');
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!user) return;
    if (!displayName.trim()) {
      toast.error('Display name is required');
      return;
    }

    setIsSaving(true);
    try {
      const updates: Record<string, string> = {
        displayName: displayName.trim(),
      };

      if (avatarFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${user.id}/${Date.now()}_${avatarFile.name}`);
        await uploadBytes(storageRef, avatarFile);
        updates.avatar = await getDownloadURL(storageRef);
      }

      await updateUser(user.id, updates);
      updateStoreUser(updates);
      toast.success('Profile updated!');
      onOpenChange(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 mt-2">
          {/* Avatar */}
          <div className="flex justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="relative group"
            >
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-xl font-bold overflow-hidden border-2 border-border">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="h-full w-full object-cover" />
                ) : user.avatar ? (
                  <PetImage src={user.avatar} alt={user.displayName} size={80} />
                ) : (
                  user.displayName?.charAt(0)?.toUpperCase() || '?'
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-5 w-5 text-white" />
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              className="hidden"
            />
          </div>

          {/* Display Name */}
          <div className="space-y-1.5">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={30}
              placeholder="Your display name"
            />
          </div>

          {/* Save */}
          <Button
            onClick={handleSave}
            disabled={isSaving || !displayName.trim()}
            className="bg-app-primary hover:bg-app-primary/90 text-white gap-2"
          >
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
