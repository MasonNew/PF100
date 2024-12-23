import React, { useState, useEffect } from 'react';
import { Search, Filter, X, RefreshCw } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  initialFilters: FilterOptions;
}

interface FilterOptions {
  minScore: number;
  maxScore: number;
  minMarketCap: number;
  maxMarketCap: number;
  minReplies: number;
}

export const SearchBar = ({ onSearch, onFilter, initialFilters }: SearchBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [searchValue, setSearchValue] = useState('');

  // Update local filters when initial filters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterChange = (key: keyof FilterOptions, value: number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const resetFilters = () => {
    const defaultFilters = {
      minScore: 0,
      maxScore: 100,
      minMarketCap: 0,
      maxMarketCap: Number.MAX_SAFE_INTEGER,
      minReplies: 0,
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by token name or symbol..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-12 py-4 bg-black/40 border border-emerald-500/20 rounded-xl
                   text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500
                   transition-colors"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-black/40 rounded-xl border border-emerald-500/20 animate-fade-in overflow-hidden">
          <div className="p-4 border-b border-emerald-500/20 flex justify-between items-center">
            <h3 className="text-white font-medium">Filter Options</h3>
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Score Filter */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Score Range</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.minScore}
                  onChange={(e) => handleFilterChange('minScore', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  placeholder="Min"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.maxScore}
                  onChange={(e) => handleFilterChange('maxScore', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  placeholder="Max"
                />
              </div>
              <div className="text-xs text-gray-500">Current: {filters.minScore} - {filters.maxScore}</div>
            </div>

            {/* Market Cap Filter */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Market Cap (USD)</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  min="0"
                  value={filters.minMarketCap}
                  onChange={(e) => handleFilterChange('minMarketCap', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  placeholder="Min"
                />
                <input
                  type="number"
                  min="0"
                  value={filters.maxMarketCap === Number.MAX_SAFE_INTEGER ? '' : filters.maxMarketCap}
                  onChange={(e) => handleFilterChange('maxMarketCap', e.target.value ? Number(e.target.value) : Number.MAX_SAFE_INTEGER)}
                  className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  placeholder="Max"
                />
              </div>
              <div className="text-xs text-gray-500">
                Current: ${formatMarketCap(filters.minMarketCap)} - {filters.maxMarketCap === Number.MAX_SAFE_INTEGER ? '∞' : `$${formatMarketCap(filters.maxMarketCap)}`}
              </div>
            </div>

            {/* Replies Filter */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Minimum Replies</label>
              <input
                type="number"
                min="0"
                value={filters.minReplies}
                onChange={(e) => handleFilterChange('minReplies', Number(e.target.value))}
                className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                placeholder="Min replies"
              />
              <div className="text-xs text-gray-500">Current: ≥ {filters.minReplies}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 