import React, { useState, useEffect } from 'react';

const MessengerWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const FACEBOOK_PAGE_USERNAME = "loveandserveinc"; // m.me/loveandserveinc

  useEffect(() => {
    // Initialize Meta Official Facebook Customer Chat Plugin SDK
    const initFacebookSDK = () => {
      const chatbox = document.getElementById('fb-customer-chat');
      if (chatbox) {
        chatbox.setAttribute("page_id", "loveandserveinc");
        chatbox.setAttribute("attribution", "biz_inbox");
        chatbox.setAttribute("theme_color", "#E11D48");
      }

      (window as any).fbAsyncInit = function() {
        if ((window as any).FB) {
          (window as any).FB.init({
            xfbml: true,
            version: 'v18.0'
          });
        }
      };

      if (!document.getElementById('facebook-jssdk')) {
        const js = document.createElement('script');
        js.id = 'facebook-jssdk';
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        const fjs = document.getElementsByTagName('script')[0];
        if (fjs && fjs.parentNode) {
          fjs.parentNode.insertBefore(js, fjs);
        } else {
          document.head.appendChild(js);
        }
      }
    };

    initFacebookSDK();

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
    window.open(`https://m.me/${FACEBOOK_PAGE_USERNAME}`, '_blank');
  };

  return (
    <>
      {/* Official Meta Facebook Messenger Customer Chat SDK Elements */}
      <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat"></div>

      <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end">
        {/* Floating Tooltip Notification */}
        {showTooltip && (
          <div
            onClick={openMessengerDirectly}
            className="mb-3 bg-white/95 backdrop-blur-md text-gray-900 px-4 py-2.5 rounded-2xl shadow-[0_10px_30px_-5px_rgba(225,29,72,0.2)] border border-rose-100 flex items-center space-x-2.5 text-xs sm:text-sm font-bold animate-fadeIn transition-all duration-500 cursor-pointer hover:scale-105"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] shrink-0 animate-pulse"></span>
            <span className="text-gray-800 tracking-tight">Chat live with teachers on Facebook Messenger!</span>
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
          </div>
        )}

        {/* Fallback Direct Launch Messenger Button */}
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
    </>
  );
};

export default MessengerWidget;
