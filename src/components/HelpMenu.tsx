import React from 'react';
import { Command, X } from 'lucide-react';

interface HelpMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpMenu = ({ isOpen, onClose }: HelpMenuProps) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '/', description: 'Focus search' },
    { key: 'Esc', description: 'Return to top' },
    { key: '↑/↓', description: 'Navigate tokens' },
    { key: 'Enter', description: 'View token details' },
    { key: 'F', description: 'Toggle filters' },
    { key: 'S', description: 'Sort by score' },
    { key: 'M', description: 'Sort by market cap' },
    { key: 'R', description: 'Sort by replies' },
    { key: 'A', description: 'Toggle advanced view' },
  ];

  const features = [
    'Real-time token data and analytics',
    'Advanced filtering and sorting options',
    'Detailed token metrics and scoring',
    'Community engagement tracking',
    'Market trend analysis',
    'Token comparison tools',
    'Customizable watchlists',
    'Export and sharing capabilities',
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/60 rounded-2xl border border-emerald-500/20 w-full max-w-2xl">
        <div className="p-6 border-b border-emerald-500/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Keyboard Shortcuts & Help</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Keyboard Shortcuts */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Keyboard Shortcuts</h3>
            <div className="space-y-3">
              {shortcuts.map(({ key, description }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-400">{description}</span>
                  <kbd className="px-2 py-1 bg-black/40 rounded-lg border border-emerald-500/20 text-emerald-400 font-mono text-sm">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Features</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="p-6 border-t border-emerald-500/20 bg-emerald-500/5">
          <h3 className="text-lg font-bold text-white mb-3">Quick Tips</h3>
          <ul className="space-y-2 text-gray-400">
            <li>• Use filters to narrow down tokens based on specific criteria</li>
            <li>• Click on any token card to view detailed analytics</li>
            <li>• Enable advanced view for more detailed market analysis</li>
            <li>• Hover over metrics for additional information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 