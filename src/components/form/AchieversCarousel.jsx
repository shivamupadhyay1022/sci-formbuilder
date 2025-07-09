import React from 'react';

const AchieversCarousel = ({ achievers, currentAchieverIndex }) => (
  <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg mb-8 animate-fadeIn">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-4xl">{achievers[currentAchieverIndex].photo}</div>
        <div>
          <h3 className="font-bold text-white">{achievers[currentAchieverIndex].name}</h3>
          <p className="text-flowform-400 font-semibold">{achievers[currentAchieverIndex].score} in {achievers[currentAchieverIndex].exam}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-400">Success Story</p>
        <div className="flex gap-1 mt-1">
          {achievers.map((_, index) => (
            <div key={index} className={`w-2 h-2 rounded-full ${index === currentAchieverIndex ? 'bg-flowform-500' : 'bg-gray-600'}`}></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AchieversCarousel;
