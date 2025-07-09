import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = ({ testimonials, currentTestimonial, setCurrentTestimonial }) => (
  <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-lg mb-12 animate-fadeIn" style={{animationDelay: '0.6s'}}>
    <h2 className="text-3xl font-bold text-center mb-12 text-white">Success Stories</h2>
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-black/20 p-8 rounded-2xl text-center">
                <div className="text-6xl mb-4">{testimonial.image}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{testimonial.name}</h3>
                <div className="text-flowform-400 font-semibold mb-2">{testimonial.course} - {testimonial.score}</div>
                <p className="text-gray-400 italic">"{testimonial.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Testimonial Navigation */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentTestimonial(currentTestimonial > 0 ? currentTestimonial - 1 : testimonials.length - 1)}
          className="p-2 bg-flowform-700/50 rounded-full hover:bg-flowform-600 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => setCurrentTestimonial((currentTestimonial + 1) % testimonials.length)}
          className="p-2 bg-flowform-700/50 rounded-full hover:bg-flowform-600 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
      
      {/* Testimonial Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentTestimonial ? 'bg-flowform-500' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Testimonials;
