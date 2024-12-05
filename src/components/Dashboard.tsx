import { useState, useEffect } from 'react';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import { LeaderboardTable } from './LeaderboardTable';
import { LeaderboardHeader } from './LeaderboardHeader';
import { Toggle } from './ui/Toggle';
import { Coin } from '../types/leaderboard';
import { 
  MarketStats, 
  TrendingSection, 
  ScoreDistribution, 
  TokenCategories,
  ActivityTimeline, 
  ComparisonTool, 
  SmartFilters, 
  ExportTools,
  AlertSystem,
  MobileView 
} from './features';

export const Dashboard = () => {
  const { coins, loading, error } = useLeaderboardData();
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (coins && coins.length > 0) {
      setFilteredCoins(coins);
    }
  }, [coins]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  if (!coins || coins.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-[#111111]">
        <div className="text-white/60">No data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Main Table Section */}
      <div className="space-y-4">
        <LeaderboardHeader />
        <div className="hidden md:block">
          <LeaderboardTable coins={filteredCoins} />
        </div>
        <div className="md:hidden">
          <MobileView coins={filteredCoins} />
        </div>
      </div>

      {/* Advanced Toggle */}
      <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/10">
        <Toggle
          checked={showAdvanced}
          onChange={setShowAdvanced}
          label="Advanced Details"
        />
      </div>

      {/* Advanced Details Section */}
      {showAdvanced && (
        <div className="space-y-8">
          {/* Quick Stats */}
          <MarketStats coins={coins} />

          {/* Filters and Export */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SmartFilters coins={coins} onFilterChange={setFilteredCoins} />
            <ExportTools coins={filteredCoins} />
          </div>

          {/* Analytics Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">
              Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TrendingSection coins={coins} />
              <ScoreDistribution coins={coins} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TokenCategories coins={coins} />
              <ActivityTimeline coins={coins} />
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">
              Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AlertSystem coins={coins} />
              <ComparisonTool coins={coins} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 