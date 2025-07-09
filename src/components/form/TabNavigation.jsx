import React from 'react';
import { User, Trophy, Award, Clock } from 'lucide-react';

const TabNavigation = ({activeTab,setActiveTab}) => {
  
  const tabs = [
    { id: 'register', label: 'Register', icon: <User className="w-4 h-4" /> },
    { id: 'success', label: 'Success Stories', icon: <Trophy className="w-4 h-4" /> },
    { id: 'why-us', label: 'Why Us', icon: <Award className="w-4 h-4" /> },
    { id: 'batches', label: 'Batch Timings', icon: <Clock className="w-4 h-4" /> }
  ];

  return (
<div className="bg-black/20 border border-white/10 rounded-2xl p-2 shadow-lg mb-8 animate-fadeIn">
  <div className="flex gap-2 overflow-x-auto">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
          activeTab === tab.id
            ? 'bg-gradient-to-r from-flowform-500 to-flowform-600 text-white shadow-md'
            : 'bg-transparent text-gray-400 hover:bg-flowform-700/50 hover:text-white'
        }`}
      >
        {tab.icon}
        {tab.label}
      </button>
    ))}
  </div>
</div>

  );
};

export default TabNavigation;
