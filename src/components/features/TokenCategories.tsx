import { useMemo } from 'react';
import { PieChart } from 'lucide-react';
import { Coin } from '../../types/leaderboard';

interface TokenCategoriesProps {
  coins: Coin[];
}

export const TokenCategories = ({ coins }: TokenCategoriesProps) => {
  const categories = useMemo(() => {
    const scoreRanges = [
      { label: 'Elite (80+)', min: 80, max: 100, color: 'bg-green-500' },
      { label: 'Strong (60-79)', min: 60, max: 79, color: 'bg-blue-500' },
      { label: 'Moderate (40-59)', min: 40, max: 59, color: 'bg-yellow-500' },
      { label: 'Weak (0-39)', min: 0, max: 39, color: 'bg-red-500' }
    ];

    return scoreRanges.map(range => ({
      ...range,
      count: coins.filter(coin => 
        coin.investabilityScore >= range.min && 
        coin.investabilityScore <= range.max
      ).length,
      percentage: Math.round((coins.filter(coin => 
        coin.investabilityScore >= range.min && 
        coin.investabilityScore <= range.max
      ).length / coins.length) * 100)
    }));
  }, [coins]);

  return (
    <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg font-bold text-white">Token Categories</h2>
      </div>

      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${category.color}`} />
              <span className="text-white">{category.label}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/60">{category.count} tokens</span>
              <span className="text-white/60 w-12 text-right">
                {category.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 