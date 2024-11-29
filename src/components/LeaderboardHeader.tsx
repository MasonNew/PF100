import React from 'react';
import { Rocket, Telescope } from 'lucide-react';

export const LeaderboardHeader = () => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3 animate-glow">
        <Rocket className="w-10 h-10 text-pink-500" />
        PF100
        <Telescope className="w-10 h-10 text-pink-500" />
      </h1>
      <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-semibold mb-2">
        The Ultimate Meme Coin Observatory
      </p>
      <div className="text-sm text-gray-300 animate-pulse">
        Live Updates Every 5 Minutes
      </div>
    </div>
  );
};