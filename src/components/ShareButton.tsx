import React from 'react';
import { Share2 } from 'lucide-react';

export const ShareButton = () => {
  const shareOnTwitter = () => {
    const text = "📊 Tracking the hottest meme coins on PumpFun Market $PFI 🚀";
    const url = "https://pumpfunindex.xyz/";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <button
      onClick={shareOnTwitter}
      className="p-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors"
    >
      <Share2 className="w-4 h-4" />
    </button>
  );
}; 