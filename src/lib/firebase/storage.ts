import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from './config';

const storage = getStorage(app);

const MAX_IMAGE_DIMENSION = 1200;
const IMAGE_QUALITY = 0.8;

/**
 * Compress an image file client-side before upload.
 * Resizes to max 1200px on longest side, 80% JPEG quality.
 */
async function compressImage(file: File): Promise<File> {
  // Skip non-image or already-small files
  if (!file.type.startsWith('image/') || file.size < 100_000) return file;

  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;
      if (width <= MAX_IMAGE_DIMENSION && height <= MAX_IMAGE_DIMENSION) {
        resolve(file); // Already small enough
        return;
      }

      // Scale down
      const ratio = Math.min(MAX_IMAGE_DIMENSION / width, MAX_IMAGE_DIMENSION / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(file); return; }
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        IMAGE_QUALITY,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file); // Fallback: upload original
    };
    img.src = url;
  });
}

export async function uploadImage(
  path: string,
  file: File,
): Promise<string> {
  const compressed = await compressImage(file);
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, compressed);
  return getDownloadURL(snapshot.ref);
}

export async function uploadAvatar(userId: string, file: File): Promise<string> {
  return uploadImage(`avatars/${userId}/${Date.now()}_${file.name}`, file);
}

export async function uploadPostImage(userId: string, file: File): Promise<string> {
  return uploadImage(`posts/${userId}/${Date.now()}_${file.name}`, file);
}

export async function uploadChatImage(roomId: string, userId: string, file: File): Promise<string> {
  return uploadImage(`chats/${roomId}/${userId}/${Date.now()}_${file.name}`, file);
}
