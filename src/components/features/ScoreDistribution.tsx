import { useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import { Coin } from '../../types/leaderboard';

interface ScoreDistributionProps {
  coins: Coin[];
}

export const ScoreDistribution = ({ coins }: ScoreDistributionProps) => {
  const distribution = useMemo(() => {
    const ranges = [
      { min: 41, max: 60, label: '41-60' },
      { min: 61, max: 80, label: '61-80' },
      { min: 81, max: 100, label: '81-100' }
    ];

    return ranges.map(range => ({
      ...range,
      count: coins.filter(coin => 
        coin.investabilityScore >= range.min && 
        coin.investabilityScore <= range.max
      ).length
    }));
  }, [coins]);

  const maxCount = Math.max(...distribution.map(d => d.count));

  return (
    <div className="bg-white/5 rounded-lg backdrop-blur-md h-full flex flex-col">
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-pink-500" />
          <h2 className="text-base font-medium text-white">Score Distribution</h2>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between p-4">
        {/* Bar Chart */}
        <div className="space-y-6">
          {distribution.map(range => (
            <div key={range.label} className="flex items-center gap-3">
              <div className="w-14 text-sm text-white/60">{range.label}</div>
              <div className="flex-1">
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${(range.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-12 text-right text-sm text-white/60">
                {range.count}t
              </div>
            </div>
          ))}
        </div>

        {/* Summary Numbers */}
        <div className="grid grid-cols-3 gap-6 pt-6 mt-6 border-t border-white/5">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">
              {distribution[0].count}
            </div>
            <div className="text-sm text-white/60 mt-1">Mid Range</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">
              {distribution[1].count}
            </div>
            <div className="text-sm text-white/60 mt-1">High Range</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">
              {distribution[2].count}
            </div>
            <div className="text-sm text-white/60 mt-1">Elite Range</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 