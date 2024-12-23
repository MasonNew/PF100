import React from 'react';
import { TrendingUp, MessageCircle, BarChart3, Users } from 'lucide-react';

interface HeaderStats {
  totalReplies: number;
  averageScore: number;
  totalTokens: number;
  activeUsers: number;
}

export const LeaderboardHeader = ({ coins }: { coins: any[] }) => {
  // Calculate stats from coins
  const stats: HeaderStats = {
    totalReplies: coins.reduce((sum, coin) => sum + coin.replies, 0),
    averageScore: coins.reduce((sum, coin) => sum + coin.investabilityScore, 0) / coins.length,
    totalTokens: coins.length,
    activeUsers: Math.floor(coins.reduce((sum, coin) => sum + coin.replies, 0) / 3)
  };

  return (
    <div className="relative z-10 -mt-4">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent blur-3xl -z-10"></div>
      <div className="text-center">
        {/* Logo */}
        <img 
          src="/hub.png" 
          alt="The Pump Hub Logo" 
          className="w-64 h-64 object-contain animate-float mx-auto -mb-16"
          style={{
            animation: 'float 3s ease-in-out infinite'
          }}
        />

        <div className="relative">
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-500 animate-gradient font-orbitron">
            The Pump Hub
          </h1>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl -z-10"></div>
        </div>
        <p className="text-gray-300 text-xl max-w-2xl mx-auto font-light tracking-wide font-poppins mt-1">
          Your Premier Destination for Token Discovery and Analysis
        </p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 mt-3">
          <div className="stat-card">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <div className="stat-value">{stats.totalReplies.toLocaleString()}</div>
            <div className="stat-label">Total Replies</div>
          </div>
          <div className="stat-card">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <div className="stat-value">{stats.averageScore.toFixed(2)}</div>
            <div className="stat-label">Average Score</div>
          </div>
          <div className="stat-card">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <div className="stat-value">{stats.totalTokens}</div>
            <div className="stat-label">Total Tokens</div>
          </div>
          <div className="stat-card">
            <Users className="w-5 h-5 text-cyan-400" />
            <div className="stat-value">{stats.activeUsers.toLocaleString()}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>
      </div>
    </div>
  );
};