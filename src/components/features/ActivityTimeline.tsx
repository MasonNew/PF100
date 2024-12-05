import { useMemo } from 'react';
import { Activity } from 'lucide-react';
import { Coin } from '../../types/leaderboard';

interface ActivityTimelineProps {
  coins: Coin[];
}

interface DataPoint {
  hour: string;
  marketCap: number;
  formatted: string;
}

export const ActivityTimeline = ({ coins }: ActivityTimelineProps) => {
  const activityData = useMemo(() => {
    // Get top 10 coins by market cap
    const topCoins = [...coins]
      .sort((a, b) => b.marketCap - a.marketCap)
      .slice(0, 10);

    // Generate 24h of data with realistic market cap changes
    const hours = Array.from({ length: 24 }, (_, i) => {
      const time = new Date();
      time.setHours(time.getHours() - (23 - i));
      
      // Calculate total market cap with realistic volatility
      const totalMarketCap = topCoins.reduce((sum, coin) => {
        const volatility = 0.02; // 2% max change per hour
        const change = (Math.random() - 0.5) * 2 * volatility;
        return sum + (coin.marketCap * (1 + change));
      }, 0);

      return {
        hour: time.getHours().toString().padStart(2, '0'),
        marketCap: totalMarketCap,
        formatted: formatMarketCap(totalMarketCap)
      };
    });

    return hours;
  }, [coins]);

  return (
    <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg font-bold text-white">24h Activity</h2>
      </div>
      <div className="h-48">
        <div className="w-full h-full flex items-end">
          {activityData.map((point, index) => {
            const height = `${(point.marketCap / Math.max(...activityData.map(d => d.marketCap))) * 100}%`;
            return (
              <div
                key={point.hour}
                className="flex-1 flex flex-col items-center group"
              >
                <div 
                  className="w-full bg-gradient-to-t from-pink-500 to-purple-500 rounded-t transition-all duration-300 group-hover:opacity-80"
                  style={{ height }}
                />
                <div className="text-xs text-white/60 mt-1">
                  {point.hour}:00
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 