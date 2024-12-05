import { useMemo } from 'react';
import { Flame } from 'lucide-react';
import { Coin } from '../../types/leaderboard';

interface TrendingSectionProps {
  coins: Coin[];
}

export const TrendingSection = ({ coins }: TrendingSectionProps) => {
  const trendingCoins = useMemo(() => {
    return [...coins]
      .sort((a, b) => b.replies - a.replies)
      .slice(0, 5)
      .map(coin => ({
        ...coin,
        replyChange: coin.replies
      }));
  }, [coins]);

  return (
    <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg font-bold text-white">Trending Now</h2>
      </div>

      <div className="space-y-3">
        {trendingCoins.map((coin) => (
          <div 
            key={coin.id}
            className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              {coin.imageUrl && (
                <img 
                  src={coin.imageUrl} 
                  alt={coin.name} 
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <h3 className="text-white font-medium">{coin.name}</h3>
                <p className="text-sm text-white/60">{coin.symbol}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-white font-medium">
                {coin.replies.toLocaleString()} replies
              </div>
              <div className="text-sm text-pink-500">
                Score: {coin.investabilityScore}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 