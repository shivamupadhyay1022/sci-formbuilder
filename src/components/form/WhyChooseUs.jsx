import React from 'react';
import { Trophy, Users, Target, Award } from 'lucide-react';

const WhyChooseUs = ({ whyChooseUs }) => (
  <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-lg mb-12 animate-fadeIn" style={{animationDelay: '0.4s'}}>
    <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Elite Institute?</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {whyChooseUs.map((item, index) => (
        <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
          <div className="bg-black/20 p-6 rounded-2xl mb-4 group-hover:shadow-flowform-500/50 transition-shadow">
            <div className="flex justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default WhyChooseUs;
