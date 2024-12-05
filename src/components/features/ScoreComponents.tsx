import { PieChart } from 'lucide-react';
import { Coin } from '../../types/leaderboard';

interface ScoreComponentsProps {
  coins: Coin[];
}

export const ScoreComponents = ({ coins }: ScoreComponentsProps) => {
  const components = [
    { label: 'Market Cap', percentage: 30 },
    { label: 'Community', percentage: 35 },
    { label: 'Holders', percentage: 35 }
  ];

  return (
    <div className="bg-white/5 rounded-lg backdrop-blur-md">
      <div className="p-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-pink-500" />
          <h2 className="text-sm font-medium text-white">Score Components</h2>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {components.map(component => (
          <div key={component.label} className="flex items-center justify-between">
            <span className="text-sm text-white/60">{component.label}</span>
            <span className="text-sm text-white font-medium">{component.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 