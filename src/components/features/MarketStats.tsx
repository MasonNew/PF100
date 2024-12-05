import { useMemo } from 'react';
import { TrendingUp, DollarSign, Users } from 'lucide-react';
import { Coin } from '../../types/leaderboard';

interface MarketStatsProps {
  coins: Coin[];
}

export const MarketStats = ({ coins }: MarketStatsProps) => {
  const stats = useMemo(() => {
    const totalMarketCap = coins.reduce((sum, coin) => sum + coin.marketCap, 0);
    const totalReplies = coins.reduce((sum, coin) => sum + coin.replies, 0);
    const hotCoins = coins.filter(coin => coin.isHot).length;

    return {
      marketCap: totalMarketCap,
      replies: totalReplies,
      hotCoins
    };
  }, [coins]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-pink-500" />
          <h3 className="text-white font-medium">Total Market Cap</h3>
        </div>
        <p className="text-2xl font-bold text-white">
          ${stats.marketCap.toLocaleString()}
        </p>
      </div>

      <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-pink-500" />
          <h3 className="text-white font-medium">Total Replies</h3>
        </div>
        <p className="text-2xl font-bold text-white">
          {stats.replies.toLocaleString()}
        </p>
      </div>

      <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-pink-500" />
          <h3 className="text-white font-medium">Hot Coins</h3>
        </div>
        <p className="text-2xl font-bold text-white">
          {stats.hotCoins}
        </p>
      </div>
    </div>
  );
}; 