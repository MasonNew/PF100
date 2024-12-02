import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Coin, SortConfig } from '../types/leaderboard';
import { CoinRow } from './CoinRow';

interface LeaderboardTableProps {
  coins: Coin[];
}

export const LeaderboardTable = ({ coins }: LeaderboardTableProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'rank',
    direction: 'asc'
  });
  const [displayCount, setDisplayCount] = useState(20);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleSort = (key: keyof Coin) => {
    if (key === 'name' || key === 'symbol') return;

    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedCoins = [...coins].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (scrollHeight - scrollTop <= clientHeight * 1.5 && displayCount < sortedCoins.length) {
        setDisplayCount(prev => Math.min(prev + 10, sortedCoins.length));
      }
    }
  };

  useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
      return () => tableElement.removeEventListener('scroll', handleScroll);
    }
  }, [displayCount, sortedCoins.length]);

  const renderHeader = (label: string, key: keyof Coin) => {
    const isSortable = !['name', 'symbol'].includes(key);
    return (
      <th 
        key={key}
        className={`py-4 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${
          isSortable ? 'cursor-pointer hover:bg-black/30 transition-colors' : ''
        }`}
        onClick={() => isSortable && handleSort(key)}
      >
        <div className="flex items-center gap-1">
          {label}
          {isSortable && <ArrowUpDown className="w-4 h-4" />}
        </div>
      </th>
    );
  };

  return (
    <div className="rounded-lg shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
      <div 
        ref={tableRef}
        className="table-scroll overflow-auto"
        style={{ height: '70vh' }}
      >
        <table className="min-w-full">
          <thead className="bg-white/20 backdrop-blur-md sticky top-0 z-10">
            <tr>
              {renderHeader('Rank', 'rank')}
              {renderHeader('Name', 'name')}
              {renderHeader('Symbol', 'symbol')}
              {renderHeader('Price', 'price')}
              {renderHeader('Market Cap', 'marketCap')}
              {renderHeader('Replies', 'replies')}
              {renderHeader('Investability Score', 'investabilityScore')}
              <th className="py-4 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {sortedCoins.slice(0, displayCount).map(coin => (
              <CoinRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
        {displayCount < sortedCoins.length && (
          <div className="text-center py-4 text-white">
            <div className="animate-pulse">Loading more coins...</div>
          </div>
        )}
      </div>
    </div>
  );
};