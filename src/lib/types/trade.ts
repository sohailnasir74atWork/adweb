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
  avatar: string;
  hasItems: TradeItem[];
  wantsItems: TradeItem[];
  hasItemNames: string[];
  wantsItemNames: string[];
  hasTotal: number;
  wantsTotal: number;
  status: 'w' | 'l' | 'f';
  timestamp: Timestamp;
  isFeatured: boolean;
  description: string;
  isPro: boolean;
  isSharkMode: boolean;
  rating: number;
  ratingCount: number;
}

export type TradeStatus = Trade['status'];

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
