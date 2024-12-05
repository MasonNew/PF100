import { Share2 } from 'lucide-react';

export const ShareButton = () => {
  const shareOnTwitter = () => {
    const text = "📊 Tracking the hottest meme coins on PumpFun Market $PF100 🚀";
    const url = "https://pumpfun100market.com/";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <button
      onClick={shareOnTwitter}
      className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors"
    >
      <Share2 className="w-4 h-4" />
      Share
    </button>
  );
}; 