import React from 'react';

const DesktopAds = ({ ads }) => (
  <>
    <div className="hidden xl:block fixed left-4 top-1/2 transform -translate-y-1/2 z-40 space-y-4 w-64">
      {ads.map((ad, index) => (
        <div key={index} className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg animate-fadeIn" style={{animationDelay: `${index * 0.2}s`}}>
          <div className={`bg-gradient-to-r ${ad.color} bg-clip-text text-transparent font-bold text-lg mb-2`}>
            {ad.title}
          </div>
          <div className="text-white font-semibold mb-1">{ad.subtitle}</div>
          <div className="text-gray-400 text-sm">{ad.description}</div>
        </div>
      ))}
    </div>

    <div className="hidden xl:block fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-4 w-64">
      {ads.map((ad, index) => (
        <div key={index} className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg animate-fadeIn" style={{animationDelay: `${index * 0.2 + 0.6}s`}}>
          <div className={`bg-gradient-to-r ${ad.color} bg-clip-text text-transparent font-bold text-lg mb-2`}>
            {ad.title}
          </div>
          <div className="text-white font-semibold mb-1">{ad.subtitle}</div>
          <div className="text-gray-400 text-sm">{ad.description}</div>
        </div>
      ))}
    </div>
  </>
);

export default DesktopAds;
