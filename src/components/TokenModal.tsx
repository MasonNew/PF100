import React from 'react';
import { X, ExternalLink, TrendingUp, TrendingDown, AlertCircle, Share2 } from 'lucide-react';
import { Coin } from '../types/leaderboard';

interface TokenModalProps {
  coin: Coin;
  onClose: () => void;
}

export const TokenModal = ({ coin, onClose }: TokenModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-black/60 rounded-2xl border border-emerald-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-emerald-500/20">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="token-image w-16 h-16">
                <img 
                  src={coin.imageUrl || `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coin.symbol.toLowerCase()}.png`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/generic.png'
                  }}
                  alt={coin.name}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-orbitron">{coin.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-medium">{coin.symbol}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">Rank #{coin.rank}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Price</div>
              <div className="text-xl font-bold text-white">${coin.price.toFixed(8)}</div>
            </div>
            <div className="bg-black/40 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Market Cap</div>
              <div className="text-xl font-bold text-white">${coin.marketCap.toLocaleString()}</div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="bg-black/40 rounded-xl p-4">
            <h3 className="text-lg font-bold text-white mb-4">Investability Score</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Overall Score</span>
                  <span className="text-white font-medium">{coin.investabilityScore.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all"
                    style={{ width: `${coin.investabilityScore}%` }}
                  />
                </div>
              </div>
              {Object.entries(coin.investabilityBreakdown).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-white font-medium">{value.toFixed(2)}</span>
                  </div>
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500/50 transition-all"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-black/40 rounded-xl p-4">
            <h3 className="text-lg font-bold text-white mb-4">Community Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 text-sm mb-1">Total Replies</div>
                <div className="text-xl font-bold text-white">{coin.replies.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Holder Count</div>
                <div className="text-xl font-bold text-white">{coin.holderCount.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <a
              href={coin.tokenLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4
                       bg-gradient-to-r from-emerald-500 to-cyan-500 
                       text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20
                       hover:shadow-xl hover:shadow-emerald-500/40 transition-all"
            >
              View Token <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="flex items-center justify-center gap-2 py-3 px-6
                       bg-black/40 text-white rounded-xl font-medium
                       hover:bg-black/60 transition-all border border-emerald-500/20"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 