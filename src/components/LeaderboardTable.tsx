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

  return (
    <div className="rounded-lg shadow-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700">
      <div 
        ref={tableRef}
        className="table-scroll overflow-auto"
        style={{ height: '70vh' }}
      >
        <table className="min-w-full">
          <thead className="bg-gray-800/50 sticky top-0 z-10">
            <tr>
              {['Rank', 'Name', 'Symbol', 'Price', '24h Change', 'Score'].map((header) => (
                <th 
                  key={header}
                  className="py-4 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700/50 transition-colors"
                  onClick={() => handleSort(header.toLowerCase() as keyof Coin)}
                >
                  <div className="flex items-center gap-1">
                    {header}
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedCoins.slice(0, displayCount).map(coin => (
              <CoinRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
        {displayCount < sortedCoins.length && (
          <div className="text-center py-4 text-gray-400">
            <div className="animate-pulse">Loading more coins...</div>
          </div>
        )}
      </div>
    </div>
  );
};