import { useState, useEffect } from 'react';
import { Coin } from '../types/leaderboard';

interface Token {
  name: string;
  market_cap: number;
  description: string;
  replies: number;
  image_url: string;
  token_url: string;
}

const API_ENDPOINT = 'https://pf100api.onrender.com/tokens';

const fetchPumpFunTokens = async (): Promise<Coin[]> => {
  try {
    const response = await fetch(`${API_ENDPOINT}?limit=100`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tokens: Token[] = await response.json();
    console.log('API Response:', tokens);

    // Calculate total replies for relative scoring
    const totalReplies = tokens.reduce((sum, token) => sum + token.replies, 0);

    return tokens.map((token, index) => {
      // Extract token address from URL
      const tokenAddress = token.token_url.split('/').pop() || `token-${index}`;
      
      // Create new token URL format
      const formattedTokenUrl = `https://pump.fun/coin/${tokenAddress}`;

      // Calculate scores
      const marketCapScore = (() => {
        if (token.market_cap >= 1_000_000_000) return 20;
        if (token.market_cap >= 100_000_000) return 40;
        if (token.market_cap >= 10_000_000) return 35;
        if (token.market_cap >= 1_000_000) return 30;
        if (token.market_cap >= 100_000) return 25;
        return 15;
      })();

      const replyPercentile = (token.replies / totalReplies) * 100;
      const communityScore = (() => {
        if (replyPercentile >= 20) return 40;
        if (replyPercentile >= 10) return 35;
        if (replyPercentile >= 5) return 30;
        if (replyPercentile >= 1) return 25;
        return 15;
      })();

      const holdersScore = (() => {
        if (!token.description) return 0;
        if (token.description.length >= 200) return 20;
        if (token.description.length >= 100) return 15;
        if (token.description.length >= 50) return 10;
        return 5;
      })();

      const investabilityScore = Math.min(100, marketCapScore + communityScore + holdersScore);

      return {
        id: tokenAddress,
        rank: index + 1,
        name: token.name,
        symbol: token.name.split(' ')[0].toUpperCase(),
        price: token.market_cap / 1_000_000_000,
        replies: token.replies,
        volume24h: 0,
        marketCap: token.market_cap,
        holderCount: 0,
        communityScore: Math.min(10, Math.floor(token.replies / 100)),
        investabilityScore,
        score: investabilityScore, // Add this line to match the Coin type
        investabilityBreakdown: {
          marketCap: marketCapScore,
          communityEngagement: communityScore,
          holders: holdersScore
        },
        isHot: token.replies > 1000,
        achievements: [],
        imageUrl: token.image_url,
        tokenLink: formattedTokenUrl
      };
    });
  } catch (error) {
    console.error('Error fetching tokens:', error);
    throw error;
  }
};

export const useLeaderboardData = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPumpFunTokens();
        setCoins(data);
        setError(null);
      } catch (err) {
        console.error('Error in useLeaderboardData:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { coins, loading, error };
};