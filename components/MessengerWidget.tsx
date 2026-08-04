import React, { useState, useEffect } from 'react';

const MessengerWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const FACEBOOK_PAGE_USERNAME = "loveandserveinc"; // m.me/loveandserveinc

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('lscs_messenger_tooltip_dismissed');
      if (isDismissed === 'true') return;
    } catch (e) {
      console.error(e);
    }

    // Appear smoothly after 2 seconds
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    // Auto-dismiss smoothly after 8 seconds of display
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

  const toggleChat = () => {
    setIsOpen(!isOpen);
    dismissTooltip();
  };

  const quickTopics = [
    { label: '🏫 Admissions Process', text: 'I would like to inquire about the Admissions Process for new students.' },
    { label: '💰 Tuition & Scholarships', text: 'Could you provide information regarding Tuition Fees and Scholarships?' },
    { label: '📍 Schedule a Campus Visit', text: 'I want to schedule a visit to the LSCS Campus.' },
    { label: '📞 Contact School Officer', text: 'Please connect me with an Admissions Counselor.' }
  ];

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end">
      {/* Direct Facebook Messenger Popup Drawer */}
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[360px] bg-white rounded-3xl shadow-2xl border border-rose-100 flex flex-col overflow-hidden animate-fadeIn duration-300 transform-gpu">
          
          {/* Header (LSCS Theme) */}
          <div className="bg-[#E11D48] text-white px-5 py-4 flex items-center justify-between shadow-md relative">
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
              <div className="text-left">
                <h3 className="font-extrabold text-sm leading-tight">Love and Serve Christian School</h3>
                <div className="flex items-center space-x-1 text-[11px] text-rose-100 mt-0.5 font-medium">
                  <i className="fa-brands fa-facebook-messenger text-white"></i>
                  <span>Official Messenger • Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
              aria-label="Close Chat"
            >
              <i className="fa-solid fa-xmark text-base"></i>
            </button>
          </div>

          {/* Direct Live Chat Body & Actions */}
          <div className="bg-slate-50 p-5 flex flex-col justify-between overflow-y-auto space-y-4">
            <div className="space-y-3">
              {/* Official Greeting Banner */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs text-left">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-extrabold text-gray-800">Direct Facebook Live Chat</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  Welcome to LSCS! Click below to start a 1:1 direct chat with our admissions team on Facebook Messenger.
                </p>
              </div>

              {/* Prominent Direct Messenger Start Button */}
              <a
                href={`https://m.me/${FACEBOOK_PAGE_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#1877F2] hover:bg-blue-600 text-white font-extrabold text-sm rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 active:scale-98"
              >
                <i className="fa-brands fa-facebook-messenger text-xl"></i>
                <span>Start Chat on Messenger</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-xs ml-0.5"></i>
              </a>

              {/* Quick Inquiry Topics */}
              <div className="pt-2">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 text-left px-1">Or Pick a Topic to Chat</p>
                <div className="flex flex-col space-y-2">
                  {quickTopics.map((topic, idx) => (
                    <a
                      key={idx}
                      href={`https://m.me/${FACEBOOK_PAGE_USERNAME}?text=${encodeURIComponent(topic.text)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-left w-full bg-white hover:bg-rose-50 text-slate-800 hover:text-[#E11D48] px-3.5 py-3 rounded-xl border border-gray-200/90 hover:border-rose-300 text-xs font-bold transition flex items-center justify-between group shadow-2xs"
                    >
                      <span>{topic.label}</span>
                      <i className="fa-solid fa-paper-plane text-[11px] text-gray-300 group-hover:text-[#E11D48] transition-transform group-hover:translate-x-0.5"></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Link Footnote */}
            <div className="text-center text-[11px] text-gray-400 font-medium pt-1">
              Connects directly to @loveandserveinc on Facebook
            </div>
          </div>

        </div>
      )}

      {/* Floating Tooltip */}
      {showTooltip && !isOpen && (
        <a
          href={`https://m.me/${FACEBOOK_PAGE_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismissTooltip}
          className="mb-3 bg-white/95 backdrop-blur-md text-gray-900 px-4 py-2.5 rounded-2xl shadow-[0_10px_30px_-5px_rgba(225,29,72,0.2)] border border-rose-100 flex items-center space-x-2.5 text-xs sm:text-sm font-bold animate-fadeIn transition-all duration-500 cursor-pointer hover:scale-105"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] shrink-0 animate-pulse"></span>
          <span className="text-gray-800 tracking-tight">Chat on Facebook Messenger!</span>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dismissTooltip();
            }} 
            className="text-gray-400 hover:text-gray-700 ml-1 p-1 rounded-full hover:bg-gray-100 transition shrink-0"
            aria-label="Close tooltip"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        </a>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className="bg-[#E11D48] hover:bg-rose-700 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl shadow-rose-900/40 flex items-center justify-center text-2xl md:text-3xl hover:scale-110 transition-all duration-300 transform active:scale-95 relative border-2 border-white/20"
        title="LSCS Messenger Chat"
        aria-label="Toggle Messenger Chat"
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
