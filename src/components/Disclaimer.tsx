import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Disclaimer = () => {
  return (
    <div className="mt-8 p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="flex items-center gap-2 text-gray-300">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        <p className="text-sm">
          DYOR - Numbers go up, numbers go down. Sometimes they go to zero. This is not financial advice. 🎮
        </p>
      </div>
    </div>
  );
};