export interface Coin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  replies: number;
  volume24h: number;
  marketCap: number;
  holderCount: number;
  communityScore: number;
  investabilityScore: number;
  score: number;
  investabilityBreakdown: {
    marketCap: number;
    communityEngagement: number;
    holders: number;
  };
  isHot: boolean;
  achievements: Achievement[];
  imageUrl?: string;
  tokenLink: string;
}

export type Achievement = 'ATH' | 'GROWING_COMMUNITY' | 'HIGH_LIQUIDITY';

export interface SortConfig {
  key: keyof Coin;
  direction: 'asc' | 'desc';
}

export type MetricType = 'score' | 'replies' | 'marketCap';