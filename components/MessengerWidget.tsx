import React, { useState, useEffect } from 'react';

const MessengerWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const FACEBOOK_PAGE_USERNAME = "loveandserveinc"; // m.me/loveandserveinc

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

  const openMessengerDirectly = () => {
    dismissTooltip();
    window.open(`https://m.me/${FACEBOOK_PAGE_USERNAME}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end">
      {/* Floating Tooltip Notification */}
      {showTooltip && (
        <div
          onClick={openMessengerDirectly}
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

      {/* Floating Messenger Direct Button */}
      <button
        onClick={openMessengerDirectly}
        className="bg-[#E11D48] hover:bg-rose-700 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl shadow-rose-900/40 flex items-center justify-center text-2xl md:text-3xl hover:scale-110 transition-all duration-300 transform active:scale-95 relative border-2 border-white/20"
        title="Chat Live on Facebook Messenger"
        aria-label="Open Facebook Messenger"
      >
        <i className="fa-brands fa-facebook-messenger"></i>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
      </button>
    </div>
  );
};

export default MessengerWidget;
