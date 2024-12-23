import React, { useState, useEffect, useCallback } from 'react';
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
import { SearchBar } from './components/SearchBar';
import { TokenModal } from './components/TokenModal';
import { HelpMenu } from './components/HelpMenu';
import { ParticleBackground } from './components/ParticleBackground';
import './styles/background.css';

function App() {
  const { coins, loading, error } = useLeaderboardData();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filteredCoins, setFilteredCoins] = useState(coins);
  const [selectedCoin, setSelectedCoin] = useState<typeof coins[0] | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    minScore: 0,
    maxScore: 100,
    minMarketCap: 0,
    maxMarketCap: Number.MAX_SAFE_INTEGER,
    minReplies: 0,
  });

  // Update filtered coins when source data or filters change
  useEffect(() => {
    if (!coins) return;
    
    let filtered = [...coins];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(coin => 
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
      );
    }

    // Apply numeric filters
    filtered = filtered.filter(coin => 
      coin.investabilityScore >= activeFilters.minScore &&
      coin.investabilityScore <= activeFilters.maxScore &&
      coin.marketCap >= activeFilters.minMarketCap &&
      (activeFilters.maxMarketCap === Number.MAX_SAFE_INTEGER || coin.marketCap <= activeFilters.maxMarketCap) &&
      coin.replies >= activeFilters.minReplies
    );

    setFilteredCoins(filtered);
  }, [coins, searchQuery, activeFilters]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilter = useCallback((filters: typeof activeFilters) => {
    setActiveFilters(filters);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === '?' || (e.key === 'h' && !e.metaKey && !e.ctrlKey)) {
        setShowHelp(prev => !prev);
      }
      if (e.key === 'a' && !e.metaKey && !e.ctrlKey) {
        setShowAdvanced(prev => !prev);
      }
      if (e.key === 'Escape') {
        if (selectedCoin) {
          setSelectedCoin(null);
        } else if (showHelp) {
          setShowHelp(false);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCoin, showHelp]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <div className="diagonal-lines fixed inset-0 opacity-30 pointer-events-none"></div>
      <div className="radial-gradient fixed inset-0 opacity-50 pointer-events-none"></div>
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Main Content */}
          <LeaderboardHeader coins={coins} />
          <SearchBar 
            onSearch={handleSearch} 
            onFilter={handleFilter}
            initialFilters={activeFilters}
          />
          <LeaderboardTable 
            coins={filteredCoins} 
            onSelectCoin={setSelectedCoin}
          />
          
          {/* Advanced Toggle */}
          <div className="flex justify-end border-t border-emerald-500/10 pt-4">
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

      {/* Modals */}
      {selectedCoin && (
        <TokenModal 
          coin={selectedCoin} 
          onClose={() => setSelectedCoin(null)} 
        />
      )}
      <HelpMenu 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
      />

      {/* Help Hint */}
      <div className="fixed bottom-4 right-4 text-gray-400 text-sm animate-fade-in">
        Press ? for help
      </div>
    </div>
  );
}

export default App;