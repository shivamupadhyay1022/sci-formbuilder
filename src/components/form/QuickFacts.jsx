import React from 'react';
import { Target, Users, Trophy, Award } from 'lucide-react';

const QuickFacts = ({ showQuickFacts, setShowQuickFacts, quickFacts }) => (
  <div className="hidden lg:block fixed left-4 bottom-20 z-40">
    <button 
      onClick={() => setShowQuickFacts(!showQuickFacts)}
      className="bg-black/20 backdrop-blur-sm border border-white/10 p-4 rounded-full shadow-lg hover:shadow-flowform-500/50 transition-all duration-300 mb-4"
    >
      <Target className="w-6 h-6 text-flowform-400" />
    </button>
    {showQuickFacts && (
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-lg w-64 animate-fadeIn">
        <h3 className="font-bold text-white mb-3">Quick Facts</h3>
        {quickFacts.map((fact, index) => (
          <div key={index} className="flex items-center gap-3 mb-2">
            <div className="text-flowform-400">{fact.icon}</div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">{fact.title}</p>
              <p className="font-bold text-flowform-400">{fact.value}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default QuickFacts;
