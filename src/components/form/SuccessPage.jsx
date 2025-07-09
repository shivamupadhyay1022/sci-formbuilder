import React from 'react';
import { CheckCircle, Clock, Mail, MessageSquare, Calendar, Download, Sparkles, Users, Trophy, Award, Target, Share2 } from 'lucide-react';

const SuccessPage = ({ formData, applicationId, achievers, setIsSubmitted }) => {
  const ads = [
    {
      title: "New Batches Starting",
      subtitle: "January 2025",
      description: "Limited Seats Available",
      color: "from-flowform-500 to-flowform-600"
    },
    {
      title: "Scholarships Open",
      subtitle: "Up to 100% OFF",
      description: "Merit-based Selection",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      title: "Top Scorers 2024",
      subtitle: "AIR 1-100: 45 Students",
      description: "Celebrating Success",
      color: "from-green-400 to-green-500"
    }
  ];

  const quickFacts = [
    { icon: <Users className="w-6 h-6 text-flowform-400" />, title: "50+ Expert Faculty", value: "50+" },
    { icon: <Trophy className="w-6 h-6 text-flowform-400" />, title: "10,000+ Students Trained", value: "10K+" },
    { icon: <Award className="w-6 h-6 text-flowform-400" />, title: "92% Success Rate", value: "92%" },
    { icon: <Target className="w-6 h-6 text-flowform-400" />, title: "15+ Years Experience", value: "15+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-flowform-900 to-flowform-950 text-white relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-flowform-700/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-flowform-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-flowform-600/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Page */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-lg text-center animate-fadeIn">
          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-flowform-500 to-flowform-600 p-6 rounded-full shadow-lg animate-bounce">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-flowform-300 to-flowform-400 bg-clip-text text-transparent">
            ✅ Thank you, {formData.name}!
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Your registration has been received successfully.
          </p>

          {/* Application ID */}
          <div className="bg-black/20 border border-white/10 rounded-xl p-4 mb-8">
            <p className="text-white font-semibold">
              Your Application ID: <span className="text-flowform-400 font-bold">#{applicationId}</span>
            </p>
          </div>

          {/* What's Next */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">What Happens Next?</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-black/20 border border-white/10 rounded-xl p-4">
                <Clock className="w-6 h-6 text-flowform-400 mb-2" />
                <p className="text-white font-semibold mb-1">Quick Response</p>
                <p className="text-gray-400 text-sm">Our admissions counselor will contact you within 24 hours.</p>
              </div>
              <div className="bg-black/20 border border-white/10 rounded-xl p-4">
                <Mail className="w-6 h-6 text-flowform-400 mb-2" />
                <p className="text-white font-semibold mb-1">Email Confirmation</p>
                <p className="text-gray-400 text-sm">You'll receive an email with batch details shortly.</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <button className="bg-gradient-to-r from-flowform-600 to-flowform-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Join WhatsApp Group
            </button>
            <button className="bg-gradient-to-r from-flowform-500 to-flowform-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Book Free Counseling
            </button>
            <button className="bg-gradient-to-r from-flowform-400 to-flowform-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Brochure
            </button>
          </div>

          {/* Social Share Buttons */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-white">Share Your Success!</h3>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 text-white p-3 rounded-full hover:scale-110 transition-transform"><Share2 className="w-5 h-5" /></button>
              <button className="bg-green-600 text-white p-3 rounded-full hover:scale-110 transition-transform"><Share2 className="w-5 h-5" /></button>
              <button className="bg-red-600 text-white p-3 rounded-full hover:scale-110 transition-transform"><Share2 className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Success Stories Preview */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-white">Join Our Success Stories</h3>
            <div className="flex justify-center gap-4">
              {achievers.slice(0, 3).map((achiever, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{achiever.photo}</div>
                  <p className="text-sm font-semibold text-white">{achiever.name}</p>
                  <p className="text-xs text-flowform-400">{achiever.score}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Facts Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-white">Quick Facts About Us</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickFacts.map((fact, index) => (
                <div key={index} className="bg-black/20 border border-white/10 rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-2">{fact.icon}</div>
                  <p className="text-sm font-semibold text-white">{fact.title}</p>
                  <p className="text-xs text-flowform-400">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-white">Special Offers</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {ads.map((ad, index) => (
                <div key={index} className="bg-black/20 border border-white/10 rounded-xl p-4 text-left">
                  <div className={`bg-gradient-to-r ${ad.color} bg-clip-text text-transparent font-bold text-lg mb-1`}>
                    {ad.title}
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{ad.subtitle}</p>
                  <p className="text-gray-400 text-xs">{ad.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <button 
            onClick={() => setIsSubmitted(false)}
            className="bg-black/20 border border-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-black/30 transition-all duration-300"
          >
            Back to Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
