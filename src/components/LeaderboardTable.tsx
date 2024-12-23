import React, { useState, useRef } from 'react';
import { ExternalLink, Sparkles, TrendingUp, TrendingDown, Grid2x2, Grid3x3, LayoutGrid, Send, Twitter, ArrowUpDown } from 'lucide-react';
import { Coin } from '../types/leaderboard';

interface LeaderboardTableProps {
  coins: Coin[];
  onSelectCoin?: (coin: Coin) => void;
}

type GridLayout = '3' | '7' | '10';
type SortKey = 'rank' | 'marketCap' | 'replies' | 'investabilityScore';

export const LeaderboardTable = ({ coins, onSelectCoin }: LeaderboardTableProps) => {
  const [gridLayout, setGridLayout] = useState<GridLayout>('3');
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGridChange = (layout: GridLayout) => {
    setGridLayout(layout);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedCoins = [...coins].sort((a, b) => {
    const modifier = sortDirection === 'asc' ? 1 : -1;
    switch (sortKey) {
      case 'rank':
        return (a.rank - b.rank) * modifier;
      case 'marketCap':
        return (b.marketCap - a.marketCap) * modifier;
      case 'replies':
        return (b.replies - a.replies) * modifier;
      case 'investabilityScore':
        return (b.investabilityScore - a.investabilityScore) * modifier;
      default:
        return 0;
    }
  });

  const getGridClass = () => {
    switch (gridLayout) {
      case '3':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
      case '7':
        return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4';
      case '10':
        return 'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  const renderSocialButtons = () => (
    <div className="fixed top-4 right-4 flex gap-4 z-50">
      <a
        href="https://t.me/thepumphubonsol"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
      >
        <img 
          src="telegram.png" 
          alt="Telegram"
          className="w-6 h-6"
        />
      </a>
      <a
        href="https://x.com/ThePumpHubonSol"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg hover:shadow-gray-500/20 transition-all duration-300"
      >
        <Twitter className="w-6 h-6" />
      </a>
    </div>
  );

  const renderGridButtons = () => (
    <div className="flex gap-4 mb-4 justify-center relative z-50">
      <button
        type="button"
        onClick={() => handleGridChange('3')}
        className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
          gridLayout === '3' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-black/40 text-gray-400 hover:bg-black/60'
        }`}
      >
        <Grid2x2 className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={() => handleGridChange('7')}
        className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
          gridLayout === '7' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-black/40 text-gray-400 hover:bg-black/60'
        }`}
      >
        <Grid3x3 className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={() => handleGridChange('10')}
        className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
          gridLayout === '10' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-black/40 text-gray-400 hover:bg-black/60'
        }`}
      >
        <LayoutGrid className="w-6 h-6" />
      </button>
    </div>
  );

  const renderFilterButtons = () => (
    <div className="flex gap-4 mb-8 justify-center relative z-50">
      {['rank', 'marketCap', 'replies', 'investabilityScore'].map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => handleSort(key as SortKey)}
          className={`px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 ${
            sortKey === key ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-black/40 text-gray-400 hover:bg-black/60'
          }`}
        >
          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
          {sortKey === key && <ArrowUpDown className="w-4 h-4" />}
        </button>
      ))}
    </div>
  );

  const getTileSize = () => {
    switch (gridLayout) {
      case '3':
        return 'text-base p-4 space-y-3';
      case '7':
        return 'text-xs p-2 space-y-2';
      case '10':
        return 'text-xs p-1.5 space-y-1';
      default:
        return 'text-base p-4 space-y-3';
    }
  };

  const getImageSize = () => {
    switch (gridLayout) {
      case '3':
        return 'w-8 h-8';
      case '7':
        return 'w-6 h-6';
      case '10':
        return 'w-5 h-5';
      default:
        return 'w-8 h-8';
    }
  };

  const getTitleSize = () => {
    switch (gridLayout) {
      case '3':
        return 'text-lg';
      case '7':
        return 'text-sm';
      case '10':
        return 'text-xs';
      default:
        return 'text-lg';
    }
  };

  const getNameSize = () => {
    switch (gridLayout) {
      case '3':
        return 'text-sm';
      case '7':
        return 'text-xs';
      case '10':
        return 'text-[10px]';
      default:
        return 'text-sm';
    }
  };

  return (
    <div ref={containerRef} className="relative px-4 max-w-[1920px] mx-auto">
      <div className="absolute inset-0 diagonal-lines opacity-50"></div>
      
      {renderSocialButtons()}
      
      <div className="relative">
        {renderGridButtons()}
        {renderFilterButtons()}
      </div>
      
      <div className={getGridClass()}>
        {sortedCoins.map((coin, index) => (
          <div
            key={coin.id}
            onClick={() => onSelectCoin?.(coin)}
            className={`group relative bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/20
                     hover:bg-black/60 transition-all duration-500 transform hover:-translate-y-2
                     hover:shadow-xl hover:shadow-emerald-500/10 animate-fade-in cursor-pointer ${getTileSize()}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-1.5">
                <div className="token-image shrink-0">
                  <img 
                    src={coin.imageUrl || `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coin.symbol.toLowerCase()}.png`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/generic.png'
                    }}
                    alt={coin.name}
                    className={`rounded-full ${getImageSize()}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className={`${getTitleSize()} font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 shrink-0`}>
                      #{coin.rank}
                    </span>
                    <h3 className={`${getNameSize()} font-bold text-white font-orbitron truncate max-w-[120px] leading-tight`}>
                      {coin.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-400 block truncate">{coin.symbol}</span>
                </div>
              </div>
              {coin.investabilityScore > 80 && (
                <div className="flex items-center gap-0.5 shrink-0">
                  <Sparkles className={`${gridLayout === '10' ? 'w-3 h-3' : gridLayout === '7' ? 'w-3 h-3' : 'w-4 h-4'} text-yellow-400 animate-pulse`} />
                  <TrendingUp className={`${gridLayout === '10' ? 'w-3 h-3' : gridLayout === '7' ? 'w-3 h-3' : 'w-4 h-4'} text-emerald-400`} />
                </div>
              )}
            </div>
            
            <div className="space-y-1 font-poppins">
              <div className="flex justify-between items-center p-1 rounded-lg bg-black/20">
                <span className="text-gray-400 text-xs">Price</span>
                <span className="text-white font-medium text-xs truncate ml-1">${coin.price.toFixed(8)}</span>
              </div>
              <div className="flex justify-between items-center p-1 rounded-lg bg-black/20">
                <span className="text-gray-400 text-xs">Market Cap</span>
                <span className="text-white font-medium text-xs truncate ml-1">${coin.marketCap.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-1 rounded-lg bg-black/20">
                <span className="text-gray-400 text-xs">Replies</span>
                <span className="text-white font-medium text-xs">{coin.replies}</span>
              </div>
              <div className="flex justify-between items-center p-1 rounded-lg bg-black/20">
                <span className="text-gray-400 text-xs">Score</span>
                <div className="flex items-center gap-0.5">
                  <span className="text-white font-medium text-xs">{coin.investabilityScore.toFixed(2)}</span>
                  {coin.investabilityScore > 70 ? (
                    <TrendingUp className={`${gridLayout === '10' ? 'w-2 h-2' : 'w-3 h-3'} text-emerald-400`} />
                  ) : coin.investabilityScore < 30 ? (
                    <TrendingDown className={`${gridLayout === '10' ? 'w-2 h-2' : 'w-3 h-3'} text-red-400`} />
                  ) : null}
                </div>
              </div>
            </div>

            <a
              href={coin.tokenLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1 flex items-center justify-center w-full py-1 px-2
                       bg-gradient-to-r from-emerald-500 to-cyan-500 
                       text-white rounded-lg font-medium shadow-lg shadow-emerald-500/20
                       opacity-0 group-hover:opacity-100 transition-all duration-300
                       transform translate-y-2 group-hover:translate-y-0 text-xs`}
              onClick={(e) => e.stopPropagation()}
            >
              View Details <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};