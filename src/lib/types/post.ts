import { Timestamp } from 'firebase/firestore';

// Matches sibling RN project's designPosts collection
export interface Post {
  id: string;
  userId: string;
  displayName: string;
  avatar: string | null;
  imageUrl: string[]; // Array of BunnyCDN URLs
  desc: string;
  likes: Record<string, boolean>; // { [userId]: true }
  commentCount: number;
  createdAt: Timestamp;
  selectedTags: string[];
  email?: string | null;
  report?: boolean;
  flage?: string | null;
  isPro?: boolean;
  robloxUsername?: string | null;
  robloxUsernameVerified?: boolean;
  hasRecentGameWin?: boolean;
  lastGameWinAt?: number | null;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: Timestamp;
  isReported: boolean;
}
