import React from 'react';
import { TrendingUp, TrendingDown, Flame, Moon } from 'lucide-react';
import { Coin } from '../types/leaderboard';

interface CoinRowProps {
  coin: Coin;
}

export const CoinRow = ({ coin }: CoinRowProps) => {
  const formatPrice = (price: number) => 
    price < 0.01 ? price.toExponential(2) : price.toFixed(2);

  return (
    <tr className="hover:bg-gray-800/30 transition-colors">
      <td className="py-4 px-6 text-gray-300">#{coin.rank}</td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-100">{coin.name}</span>
          {coin.isHot ? (
            <Flame className="w-4 h-4 text-pink-500 animate-pulse" />
          ) : (
            <Moon className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </td>
      <td className="py-4 px-6 font-mono text-gray-300">{coin.symbol}</td>
      <td className="py-4 px-6 font-mono text-gray-100">${formatPrice(coin.price)}</td>
      <td className={`py-4 px-6 ${coin.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        <div className="flex items-center gap-1">
          {coin.priceChange24h >= 0 ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {Math.abs(coin.priceChange24h).toFixed(2)}%
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${coin.investabilityScore}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-300">{coin.investabilityScore}</span>
        </div>
      </td>
    </tr>
  );
};