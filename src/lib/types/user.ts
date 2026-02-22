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
}
