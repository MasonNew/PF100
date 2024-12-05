import { useState } from 'react';
import '../styles/InvestabilityScore.css';

interface ScoreBreakdown {
  marketCap: number;
  communityEngagement: number;
  holders: number;
}

interface Props {
  score: number;
  breakdown: ScoreBreakdown;
}

export const InvestabilityScore = ({ score, breakdown }: Props) => {
  return (
    <div className="relative flex items-center gap-2">
      <div className="flex-grow flex items-center gap-2">
        <div className="w-24 bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-sm text-white/90">{score}</span>
      </div>
      
      <div className="tooltip-container">
        <div className="score-info-icon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </div>
        
        <div className="score-tooltip">
          <div className="score-tooltip-header">Score Components</div>
          <div className="score-tooltip-item">
            <span className="score-tooltip-label">Market Cap</span>
            <span className="score-tooltip-value">30%</span>
          </div>
          <div className="score-tooltip-item">
            <span className="score-tooltip-label">Community</span>
            <span className="score-tooltip-value">35%</span>
          </div>
          <div className="score-tooltip-item">
            <span className="score-tooltip-label">Holders</span>
            <span className="score-tooltip-value">35%</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 