import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase";
import { toast } from "sonner";
import {
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Clock, 
  MessageCircle,
  Star,
  Trophy,
  Users,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Award,
  Target,
  Zap,
  Download,
  Calendar,
  Timer,
  Gift,
  Share2,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  MessageSquare,
  Check
} from "lucide-react";
import SuccessPage from "../components/form/SuccessPage";
import AdBar from "../components/form/AdBar";
import QuickFacts from "../components/form/QuickFacts";
import CountdownTimer from "../components/form/CountdownTimer";
import DesktopAds from "../components/form/DesktopAds";
import MobileAds from "../components/form/MobileAds";
import AchieversCarousel from "../components/form/AchieversCarousel";
import TabNavigation from "../components/form/TabNavigation";
import Testimonials from "../components/form/Testimonials";
import WhyChooseUs from "../components/form/WhyChooseUs";

const Form = () => {
  const { id } = useParams();

  // UI states
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [showMobileAds, setShowMobileAds] = useState(false);
  const [showMobileAdBar, setShowMobileAdBar] = useState(true);
  const [showQuickFacts, setShowQuickFacts] = useState(false);
  const [showBatchSchedule, setShowBatchSchedule] = useState(false);
  const [activeTab, setActiveTab] = useState("register");
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 12,
    minutes: 30,
    seconds: 45,
  });

  // Backend-powered form states
  const [formTitle, setFormTitle] = useState("Loading...");
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applicationId, setApplicationId] = useState("");
  const [discount, setDiscount] = useState(0);

  // Carousel/news ticker
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentAchieverIndex, setCurrentAchieverIndex] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      course: "JEE Main",
      score: "98.2%",
      text: "The personalized coaching and expert guidance helped me achieve my dream score. The faculty is exceptional!",
      image: "👨‍🎓"
    },
    {
      name: "Priya Sharma",
      course: "NEET",
      score: "654/720",
      text: "Amazing study materials and test series. The doubt-clearing sessions were incredibly helpful.",
      image: "👩‍🎓"
    },
    {
      name: "Arjun Singh",
      course: "JEE Advanced",
      score: "AIR 156",
      text: "The competitive environment and regular assessments pushed me to excel. Highly recommended!",
      image: "🏆"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Trophy className="w-8 h-8 text-flowform-400" />,
      title: "99.2% Success Rate",
      description: "Proven track record of success"
    },
    {
      icon: <Users className="w-8 h-8 text-flowform-400" />,
      title: "Expert Faculty",
      description: "IIT/IIM graduates with 15+ years experience"
    },
    {
      icon: <Target className="w-8 h-8 text-flowform-400" />,
      title: "Personalized Approach",
      description: "Tailored study plans for each student"
    },
    {
      icon: <Award className="w-8 h-8 text-flowform-400" />,
      title: "Scholarship Programs",
      description: "Merit-based scholarships up to 100%"
    }
  ];

  const courses = [
    "JEE Main & Advanced",
    "NEET",
    "CBSE/State Board",
    "Foundation (9th-10th)",
    "Dropper Batch",
    "Crash Course"
  ];

  const timings = [
    "Morning (6:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 6:00 PM)",
    "Evening (6:00 PM - 9:00 PM)",
    "Weekend Only",
    "Flexible Timing"
  ];

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

  const newsItems = [
    "🚀 New Batch for NEET 2025 starting July 15",
    "🏆 Ananya Sharma scored 720/720 in NEET 2024",
    "🎁 Early Bird Discount: 15% off until July 10",
    "📚 Free Mock Test Series Available Now",
    "🎯 100% Scholarship for Rank 1 Holders"
  ];

  const achievers = [
    { name: "Rahul Kumar", score: "AIR 1", exam: "JEE", photo: "👨‍🎓" },
    { name: "Priya Singh", score: "720/720", exam: "NEET", photo: "👩‍🎓" },
    { name: "Ankit Sharma", score: "AIR 15", exam: "JEE", photo: "🏆" },
    { name: "Sneha Patel", score: "680/720", exam: "NEET", photo: "⭐" }
  ];

  const quickFacts = [
    { icon: <Users className="w-6 h-6 text-flowform-400" />, title: "50+ Expert Faculty", value: "50+" },
    { icon: <Trophy className="w-6 h-6 text-flowform-400" />, title: "10,000+ Students Trained", value: "10K+" },
    { icon: <Award className="w-6 h-6 text-flowform-400" />, title: "92% Success Rate", value: "92%" },
    { icon: <Target className="w-6 h-6 text-flowform-400" />, title: "15+ Years Experience", value: "15+" }
  ];

  const batchSchedules = [
    { name: "NEET Weekend Batch", timing: "Sat-Sun 9AM-5PM", seats: "15 Left", startDate: "July 15" },
    { name: "JEE Morning Batch", timing: "Mon-Fri 6AM-12PM", seats: "8 Left", startDate: "July 20" },
    { name: "Foundation Evening", timing: "Mon-Fri 4PM-7PM", seats: "25 Left", startDate: "July 25" }
  ];

  // Fetch form from Supabase
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: form, error } = await supabase
          .from("tables")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setFormTitle(form.name);

        const { data: cols, error: ce } = await supabase
          .from("table_columns")
          .select("*")
          .eq("table_id", id)
          .order("position", { ascending: true });
        if (ce) throw ce;
        setFields(cols);
      } catch (e) {
        toast.error(`Failed to load form: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetch();
  }, [id]);

  // Progress calculation
  useEffect(() => {
    const filled = Object.values(formData).filter((v) =>
      typeof v === "string" ? v.trim() !== "" : Boolean(v)
    ).length;
    setProgress((filled / (fields.length || 1)) * 100);
  }, [formData, fields]);

  // Carousels/job tickers
  useEffect(() => {
    const i1 = setInterval(
      () => setCurrentTestimonial((v) => (v + 1) % testimonials.length),
      5000
    );
    const i2 = setInterval(
      () => setCurrentNewsIndex((v) => (v + 1) % newsItems.length),
      4000
    );
    const i3 = setInterval(
      () => setCurrentAchieverIndex((v) => (v + 1) % achievers.length),
      3000
    );
    return () => {
      clearInterval(i1);
      clearInterval(i2);
      clearInterval(i3);
    };
  }, [testimonials.length, newsItems.length, achievers.length]);

  // Countdown
  useEffect(() => {
    const cid = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(cid);
  }, []);

  const handleChange = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handlePromo = (code) => {
    const map = { EARLY15: 15, STUDENT10: 10, MERIT20: 20 };
    setDiscount(map[code.toUpperCase()] || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePromo(formData.promoCode || "");
    try {
      const { error } = await supabase
        .from("responses")
        .insert([{ table_id: id, data: formData }]);
      if (error) throw error;
      const appId = `ELITE-${Date.now().toString().slice(-6)}`;
      setApplicationId(appId);
      setSubmitted(true);
    } catch (e) {
      toast.error(`Submission failed: ${e.message}`);
    }
  };

  if (loading) return <div className="p-8 text-center bg-flowform-950 text-white">Loading form...</div>;
  if (submitted)
    return (
      <SuccessPage
        formData={formData}
        applicationId={applicationId}
        achievers={achievers}
        setIsSubmitted={setSubmitted}
      />
    );

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-flowform-900 to-flowform-950 text-white relative overflow-hidden ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Background, progress, news ticker, theme toggle */}
       {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-flowform-700/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-flowform-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-flowform-600/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20">
        <div 
          className="h-full bg-gradient-to-r from-flowform-500 to-flowform-400 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Auto-Rotating News Ticker */}
      <div className="fixed top-1 left-0 right-0 z-40 bg-gradient-to-r from-flowform-800 to-flowform-900 text-white py-2 overflow-hidden group hover:pause">
        <div className="flex animate-marquee group-hover:animate-none">
          <div className="whitespace-nowrap px-4 text-sm font-medium">
            {newsItems[currentNewsIndex]}
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-16 right-4 z-50">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-black/20 backdrop-blur-sm border border-white/10 p-3 rounded-full shadow-lg hover:shadow-flowform-500/50 transition-all duration-300"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-flowform-300" />}
        </button>
      </div>

      {/* Mobile Ad Bar */}
      {showMobileAdBar && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-flowform-700 to-flowform-800 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold">🎁 3 New Batches Open - Apply Now for ₹500 Off!</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-white/20 px-3 py-1 rounded text-xs font-semibold">
                Apply Now
              </button>
              <button onClick={() => setShowMobileAdBar(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Quick Facts */}
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

      {/* Countdown Timer */}
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

      {/* Desktop Ads - Left & Right Sidebars */}
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

      {/* Mobile Ads Toggle */}
      <div className="xl:hidden fixed top-4 right-4 z-50">
        <button 
          onClick={() => setShowMobileAds(!showMobileAds)}
          className="bg-gradient-to-r from-flowform-400 to-flowform-600 text-white p-3 rounded-full shadow-lg animate-glow"
        >
          <Sparkles className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Ads Dropdown */}
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
      <AdBar {...{ showMobileAdBar, setShowMobileAdBar }} />
      <QuickFacts {...{ quickFacts, showQuickFacts, setShowQuickFacts }} />
      <CountdownTimer countdown={countdown} />
      <DesktopAds ads={ads} />
      <MobileAds {...{ ads, showMobileAds, setShowMobileAds }} />

      <div className="relative z-10 container mx-auto px-4 py-8 xl:px-80 mt-16">
        <AchieversCarousel {...{ achievers, currentAchieverIndex }} />
        <TabNavigation {...{ activeTab, setActiveTab }} />

        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-flowform-600 to-flowform-700 p-4 rounded-full shadow-lg">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-flowform-300 to-flowform-400 bg-clip-text text-transparent">
            Elite Coaching Institute
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Transform your potential into success with India's most trusted
            coaching institute
          </p>
        </div>

        {/* Register Tab */}
        {activeTab === "register" && (
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-lg mb-12 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 text-white">
                {formTitle}
              </h2>
              <p className="text-gray-400">
                Join thousands of successful students
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map((f) => (
                <div key={f.id}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {f.name}
                    {f.required && <span className="text-red-500"> *</span>}
                  </label>
                  {["text", "email", "phone", "url", "number"].includes(
                    f.type
                  ) && (
                    <input
                      type={f.type === "phone" ? "tel" : f.type}
                      placeholder={f.placeholder || ""}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-flowform-500 focus:ring-2 focus:ring-flowform-500/50"
                      required={f.required}
                      onChange={(e) => handleChange(f.name, e.target.value)}
                    />
                  )}
                  {f.type === "textarea" && (
                    <textarea
                      rows={4}
                      placeholder={f.placeholder || ""}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-flowform-500 focus:ring-2 focus:ring-flowform-500/50"
                      onChange={(e) => handleChange(f.name, e.target.value)}
                    />
                  )}
                  {f.type === "dropdown" && (
                    <select
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-flowform-500 focus:ring-2 focus:ring-flowform-500/50"
                      required={f.required}
                      onChange={(e) => handleChange(f.name, e.target.value)}
                    >
                      <option value="">Select an option</option>
                      {f.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {f.type === "radio" &&
                    f.options.map((o) => (
                      <label key={o.value} className="flex items-center gap-2 text-gray-300">
                        <input
                          type="radio"
                          name={f.name}
                          value={o.value}
                          required={f.required}
                          className="form-radio bg-black/20 border-white/10 text-flowform-500 focus:ring-flowform-500/50"
                          onChange={(e) => handleChange(f.name, e.target.value)}
                        />
                        {o.label}
                      </label>
                    ))}
                  {f.type === "checkbox" && (
                    <label className="flex items-center gap-2 text-gray-300">
                      <input
                        type="checkbox"
                        className="form-checkbox bg-black/20 border-white/10 rounded text-flowform-500 focus:ring-flowform-500/50"
                        onChange={(e) => handleChange(f.name, e.target.checked)}
                      />
                      {f.name}
                    </label>
                  )}
                  {f.type === "checkbox-group" &&
                    f.options.map((o) => (
                      <label key={o.value} className="flex items-center gap-2 text-gray-300">
                        <input
                          type="checkbox"
                          className="form-checkbox bg-black/20 border-white/10 rounded text-flowform-500 focus:ring-flowform-500/50"
                          onChange={(e) =>
                            handleChange(f.name, {
                              ...(formData[f.name] || {}),
                              [o.value]: e.target.checked,
                            })
                          }
                        />
                        {o.label}
                      </label>
                    ))}
                  {f.type === "rating" && (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleChange(f.name, s)}
                          className={`w-6 h-6 text-2xl transition-colors ${
                            formData[f.name] >= s
                              ? "text-yellow-400"
                              : "text-gray-600 hover:text-yellow-400"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-flowform-600 to-flowform-700 hover:from-flowform-700 hover:to-flowform-800 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-flowform-500/50 transition-all duration-300"
              >
                Submit {discount > 0 && `– Save ${discount}%`}
              </button>
            </form>

            {showBatchSchedule && (
              <div className="mt-8 space-y-4">
                {batchSchedules.map((b, i) => (
                  <div
                    key={i}
                    className="bg-black/20 border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-semibold text-white">
                          {b.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {b.timing}
                        </p>
                        <p className="text-flowform-400 text-sm font-semibold">
                          Starts: {b.startDate}
                        </p>
                      </div>
                      <span className="bg-flowform-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        {b.seats}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "success" && (
          <Testimonials
            {...{ testimonials, currentTestimonial, setCurrentTestimonial }}
          />
        )}
        {activeTab === "why-us" && <WhyChooseUs whyChooseUs={whyChooseUs} />}
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gradient-to-r from-flowform-500 to-flowform-700 text-white p-4 rounded-full shadow-lg animate-glow hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Form;