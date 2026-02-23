export interface User {
  id: string;
  displayName: string;
  avatar: string;
  isBlock: boolean;
  fcmToken: string | null;
  lastactivity: number | null;
  online: boolean;
  isPro: boolean;
  email: string;
  decodedEmail: string;
  flage: string | null;
  createdAt: number;
  // Fields from sibling RN project (stored in RTDB by RN app)
  robloxUsernameVerified?: boolean;
  robloxUsername?: string | null;
  robloxUserId?: string | null;
  lastGameWinAt?: number | null;
  isModerator?: boolean;
}
