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
    { label: '💰 Tuition & Scholarships', text: 'Could you provide information regarding Tuition & Fee details?' },
    { label: '📍 Schedule a Campus Visit', text: 'I want to schedule a visit to the LSCS Campus.' },
    { label: '📞 Contact School Officer', text: 'Please connect me with an Admissions Counselor.' }
  ];

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end">
      {/* Elegant Messenger Info Card Drawer (Polite Preview First) */}
      {isOpen && (
        <div className="mb-4 w-[330px] sm:w-[370px] bg-white rounded-3xl shadow-2xl border border-rose-100 flex flex-col overflow-hidden animate-fadeIn duration-300 transform-gpu text-left">
          
          {/* Header */}
          <div className="bg-[#E11D48] text-white px-5 py-4 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative w-11 h-11 shrink-0">
                <div className="w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden border-2 border-white/80">
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
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full z-10 shadow-xs"></span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm leading-tight">Love and Serve Christian School</h3>
                <div className="flex items-center space-x-1.5 text-[11px] text-rose-100 mt-0.5 font-medium">
                  <i className="fa-brands fa-facebook-messenger text-white text-xs"></i>
                  <span>Facebook Messenger Support • Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={toggleWidget}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
              aria-label="Close Drawer"
            >
              <i className="fa-solid fa-xmark text-base"></i>
            </button>
          </div>

          {/* Drawer Body & Action Buttons */}
          <div className="p-5 bg-slate-50 space-y-4">
            
            {/* Friendly Greeting Card */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-extrabold text-slate-800">1:1 Official Admissions Chat</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Welcome to LSCS! Click below to start a 1:1 live chat directly with our admissions team on Facebook Messenger.
              </p>
            </div>

            {/* Main Primary Messenger Connect Button */}
            <button
              onClick={() => openMessengerWithTopic()}
              className="w-full py-3.5 px-4 bg-[#1877F2] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 active:scale-95"
            >
              <i className="fa-brands fa-facebook-messenger text-lg"></i>
              <span>Start 1:1 Chat on Messenger</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs ml-0.5"></i>
            </button>

            {/* Quick Topic Chips */}
            <div className="pt-2 border-t border-gray-200/80">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 text-left">Or Select an Inquiry Topic</p>
              <div className="flex flex-col space-y-2">
                {quickTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => openMessengerWithTopic(topic.text)}
                    className="text-left w-full bg-white hover:bg-rose-50 text-slate-800 hover:text-[#E11D48] px-3.5 py-3 rounded-xl border border-gray-200/90 hover:border-rose-300 text-xs font-bold transition flex items-center justify-between group shadow-2xs active:scale-98"
                  >
                    <span>{topic.label}</span>
                    <i className="fa-brands fa-facebook-messenger text-blue-500 text-xs group-hover:scale-110 transition-transform"></i>
                  </button>
                ))}
              </div>
            </div>

            {/* Footnote */}
            <div className="text-center text-[10px] text-gray-400 font-medium pt-1">
              Connects directly to @loveandserveinc on Facebook Messenger
            </div>

          </div>

        </div>
      )}

      {/* Floating Tooltip Notification */}
      {showTooltip && !isOpen && (
        <div
          onClick={toggleWidget}
          className="mb-3 bg-white/95 backdrop-blur-md text-gray-900 px-4 py-3 rounded-2xl shadow-[0_10px_30px_-5px_rgba(225,29,72,0.2)] border border-rose-100 flex items-center space-x-3 text-xs sm:text-sm font-bold animate-fadeIn transition-all duration-500 cursor-pointer hover:scale-105"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] shrink-0 animate-pulse"></span>
          <div className="flex flex-col text-left">
            <span className="text-gray-900 font-extrabold tracking-tight">Chat Live on Facebook Messenger!</span>
            <span className="text-[11px] text-gray-500 font-normal">Connect 1:1 with LSCS Admissions Team</span>
          </div>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dismissTooltip();
            }} 
            className="text-gray-400 hover:text-gray-700 ml-1 p-1 rounded-full hover:bg-gray-100 transition shrink-0"
            aria-label="Close tooltip"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleWidget}
        className="bg-[#E11D48] hover:bg-rose-700 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl shadow-rose-900/40 flex items-center justify-center text-2xl md:text-3xl hover:scale-110 transition-all duration-300 transform active:scale-95 relative border-2 border-white/20"
        title="LSCS Messenger Chat"
        aria-label="Toggle Messenger Widget"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-2xl"></i>
        ) : (
          <>
            <i className="fa-brands fa-facebook-messenger"></i>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </>
        )}
      </button>
    </div>
  );
};

export default MessengerWidget;
