import React from 'react';
import { LeaderboardHeader } from './components/LeaderboardHeader';
import { LeaderboardTable } from './components/LeaderboardTable';
import { Disclaimer } from './components/Disclaimer';
import { useLeaderboardData } from './hooks/useLeaderboardData';

function App() {
  const { coins, loading, error } = useLeaderboardData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <LeaderboardHeader />
        <LeaderboardTable coins={coins} />
        <Disclaimer />
      </div>
    </div>
  );
}

export default App;