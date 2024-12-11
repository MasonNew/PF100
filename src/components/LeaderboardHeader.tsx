import React from 'react';
import { ShareButton } from './ShareButton';
import { Twitter, Send } from 'lucide-react';

export const LeaderboardHeader = () => {
  return (
    <div className="text-center mb-4 -mt-4 animate-fade-in relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <a
          href="https://twitter.com/PumpFunIndex"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href="https://t.me/PumpFunIndex"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-lg transition-colors"
        >
          <Send className="w-4 h-4" />
        </a>
        <ShareButton />
      </div>
      <div className="flex justify-center mb-2">
        <img 
          src="/pumpindex.PNG" 
          alt="PumpFun Index Logo" 
          className="w-48 h-48 object-contain drop-shadow-glow animate-float"
        />
      </div>
      <div className="relative z-10 -mt-12">
        <h1 className="text-6xl font-bold mb-4">
          <span className="font-extrabold text-white animate-glow">
            PumpFun Index
          </span>
        </h1>
        <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-semibold mb-2">
          The Top 100 Meme Coins Ever Created On pump.fun
        </p>
        <div className="text-sm text-white/80 animate-pulse">
          Live Updates Every 5 Minutes
        </div>
      </div>
    </div>
  );
};