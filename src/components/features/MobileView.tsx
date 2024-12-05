import { Coin } from '../../types/leaderboard';
import { ExternalLink, MessageCircle } from 'lucide-react';

interface MobileViewProps {
  coins: Coin[];
}

export const MobileView = ({ coins }: MobileViewProps) => {
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1_000_000_000) {
      return `$${(marketCap / 1_000_000_000).toFixed(2)}B`;
    }
    if (marketCap >= 1_000_000) {
      return `$${(marketCap / 1_000_000).toFixed(2)}M`;
    }
    return `$${(marketCap / 1_000).toFixed(2)}K`;
  };

  return (
    <div className="md:hidden space-y-4">
      {coins.map(coin => (
        <div 
          key={coin.id}
          className="bg-white/5 rounded-lg p-4 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img 
                src={coin.imageUrl} 
                alt={coin.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h3 className="text-white font-medium">{coin.name}</h3>
                <p className="text-white/60 text-sm">{coin.symbol}</p>
              </div>
            </div>
            <a
              href={coin.tokenLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-pink-500"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-white/60">Market Cap</p>
              <p className="text-white">{formatMarketCap(coin.marketCap)}</p>
            </div>
            <div>
              <p className="text-white/60">Score</p>
              <p className="text-white">{coin.investabilityScore}</p>
            </div>
            <div>
              <p className="text-white/60">Replies</p>
              <div className="flex items-center gap-1 text-white">
                <MessageCircle className="w-4 h-4" />
                {coin.replies.toLocaleString()}
              </div>
            </div>
            <div>
              <p className="text-white/60">Status</p>
              <p className="text-pink-500">
                {coin.isHot ? 'Hot 🔥' : 'Active'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 