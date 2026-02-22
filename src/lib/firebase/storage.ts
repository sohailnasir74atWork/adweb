import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from './config';

const storage = getStorage(app);

export async function uploadImage(
  path: string,
  file: File,
): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
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
