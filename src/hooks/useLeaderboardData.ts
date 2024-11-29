import { useState, useEffect } from 'react';
import { Coin } from '../types/leaderboard';

// Simulated data for demonstration
const generateMockData = (): Coin[] => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: `coin-${i + 1}`,
    rank: i + 1,
    name: `Meme Coin ${i + 1}`,
    symbol: `MEME${i + 1}`,
    price: Math.random() * 100,
    priceChange24h: (Math.random() * 40) - 20,
    volume24h: Math.random() * 1000000,
    marketCap: Math.random() * 10000000,
    holderCount: Math.floor(Math.random() * 10000),
    communityScore: Math.floor(Math.random() * 10) + 1,
    investabilityScore: Math.floor(Math.random() * 100),
    isHot: Math.random() > 0.8,
    achievements: []
  }));
};

export const useLeaderboardData = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        // Simulate API call
        const data = generateMockData();
        setCoins(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leaderboard data');
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return { coins, loading, error };
};