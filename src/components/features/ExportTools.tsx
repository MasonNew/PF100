import { Download } from 'lucide-react';
import { Coin } from '../../types/leaderboard';

interface ExportToolsProps {
  coins: Coin[];
}

export const ExportTools = ({ coins }: ExportToolsProps) => {
  const exportToCSV = () => {
    const headers = [
      'Rank',
      'Name',
      'Symbol',
      'Price',
      'Market Cap',
      'Replies',
      'Score',
      'Link'
    ].join(',');

    const rows = coins.map(coin => [
      coin.rank,
      `"${coin.name}"`,
      coin.symbol,
      coin.price,
      coin.marketCap,
      coin.replies,
      coin.investabilityScore,
      coin.tokenLink
    ].join(','));

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pf100-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const data = coins.map(coin => ({
      rank: coin.rank,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.price,
      marketCap: coin.marketCap,
      replies: coin.replies,
      score: coin.investabilityScore,
      link: coin.tokenLink
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pf100-export.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
      <div className="flex items-center gap-2 mb-6">
        <Download className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg font-bold text-white">Export Data</h2>
      </div>

      <div className="space-y-4">
        <button
          onClick={exportToCSV}
          className="w-full p-3 bg-black/20 rounded-lg text-white hover:bg-black/30 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export as CSV
        </button>

        <button
          onClick={exportToJSON}
          className="w-full p-3 bg-black/20 rounded-lg text-white hover:bg-black/30 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export as JSON
        </button>

        <p className="text-sm text-white/60 text-center">
          Export the current table data in your preferred format
        </p>
      </div>
    </div>
  );
}; 