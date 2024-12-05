import { useState } from 'react';
import { ArrowRightLeft, X } from 'lucide-react';
import { Coin } from '../../types/leaderboard';

interface ComparisonToolProps {
  coins: Coin[];
}

export const ComparisonTool = ({ coins }: ComparisonToolProps) => {
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  const handleTokenSelect = (tokenId: string) => {
    if (selectedTokens.includes(tokenId)) {
      setSelectedTokens(selectedTokens.filter(id => id !== tokenId));
    } else if (selectedTokens.length < 3) {
      setSelectedTokens([...selectedTokens, tokenId]);
    }
  };

  const selectedCoinData = selectedTokens.map(id => coins.find(c => c.id === id)).filter(Boolean);

  return (
    <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
      <div className="flex items-center gap-2 mb-6">
        <ArrowRightLeft className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg font-bold text-white">Compare Tokens</h2>
      </div>

      {/* Token Selector */}
      <div className="mb-4">
        <select
          value=""
          onChange={(e) => handleTokenSelect(e.target.value)}
          className="w-full p-2 bg-black/20 rounded-lg text-white border border-white/10 focus:border-pink-500 focus:outline-none"
        >
          <option value="">Select a token to compare (max 3)</option>
          {coins.map(coin => (
            <option 
              key={coin.id} 
              value={coin.id}
              disabled={selectedTokens.includes(coin.id)}
            >
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Tokens Display */}
      <div className="grid grid-cols-1 gap-4">
        {selectedCoinData.map(coin => (
          <div 
            key={coin.id}
            className="bg-black/20 rounded-lg p-3 relative"
          >
            <button
              onClick={() => handleTokenSelect(coin.id)}
              className="absolute top-2 right-2 text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-3">
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

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-white/60">Score</div>
                <div className="text-white font-medium">{coin.investabilityScore}</div>
              </div>
              <div>
                <div className="text-white/60">Market Cap</div>
                <div className="text-white font-medium">${coin.marketCap.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-white/60">Replies</div>
                <div className="text-white font-medium">{coin.replies.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTokens.length === 0 && (
        <div className="text-center text-white/60 py-8">
          Select tokens to compare their metrics
        </div>
      )}
    </div>
  );
}; 