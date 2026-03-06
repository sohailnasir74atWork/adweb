// Test deploy via Git integration
import { Timestamp } from 'firebase/firestore';

export interface TradeItem {
  name: string;
  type: string;
  valueType: string;
  isFly: boolean;
  isRide: boolean;
  image: string;
}

export interface Trade {
  id: string;
  userId: string;
  traderName: string;
  avatar: string | null;
  hasItems: TradeItem[];
  wantsItems: TradeItem[];
  hasItemNames: string[];
  wantsItemNames: string[];
  hasTotal: number;
  wantsTotal: number;
  status: 'w' | 'l' | 'f';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timestamp: Timestamp | any; // Accepts serverTimestamp() FieldValue too
  isFeatured: boolean;
  description: string;
  isPro: boolean;
  isSharkMode: boolean;
  rating: number | null;
  ratingCount: number;
  // Fields from sibling RN project
  flage?: string | null;
  robloxUsername?: string | null;
  robloxUsernameVerified?: boolean;
  hasRecentGameWin?: boolean;
  lastGameWinAt?: number | null;
  // Reactions map: userId -> emoji (e.g. { "abc123": "✅" })
  reactions?: Record<string, string>;
}

export type TradeStatus = Trade['status'];

export const TRADE_REACTIONS = [
  { emoji: '✅', label: 'Fair' },
  { emoji: '❌', label: 'Lose' },
  { emoji: '👍', label: 'OK' },
  { emoji: '🔥', label: 'W' },
] as const;

export const TRADE_STATUS_LABELS: Record<TradeStatus, string> = {
  w: 'Win',
  l: 'Lose',
  f: 'Fair',
};

export const TRADE_STATUS_COLORS: Record<TradeStatus, string> = {
  w: '#22C55E',
  l: '#EF4444',
  f: '#EAB308',
};
