import React from 'react';

interface LatestNewsProps {
  onNavigate?: (page: any) => void;
}

const LatestNews: React.FC<LatestNewsProps> = ({ onNavigate }) => {
  return (
    <section className="py-12 sm:py-20 md:py-24 bg-gradient-to-b from-white via-rose-50/20 to-white px-3.5 sm:px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-6 sm:mb-12">
          <div>
            <span className="text-[#E11D48] font-bold tracking-widest uppercase text-xs sm:text-sm bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 shadow-xs inline-block mb-2.5">
              Social & Campus Updates
            </span>
            <h2 className="text-2.5xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-2 sm:mb-3 tracking-tight">
              LSCSI News & Stories
            </h2>
            <p className="text-gray-500 text-xs sm:text-base md:text-lg max-w-2xl">
              Stay connected with our school community, official announcements, and daily campus activities.
            </p>
          </div>
          
          <a 
            href="https://www.facebook.com/loveandserveinc/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-3.5 md:mt-0 w-full md:w-auto inline-flex items-center justify-center font-bold text-white bg-[#1877F2] hover:bg-blue-600 transition-all duration-300 text-xs sm:text-base px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg active:scale-95 shrink-0"
          >
            <i className="fa-brands fa-facebook-f mr-2 text-base sm:text-lg"></i>
            Visit Official Facebook Page
            <i className="fa-solid fa-arrow-up-right-from-square ml-2 text-[10px] sm:text-xs"></i>
          </a>
        </div>

        {/* 2-Column Balanced Showcase: Left News Cards + Right Live Facebook Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Campus Highlights & Quick Announcement Cards (col-span-7) */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 text-left order-2 lg:order-1">
            
            {/* Card 1: SY 2026-2027 Admissions */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-2.5">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-rose-100 text-[#E11D48] font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-lg sm:rounded-xl">
                  Enrollment Open
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-gray-400">SY 2026 - 2027</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 group-hover:text-[#E11D48] transition-colors mb-1.5 sm:mb-2">
                Admissions Now Open for Preschool to Junior High
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Join our Christ-centered learning community! We offer quality holistic education, character formation, and dedicated faculty for your child's growth.
              </p>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('Admissions')}
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-[#E11D48] hover:text-rose-700 transition"
                >
                  <span>Learn Admissions Process</span>
                  <i className="fa-solid fa-arrow-right ml-1.5 sm:ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                </button>
              )}
            </div>

            {/* Card 2: Character & Academic Excellence */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-2.5">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-blue-50 text-blue-600 font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-lg sm:rounded-xl border border-blue-100">
                  Campus Life
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-gray-400">Character Education</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 group-hover:text-[#E11D48] transition-colors mb-1.5 sm:mb-2">
                Nurturing God-Fearing & Well-Rounded Leaders
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Discover how our biblical worldview and active campus activities equip students spiritually, academically, and socially for a purposeful life.
              </p>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('About')}
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-[#E11D48] hover:text-rose-700 transition"
                >
                  <span>Explore Our Philosophy</span>
                  <i className="fa-solid fa-arrow-right ml-1.5 sm:ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                </button>
              )}
            </div>

            {/* Card 3: School Calendar */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-2.5">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-purple-50 text-purple-600 font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-lg sm:rounded-xl border border-purple-100">
                  School Calendar
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-gray-400">Events & Holidays</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 group-hover:text-[#E11D48] transition-colors mb-1.5 sm:mb-2">
                Stay Updated with Upcoming Academic Activities
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Check our official S.Y. 2026-2027 calendar for examination dates, holidays, chapel services, and special school events.
              </p>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('Calendar')}
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-[#E11D48] hover:text-rose-700 transition"
                >
                  <span>View Full Calendar</span>
                  <i className="fa-solid fa-arrow-right ml-1.5 sm:ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Perfect PC & Mobile Balanced Facebook Feed Container (col-span-5) */}
          <div className="lg:col-span-5 w-full flex flex-col items-center order-1 lg:order-2">
            <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-2 sm:p-3.5 shadow-xl hover:shadow-2xl w-full max-w-[500px] flex flex-col overflow-hidden border border-slate-100 transition-all duration-300 relative">
              
              {/* Clean Round Logo Header Bar */}
              <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 bg-white rounded-xl sm:rounded-2xl flex items-center justify-between mb-1.5 sm:mb-2 border border-gray-100 shadow-2xs">
                <div className="flex items-center space-x-2.5 text-left">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-rose-100 shadow-2xs shrink-0 bg-white p-0.5">
                    <img 
                      src="/logo.png" 
                      alt="LSCS Logo" 
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23E11D48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[11px] sm:text-sm text-slate-900 leading-tight">Love and Serve Christian School Inc.</h4>
                    <a 
                      href="https://www.facebook.com/loveandserveinc/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] sm:text-[11px] text-[#1877F2] font-bold hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <i className="fa-brands fa-facebook"></i> Follow Page • Official Feed
                    </a>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-[#E11D48] bg-rose-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-rose-100 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse"></span> Live
                </span>
              </div>

              {/* 1. Mobile Dedicated iFrame Feed (sm:hidden): width=315 for 100% Mobile Fit */}
              <div className="block sm:hidden w-full overflow-hidden rounded-xl justify-center bg-white relative h-[470px] border border-gray-100/60">
                <iframe 
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Floveandserveinc%2F&tabs=timeline&width=315&height=640&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId" 
                  width="100%" 
                  height="640" 
                  scrolling="yes" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Love and Serve Christian School Official Facebook Feed Mobile"
                  className="rounded-xl w-full border-0 outline-none -mt-[68px] h-[565px]"
                ></iframe>
              </div>

              {/* 2. Desktop Dedicated iFrame Feed (hidden sm:flex): width=500 for 100% PC Fill */}
              <div className="hidden sm:flex w-full overflow-hidden rounded-2xl justify-center bg-white relative h-[520px] border border-gray-100/60">
                <iframe 
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Floveandserveinc%2F&tabs=timeline&width=500&height=640&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId" 
                  width="500" 
                  height="640" 
                  scrolling="yes" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Love and Serve Christian School Official Facebook Feed Desktop"
                  className="rounded-xl w-full border-0 outline-none -mt-[66px] h-[620px]"
                ></iframe>
              </div>

              {/* Mobile-Friendly Permanent Scroll Indicator Footer Badge */}
              <div className="py-2 px-3 sm:py-2.5 sm:px-4 bg-slate-900 text-white rounded-xl sm:rounded-2xl flex items-center justify-between text-[11px] sm:text-xs font-bold mt-2 shadow-md">
                <span className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-200">
                  <i className="fa-solid fa-arrows-up-down text-[#E11D48]"></i> 
                  <span>Scroll down inside box for more posts</span>
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