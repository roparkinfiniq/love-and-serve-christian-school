import React, { useState, useEffect } from 'react';

interface LatestNewsProps {
  onNavigate?: (page: any) => void;
}

const LatestNews: React.FC<LatestNewsProps> = ({ onNavigate }) => {
  const [showScrollBadge, setShowScrollBadge] = useState(true);

  // Auto-hide scroll badge after 6 seconds if user hasn't interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollBadge(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleFeedInteraction = () => {
    if (showScrollBadge) {
      setShowScrollBadge(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-rose-50/20 to-white px-4 sm:px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12">
          <div>
            <span className="text-[#E11D48] font-bold tracking-widest uppercase text-xs sm:text-sm bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 shadow-xs inline-block mb-3">
              Social & Campus Updates
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-2 sm:mb-3 tracking-tight">
              LSCSI News & Stories
            </h2>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl">
              Stay connected with our school community, official announcements, and daily campus activities.
            </p>
          </div>
          
          <a 
            href="https://www.facebook.com/loveandserveinc/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-4 md:mt-0 w-full md:w-auto inline-flex items-center justify-center font-bold text-white bg-[#1877F2] hover:bg-blue-600 transition-all duration-300 text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg active:scale-95 shrink-0"
          >
            <i className="fa-brands fa-facebook-f mr-2.5 text-lg"></i>
            Visit Official Facebook Page
            <i className="fa-solid fa-arrow-up-right-from-square ml-2.5 text-xs"></i>
          </a>
        </div>

        {/* 2-Column Balanced Showcase: Left News Cards + Right Live Facebook Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Campus Highlights & Quick Announcement Cards (col-span-7) */}
          <div className="lg:col-span-7 space-y-4 text-left order-2 lg:order-1">
            
            {/* Card 1: SY 2026-2027 Admissions */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="px-3 py-1 bg-rose-100 text-[#E11D48] font-black text-xs uppercase tracking-wider rounded-xl">
                  Enrollment Open
                </span>
                <span className="text-xs font-bold text-gray-400">SY 2026 - 2027</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#E11D48] transition-colors mb-2">
                Admissions Now Open for Preschool to Junior High
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                Join our Christ-centered learning community! We offer quality holistic education, character formation, and dedicated faculty for your child's growth.
              </p>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('Admissions')}
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-[#E11D48] hover:text-rose-700 transition"
                >
                  <span>Learn Admissions Process</span>
                  <i className="fa-solid fa-arrow-right ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                </button>
              )}
            </div>

            {/* Card 2: Character & Academic Excellence */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 font-black text-xs uppercase tracking-wider rounded-xl border border-blue-100">
                  Campus Life
                </span>
                <span className="text-xs font-bold text-gray-400">Character Education</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#E11D48] transition-colors mb-2">
                Nurturing God-Fearing & Well-Rounded Leaders
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                Discover how our biblical worldview and active campus activities equip students spiritually, academically, and socially for a purposeful life.
              </p>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('About')}
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-[#E11D48] hover:text-rose-700 transition"
                >
                  <span>Explore Our Philosophy</span>
                  <i className="fa-solid fa-arrow-right ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                </button>
              )}
            </div>

            {/* Card 3: School Calendar */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="px-3 py-1 bg-purple-50 text-purple-600 font-black text-xs uppercase tracking-wider rounded-xl border border-purple-100">
                  School Calendar
                </span>
                <span className="text-xs font-bold text-gray-400">Events & Holidays</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#E11D48] transition-colors mb-2">
                Stay Updated with Upcoming Academic Activities
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                Check our official S.Y. 2026-2027 calendar for examination dates, holidays, chapel services, and special school events.
              </p>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('Calendar')}
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-[#E11D48] hover:text-rose-700 transition"
                >
                  <span>View Full Calendar</span>
                  <i className="fa-solid fa-arrow-right ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Completely Borderless & Soft Live Facebook Feed Container (col-span-5) */}
          <div className="lg:col-span-5 w-full flex flex-col items-center order-1 lg:order-2">
            <div 
              onMouseEnter={handleFeedInteraction}
              onTouchStart={handleFeedInteraction}
              className="bg-white rounded-[2rem] p-2 sm:p-3 shadow-xl hover:shadow-2xl w-full max-w-[500px] flex flex-col overflow-hidden border border-slate-100 transition-all duration-300 relative"
            >
              {/* Soft Rose Header Bar (Blends naturally with no harsh black boxes) */}
              <div className="px-4 py-2.5 bg-rose-50/60 rounded-2xl flex items-center justify-between mb-2 border border-rose-100/50">
                <div className="flex items-center space-x-2">
                  <i className="fa-brands fa-facebook text-[#1877F2] text-base"></i>
                  <span className="text-xs font-extrabold text-slate-800 tracking-tight">Official Facebook Feed</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#E11D48] bg-white px-2.5 py-0.5 rounded-full border border-rose-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse"></span> Live
                </span>
              </div>

              {/* Seamless Facebook iFrame Feed */}
              <div className="w-full overflow-hidden rounded-2xl flex justify-center bg-white relative">
                <iframe 
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Floveandserveinc%2F&tabs=timeline&width=500&height=620&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId" 
                  width="500" 
                  height="620" 
                  style={{ border: 'none', outline: 'none', overflow: 'hidden', maxWidth: '100%', width: '100%', minHeight: '520px', height: '580px' }} 
                  scrolling="yes" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Love and Serve Christian School Official Facebook Feed"
                  className="rounded-xl w-full border-0 outline-none"
                ></iframe>
              </div>

              {/* Dynamic Auto-Hiding Scroll Indicator Badge */}
              <div 
                className={`py-2 px-3.5 bg-slate-900/90 text-white rounded-xl flex items-center justify-between text-xs font-bold shadow-xs transition-all duration-500 ease-in-out ${
                  showScrollBadge 
                    ? 'opacity-100 max-h-10 mt-2.5 pointer-events-auto' 
                    : 'opacity-0 max-h-0 mt-0 py-0 overflow-hidden pointer-events-none'
                }`}
              >
                <span className="flex items-center gap-1.5 text-[11px] text-gray-200">
                  <i className="fa-solid fa-arrows-up-down text-[#E11D48]"></i> 
                  <span>Scroll inside box for more posts</span>
                </span>
                <i className="fa-solid fa-chevron-down text-rose-400 text-xs animate-bounce"></i>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LatestNews;