import React from 'react';
import { User, Mail, Phone, BookOpen, Clock, MessageCircle, Gift, Bell, ArrowRight, Calendar, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';

const RegistrationForm = ({ 
  formData, 
  handleInputChange, 
  handleSubmit, 
  courses, 
  timings, 
  discount, 
  setFormData, 
  showBatchSchedule, 
  setShowBatchSchedule, 
  batchSchedules 
}) => (
  <div className="bg-gradient-glass backdrop-blur-glass border border-white/10 rounded-3xl p-8 shadow-card mb-12 animate-fadeIn" style={{animationDelay: '0.2s'}}>
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold mb-2 text-foreground">Start Your Journey</h2>
      <p className="text-muted-foreground">Join thousands of successful students</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Fields Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="relative group">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-4 bg-secondary/20 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 peer"
            placeholder="Full Name"
            required
          />
          <label className="absolute left-12 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all duration-300 peer-focus:text-primary peer-focus:-translate-y-8 peer-focus:scale-75 peer-valid:-translate-y-8 peer-valid:scale-75">
            Full Name
          </label>
        </div>

        {/* Email Field */}
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-4 bg-secondary/20 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 peer"
            placeholder="Email Address"
            required
          />
          <label className="absolute left-12 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all duration-300 peer-focus:text-primary peer-focus:-translate-y-8 peer-focus:scale-75 peer-valid:-translate-y-8 peer-valid:scale-75">
            Email Address
          </label>
        </div>

        {/* Phone Field */}
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-4 bg-secondary/20 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 peer"
            placeholder="Phone Number"
            required
          />
          <label className="absolute left-12 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all duration-300 peer-focus:text-primary peer-focus:-translate-y-8 peer-focus:scale-75 peer-valid:-translate-y-8 peer-valid:scale-75">
            Phone Number
          </label>
        </div>

        {/* Course Selection */}
        <div className="relative group">
          <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-4 bg-secondary/20 border border-white/10 rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none"
            required
          >
            <option value="">Select Course</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
          <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground rotate-90 pointer-events-none" />
        </div>

        {/* Timing Selection */}
        <div className="relative group md:col-span-2">
          <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <select
            name="timing"
            value={formData.timing}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-4 bg-secondary/20 border border-white/10 rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none"
            required
          >
            <option value="">Preferred Batch Timing</option>
            {timings.map((timing, index) => (
              <option key={index} value={timing}>{timing}</option>
            ))}
          </select>
          <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground rotate-90 pointer-events-none" />
        </div>

        {/* Message Field */}
        <div className="relative group md:col-span-2">
          <MessageCircle className="absolute left-4 top-6 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full pl-12 pr-4 py-4 bg-secondary/20 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
            placeholder="Any specific requirements or questions?"
          />
        </div>

        {/* Promo Code and Email Alerts Row */}
        <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
          {/* Promo Code */}
          <div className="relative group">
            <Gift className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 bg-secondary/20 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              placeholder="Promo Code (Optional)"
            />
            {discount > 0 && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                {discount}% OFF
              </div>
            )}
          </div>

          {/* Email Alerts Checkbox */}
          <div className="flex items-center space-x-3 p-4 bg-secondary/20 border border-white/10 rounded-xl">
            <input
              type="checkbox"
              id="emailAlerts"
              name="emailAlerts"
              checked={formData.emailAlerts}
              onChange={(e) => setFormData({...formData, emailAlerts: e.target.checked})}
              className="w-5 h-5 text-primary bg-transparent border-2 border-white/20 rounded focus:ring-primary focus:ring-2"
            />
            <label htmlFor="emailAlerts" className="text-foreground text-sm cursor-pointer">
              <Bell className="w-4 h-4 inline mr-2 text-primary" />
              Notify me of new batches & discounts
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="group relative px-12 py-4 bg-gradient-primary text-primary-foreground rounded-xl font-semibold text-lg shadow-glow hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-glow"
        >
          <span className="flex items-center justify-center gap-2">
            Join Elite Institute
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
        {discount > 0 && (
          <p className="text-green-500 font-semibold mt-2 animate-pulse">
            ✅ Promo Code Applied - {discount}% Discount!
          </p>
        )}
      </div>
    </form>

    {/* Batch Schedule Toggle */}
    <div className="mt-8">
      <button
        onClick={() => setShowBatchSchedule(!showBatchSchedule)}
        className="w-full bg-secondary/20 border border-white/10 rounded-xl p-4 text-foreground hover:bg-secondary/30 transition-all duration-300 flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="font-semibold">View Batch Schedules & Availability</span>
        </span>
        {showBatchSchedule ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {showBatchSchedule && (
        <div className="mt-4 space-y-4 animate-fadeIn">
          {batchSchedules.map((batch, index) => (
            <div key={index} className="bg-secondary/20 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-foreground">{batch.name}</h4>
                  <p className="text-muted-foreground text-sm">{batch.timing}</p>
                  <p className="text-primary text-sm font-semibold">Starts: {batch.startDate}</p>
                </div>
                <div className="text-right">
                  <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
                    {batch.seats}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default RegistrationForm;
