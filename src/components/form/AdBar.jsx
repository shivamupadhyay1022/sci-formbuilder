import React from 'react';
import { X } from 'lucide-react';

const AdBar = ({ showMobileAdBar, setShowMobileAdBar }) => {
  if (!showMobileAdBar) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-flowform-700 to-flowform-800 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold">🎁 3 New Batches Open - Apply Now for ₹500 Off!</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/20 px-3 py-1 rounded text-xs font-semibold">
            Apply Now
          </button>
          <button onClick={() => setShowMobileAdBar(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdBar;
