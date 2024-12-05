import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Coin } from '../../types/leaderboard';

interface AlertSystemProps {
  coins: Coin[];
}

type AlertMetric = 'score' | 'replies' | 'marketCap';

interface Alert {
  id: string;
  coinId: string;
  metric: AlertMetric;
  threshold: number;
  isAbove: boolean;
}

export const AlertSystem = ({ coins }: AlertSystemProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [selectedMetric, setSelectedMetric] = useState<AlertMetric>('score');
  const [threshold, setThreshold] = useState('');
  const [isAbove, setIsAbove] = useState(true);

  const addAlert = () => {
    if (!selectedCoin || !threshold) return;

    const newAlert: Alert = {
      id: Date.now().toString(),
      coinId: selectedCoin,
      metric: selectedMetric,
      threshold: Number(threshold),
      isAbove
    };

    setAlerts([...alerts, newAlert]);
    resetForm();
  };

  const removeAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const resetForm = () => {
    setSelectedCoin('');
    setSelectedMetric('score');
    setThreshold('');
    setIsAbove(true);
  };

  const getMetricDisplay = (metric: AlertMetric) => {
    switch (metric) {
      case 'score': return 'Score';
      case 'replies': return 'Replies';
      case 'marketCap': return 'Market Cap';
    }
  };

  return (
    <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg font-bold text-white">Set Alerts</h2>
      </div>

      <div className="space-y-4">
        {/* Alert Form */}
        <div className="space-y-3">
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="w-full p-2 bg-black/20 rounded-lg text-white border border-white/10 focus:border-pink-500 focus:outline-none"
          >
            <option value="">Select Token</option>
            {coins.map(coin => (
              <option key={coin.id} value={coin.id}>{coin.name}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as AlertMetric)}
              className="w-32 p-2 bg-black/20 rounded-lg text-white border border-white/10 focus:border-pink-500 focus:outline-none"
            >
              <option value="score">Score</option>
              <option value="replies">Replies</option>
              <option value="marketCap">Market Cap</option>
            </select>

            <select
              value={isAbove ? 'above' : 'below'}
              onChange={(e) => setIsAbove(e.target.value === 'above')}
              className="w-24 p-2 bg-black/20 rounded-lg text-white border border-white/10 focus:border-pink-500 focus:outline-none"
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>

            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              placeholder="Value"
              className="flex-1 p-2 bg-black/20 rounded-lg text-white border border-white/10 focus:border-pink-500 focus:outline-none"
            />
          </div>

          <button
            onClick={addAlert}
            disabled={!selectedCoin || !threshold}
            className="w-full p-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            Add Alert
          </button>
        </div>

        {/* Active Alerts */}
        <div className="space-y-2">
          {alerts.map(alert => {
            const coin = coins.find(c => c.id === alert.coinId);
            if (!coin) return null;

            return (
              <div 
                key={alert.id}
                className="flex items-center justify-between p-2 bg-black/20 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {coin.imageUrl && (
                    <img 
                      src={coin.imageUrl} 
                      alt={coin.name} 
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <div className="text-sm">
                    <span className="text-white">{coin.name}</span>
                    <span className="text-white/60 mx-1">•</span>
                    <span className="text-white/60">
                      {getMetricDisplay(alert.metric)} {alert.isAbove ? '>' : '<'} {alert.threshold}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="text-white/60 hover:text-white"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {alerts.length === 0 && (
          <p className="text-center text-white/60 py-2">
            No alerts set
          </p>
        )}
      </div>
    </div>
  );
}; 