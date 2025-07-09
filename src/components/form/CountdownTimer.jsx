import React from 'react';

const CountdownTimer = ({ countdown }) => (
  <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-lg animate-pulse">
    <p className="text-center text-sm font-semibold text-white mb-2">
      ⏳ Scholarship Registration Ends In:
    </p>
    <div className="flex justify-center gap-2 text-xs">
      <div className="bg-flowform-500 text-white px-2 py-1 rounded">
        {countdown.days}d
      </div>
      <div className="bg-flowform-500 text-white px-2 py-1 rounded">
        {countdown.hours}h
      </div>
      <div className="bg-flowform-500 text-white px-2 py-1 rounded">
        {countdown.minutes}m
      </div>
      <div className="bg-flowform-500 text-white px-2 py-1 rounded">
        {countdown.seconds}s
      </div>
    </div>
  </div>
);

export default CountdownTimer;
