import React from 'react';
import { Sparkles } from 'lucide-react';

const MobileAds = ({ ads, showMobileAds, setShowMobileAds }) => (
  <>
    <div className="xl:hidden fixed top-4 right-4 z-50">
      <button 
        onClick={() => setShowMobileAds(!showMobileAds)}
        className="bg-gradient-to-r from-flowform-400 to-flowform-600 text-white p-3 rounded-full shadow-lg animate-glow"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    </div>

    {showMobileAds && (
      <div className="xl:hidden fixed top-16 right-4 z-40 space-y-3 w-80 max-w-[calc(100vw-2rem)] animate-slideDown">
        {ads.map((ad, index) => (
          <div key={index} className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-lg">
            <div className={`bg-gradient-to-r ${ad.color} bg-clip-text text-transparent font-bold text-sm mb-1`}>
              {ad.title}
            </div>
            <div className="text-white font-semibold text-sm mb-1">{ad.subtitle}</div>
            <div className="text-gray-400 text-xs">{ad.description}</div>
          </div>
        ))}
      </div>
    )}
  </>
);

export default MobileAds;
