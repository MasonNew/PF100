import React from 'react';
import { TrendingUp, TrendingDown, Flame, Moon, MessageCircle, ExternalLink, HelpCircle } from 'lucide-react';
import { Coin } from '../types/leaderboard';

interface CoinRowProps {
  coin: Coin;
}

export const CoinRow = ({ coin }: CoinRowProps) => {
  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return price.toFixed(8).replace(/\.?0+$/, '');
    }
    return price.toFixed(2);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1_000_000_000) {
      return `$${(marketCap / 1_000_000_000).toFixed(2)}B`;
    }
    if (marketCap >= 1_000_000) {
      return `$${(marketCap / 1_000_000).toFixed(2)}M`;
    }
    if (marketCap >= 1_000) {
      return `$${(marketCap / 1_000).toFixed(2)}K`;
    }
    return `$${marketCap.toFixed(2)}`;
  };

  const investabilityTooltip = (
    <div className="text-xs space-y-1">
      <div className="font-semibold mb-1">Investability Score Components:</div>
      <div>• Market Cap (40%)</div>
      <div>• Community Engagement (40%)</div>
      <div>• Project Description (20%)</div>
    </div>
  );

  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="py-4 px-6 text-white">{coin.rank}</td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          {coin.imageUrl && (
            <img 
              src={coin.imageUrl} 
              alt={coin.name} 
              className="w-8 h-8 rounded-full bg-white/10"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/32?text=${coin.symbol}`;
              }}
            />
          )}
          <a 
            href={coin.tokenLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 transition-colors"
          >
            {coin.name}
          </a>
          {coin.isHot ? (
            <Flame className="w-4 h-4 text-pink-500 animate-pulse" />
          ) : (
            <Moon className="w-4 h-4 text-white/60" />
          )}
        </div>
      </td>
      <td className="py-4 px-6 font-mono text-white/90">{coin.symbol}</td>
      <td className="py-4 px-6 font-mono text-white">${formatPrice(coin.price)}</td>
      <td className="py-4 px-6 font-mono text-white/90">{formatMarketCap(coin.marketCap)}</td>
      <td className="py-4 px-6 text-white/90">
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          {formatNumber(coin.replies)}
        </div>
      </td>
      <td className="py-4 px-6 group relative">
        <div className="flex items-center gap-2">
          <div className="w-full bg-white/10 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${coin.investabilityScore}%` }}
            ></div>
          </div>
          <span className="text-sm text-white/90">{coin.investabilityScore}</span>
          <div className="relative inline-block">
            <HelpCircle className="w-4 h-4 text-white/60 hover:text-pink-500 cursor-help" />
            <div className="absolute invisible group-hover:visible bg-white/10 backdrop-blur-md text-white p-3 rounded-lg shadow-lg -top-24 right-0 w-48 z-10">
              {investabilityTooltip}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <a 
          href={coin.tokenLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-pink-500 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </td>
    </tr>
  );
};