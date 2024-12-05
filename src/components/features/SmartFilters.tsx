import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Coin } from '../../types/leaderboard';

interface SmartFiltersProps {
  coins: Coin[];
  onFilterChange: (filteredCoins: Coin[]) => void;
}

export const SmartFilters = ({ coins, onFilterChange }: SmartFiltersProps) => {
  const [minScore, setMinScore] = useState('');
  const [minReplies, setMinReplies] = useState('');
  const [minMarketCap, setMinMarketCap] = useState('');

  const applyFilters = () => {
    let filtered = [...coins];

    if (minScore) {
      filtered = filtered.filter(coin => 
        coin.investabilityScore >= parseInt(minScore)
      );
    }

    if (minReplies) {
      filtered = filtered.filter(coin => 
        coin.replies >= parseInt(minReplies)
      );
    }

    if (minMarketCap) {
      filtered = filtered.filter(coin => 
        coin.marketCap >= parseInt(minMarketCap)
      );
    }

    onFilterChange(filtered);
  };

  const resetFilters = () => {
    setMinScore('');
    setMinReplies('');
    setMinMarketCap('');
    onFilterChange(coins);
  };

  return (
    <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg font-bold text-white">Smart Filters</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-1">
            Min Score
          </label>
          <input
            type="number"
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
            placeholder="e.g. 70"
            className="w-full p-2 bg-black/20 rounded-lg text-white border border-white/10 focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-1">
            Min Replies
          </label>
          <input
            type="number"
            value={minReplies}
            onChange={(e) => setMinReplies(e.target.value)}
            placeholder="e.g. 1000"
            className="w-full p-2 bg-black/20 rounded-lg text-white border border-white/10 focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-1">
            Min Market Cap ($)
          </label>
          <input
            type="number"
            value={minMarketCap}
            onChange={(e) => setMinMarketCap(e.target.value)}
            placeholder="e.g. 1000000"
            className="w-full p-2 bg-black/20 rounded-lg text-white border border-white/10 focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={applyFilters}
            className="flex-1 p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="flex-1 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}; 