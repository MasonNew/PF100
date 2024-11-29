export interface Coin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  holderCount: number;
  communityScore: number;
  investabilityScore: number;
  isHot: boolean;
  achievements: Achievement[];
}

export type Achievement = 'ATH' | 'GROWING_COMMUNITY' | 'HIGH_LIQUIDITY';

export interface SortConfig {
  key: keyof Coin;
  direction: 'asc' | 'desc';
}