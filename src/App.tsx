import React, { useState, useEffect } from 'react';
import { LeaderboardHeader } from './components/LeaderboardHeader';
import { LeaderboardTable } from './components/LeaderboardTable';
import { Disclaimer } from './components/Disclaimer';
import { useLeaderboardData } from './hooks/useLeaderboardData';
import { Toggle } from './components/ui/Toggle';
import { MarketStats } from './components/features/MarketStats';
import { TrendingSection } from './components/features/TrendingSection';
import { ScoreDistribution } from './components/features/ScoreDistribution';
import { TokenCategories } from './components/features/TokenCategories';
import { ComparisonTool } from './components/features/ComparisonTool';
import { SmartFilters } from './components/features/SmartFilters';
import { ExportTools } from './components/features/ExportTools';
import { AlertSystem } from './components/features/AlertSystem';
import { ScoreComponents } from './components/features/ScoreComponents';

function App() {
  const { coins, loading, error } = useLeaderboardData();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filteredCoins, setFilteredCoins] = useState(coins);

  useEffect(() => {
    if (coins) {
      setFilteredCoins(coins);
    }
  }, [coins]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-[#111111]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-[#111111]">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-[#111111]">
      {/* Warning Banner */}
      <div className="bg-red-600 text-white py-3 px-4 text-center font-bold tracking-wide">
        WE ARE NOT LIVE ON PUMP.FUN YET, ALL CURRENT COINS OUT THERE ARE SCAMS
      </div>
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Main Content */}
          <LeaderboardHeader />
          <LeaderboardTable coins={filteredCoins} />
          
          {/* Advanced Toggle */}
          <div className="flex justify-end border-t border-white/10 pt-4">
            <Toggle
              checked={showAdvanced}
              onChange={setShowAdvanced}
              label="Advanced Details"
            />
          </div>

          {/* Advanced Features */}
          {showAdvanced && (
            <div className="space-y-8">
              <MarketStats coins={coins} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SmartFilters coins={coins} onFilterChange={setFilteredCoins} />
                <ExportTools coins={filteredCoins} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TrendingSection coins={coins} />
                <ScoreDistribution coins={coins} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TokenCategories coins={coins} />
                <AlertSystem coins={coins} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ScoreComponents coins={coins} />
                <ComparisonTool coins={coins} />
              </div>
            </div>
          )}

          <Disclaimer />
        </div>
      </div>
    </div>
  );
}

export default App;