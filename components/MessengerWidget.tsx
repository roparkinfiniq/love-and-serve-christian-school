import React, { useState, useEffect } from 'react';

const MessengerWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const FACEBOOK_PAGE_USERNAME = "loveandserveinc";

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('lscs_messenger_tooltip_dismissed');
      if (isDismissed === 'true') return;
    } catch (e) {
      console.error(e);
    }

    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const dismissTooltip = () => {
    setShowTooltip(false);
    try {
      sessionStorage.setItem('lscs_messenger_tooltip_dismissed', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    dismissTooltip();
  };

  const openMessengerWithTopic = (topicText?: string) => {
    const url = topicText
      ? `https://m.me/${FACEBOOK_PAGE_USERNAME}?text=${encodeURIComponent(topicText)}`
      : `https://m.me/${FACEBOOK_PAGE_USERNAME}`;
    window.open(url, '_blank');
  };

  const quickTopics = [
    { label: '🏫 Admissions Process', text: 'I would like to inquire about the Admissions Process for SY 2026-2027.' },
    { label: '💰 Tuition & Fees', text: 'Could you provide information regarding Tuition & Fee details?' },
    { label: '📍 Schedule a Campus Visit', text: 'I want to schedule a visit to the LSCS Campus.' },
    { label: '📞 Contact Officer', text: 'Please connect me with an Admissions Counselor.' }
  ];

  return (
    <>
      {/* Transparent Overlay Backdrop (Click Anywhere Outside to Close) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[90] bg-black/5 sm:bg-transparent transition-opacity" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end">
        {/* Golden Proportion PC & Mobile Messenger Card Drawer */}
        {isOpen && (
          <div className="mb-3.5 w-[calc(100vw-32px)] max-w-[320px] sm:w-[350px] sm:max-w-[360px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-rose-100 flex flex-col overflow-hidden animate-fadeIn duration-300 transform-gpu text-left">
            
            {/* Header */}
            <div className="bg-[#E11D48] text-white px-4 py-3 sm:px-4.5 sm:py-3.5 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden border-2 border-white/80 shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="LSCS Logo" 
                    className="w-full h-full object-cover scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23E11D48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm leading-tight">Love & Serve Christian School</h3>
                  <div className="flex items-center space-x-1 sm:space-x-1.5 text-[10px] sm:text-[11px] text-rose-100 mt-0.5 font-medium">
                    <i className="fa-brands fa-facebook-messenger text-white text-[11px]"></i>
                    <span>Official Messenger • Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={toggleWidget}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition shrink-0"
                aria-label="Close Drawer"
              >
                <i className="fa-solid fa-xmark text-sm sm:text-base"></i>
              </button>
            </div>

            {/* Responsive Golden Ratio Drawer Body */}
            <div className="p-3.5 sm:p-4 bg-slate-50 space-y-2.5 sm:space-y-3">
              
              {/* Friendly Greeting Banner */}
              <div className="bg-white p-3 rounded-xl sm:rounded-2xl border border-gray-100 shadow-2xs">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E11D48] animate-pulse"></span>
                  <span className="text-[11px] sm:text-xs font-extrabold text-slate-800">1:1 Official Admissions Chat</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-snug font-medium">
                  Welcome to LSCS! Click below to start a 1:1 live chat directly with our admissions team on Facebook Messenger.
                </p>
              </div>

              {/* Main Primary Messenger Button */}
              <button
                onClick={() => openMessengerWithTopic()}
                className="w-full py-2.5 sm:py-3 px-3.5 sm:px-4 bg-[#1877F2] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm rounded-xl sm:rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 sm:gap-2.5 active:scale-95"
              >
                <i className="fa-brands fa-facebook-messenger text-base sm:text-lg"></i>
                <span>Start 1:1 Chat on Messenger</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px] sm:text-xs ml-0.5"></i>
              </button>

              {/* Quick Topic Chips */}
              <div className="pt-1.5 sm:pt-2 border-t border-gray-200/80">
                <p className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2 text-left px-0.5">Select an Inquiry Topic</p>
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  {quickTopics.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => openMessengerWithTopic(topic.text)}
                      className="text-left w-full bg-white hover:bg-rose-50 text-slate-800 hover:text-[#E11D48] px-3.5 py-2.5 sm:py-2.5 rounded-xl border border-gray-200/90 hover:border-rose-300 text-[11px] sm:text-xs font-bold transition flex items-center justify-between group shadow-2xs active:scale-98"
                    >
                      <span className="truncate pr-2">{topic.label}</span>
                      <i className="fa-solid fa-chevron-right text-xs text-slate-300 group-hover:text-[#E11D48] group-hover:translate-x-0.5 transition-all shrink-0"></i>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footnote */}
              <div className="text-center text-[10px] sm:text-[11px] text-gray-400 font-medium pt-0.5">
                Connects to @loveandserveinc on Facebook
              </div>

            </div>

          </div>
        )}

        {/* Responsive Floating Tooltip */}
        {showTooltip && !isOpen && (
          <div
            onClick={toggleWidget}
            className="mb-2.5 sm:mb-3 bg-white/95 backdrop-blur-md text-gray-900 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-[0_10px_30px_-5px_rgba(225,29,72,0.2)] border border-rose-100 flex items-center space-x-2.5 sm:space-x-3 text-xs sm:text-sm font-bold animate-fadeIn transition-all duration-500 cursor-pointer hover:scale-105"
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E11D48] shrink-0 animate-pulse"></span>
            <div className="flex flex-col text-left">
              <span className="text-gray-900 font-extrabold tracking-tight text-xs sm:text-sm">Chat on Facebook Messenger!</span>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-normal">Connect 1:1 with Admissions Team</span>
            </div>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                dismissTooltip();
              }} 
              className="text-gray-400 hover:text-gray-700 ml-0.5 p-1 rounded-full hover:bg-gray-100 transition shrink-0"
              aria-label="Close tooltip"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          </div>
        )}

        {/* Bold Prominent Floating Toggle Button */}
        <button
          onClick={toggleWidget}
          className="bg-[#E11D48] hover:bg-rose-700 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl shadow-rose-900/50 flex items-center justify-center text-2xl sm:text-3xl hover:scale-110 transition-all duration-300 transform active:scale-95 relative border-2 border-white/30 shrink-0"
          title="LSCS Messenger Chat"
          aria-label="Toggle Messenger Widget"
        >
          {isOpen ? (
            <i className="fa-solid fa-xmark text-2xl sm:text-3xl"></i>
          ) : (
            <i className="fa-brands fa-facebook-messenger text-2.5xl sm:text-3xl"></i>
          )}
        </button>
      </div>
    </>
  );
};

export default MessengerWidget;
