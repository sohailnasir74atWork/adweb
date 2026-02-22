export interface TradeAnalytics {
  totalTrades: number;
  topTraded: PetAnalyticEntry[];
  topDemanded: PetAnalyticEntry[];
  averageValue: number;
  lastUpdated: string;
}

export interface PetAnalyticEntry {
  name: string;
  image: string;
  count: number;
  averageValue: number;
}

export interface ValueChange {
  name: string;
  image: string;
  oldValue: number;
  newValue: number;
  changePercent: number;
  direction: 'up' | 'down';
  // Multi-value type keys
  d_nopotion?: number;
  d_fly?: number;
  d_ride?: number;
  d_flyride?: number;
  n_nopotion?: number;
  n_fly?: number;
  n_ride?: number;
  n_flyride?: number;
  m_nopotion?: number;
  m_fly?: number;
  m_ride?: number;
  m_flyride?: number;
}
