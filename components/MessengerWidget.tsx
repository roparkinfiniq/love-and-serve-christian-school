import React, { useState, useEffect } from 'react';
import { saveInquiry } from '../services/supabaseClient';

const MessengerWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await saveInquiry({
        name: name.trim() || 'No-Login Website Visitor',
        email: contact.includes('@') ? contact.trim() : 'no-login-visitor@lscs.com.ph',
        phone: !contact.includes('@') ? contact.trim() : 'No Phone Provided',
        department: 'Quick Inquiries (No Login)',
        message: message.trim()
      });
      setIsSuccess(true);
      setName('');
      setContact('');
      setMessage('');
    } catch (err) {
      console.error('Failed to submit quick inquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openMessengerDirectly = () => {
    window.open(`https://m.me/${FACEBOOK_PAGE_USERNAME}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end">
      {/* No-Login Quick Inquiry Drawer */}
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
                  <i className="fa-solid fa-paper-plane text-white text-[10px]"></i>
                  <span>No-Login Quick Inquiry • Online</span>
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

          {/* Form Content */}
          <div className="p-5 bg-slate-50 space-y-4">
            
            {isSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-2xl text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-xl shadow-md">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h4 className="font-black text-base">Inquiry Sent Successfully!</h4>
                <p className="text-xs leading-relaxed text-emerald-700 font-medium">
                  Thank you! Your message has been received by our admissions team. We will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-xs font-bold text-emerald-700 underline hover:text-emerald-900"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs mb-2">
                  <p className="text-xs text-slate-700 font-bold leading-relaxed">
                    👋 Ask us anything without logging in! Leave your message and contact info below:
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">Your Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Maria Santos"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#E11D48] transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">Phone Number / Email</label>
                  <input
                    type="text"
                    placeholder="e.g. 0917-123-4567 or email@domain.com"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#E11D48] transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">Your Inquiry / Message *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Type your question regarding admissions, tuition fees, or campus tour..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#E11D48] transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full py-3 bg-[#E11D48] hover:bg-rose-700 disabled:opacity-40 text-white font-extrabold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  {isSubmitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane text-xs"></i>
                      <span>Send Inquiry (No Login Required)</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Footer option for Facebook users */}
            <div className="pt-2 border-t border-gray-200/80 text-center">
              <button
                onClick={openMessengerDirectly}
                className="text-[11px] font-bold text-[#1877F2] hover:underline inline-flex items-center gap-1.5"
              >
                <i className="fa-brands fa-facebook-messenger"></i>
                <span>Or Chat via Facebook Messenger</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </button>
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
            <span className="text-gray-900 font-extrabold tracking-tight">Quick Inquiry (No Login Required)!</span>
            <span className="text-[11px] text-gray-500 font-normal">Ask us anything about admissions & tuition</span>
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
        title="LSCS Quick Inquiry"
        aria-label="Toggle Quick Inquiry Widget"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-2xl"></i>
        ) : (
          <>
            <i className="fa-solid fa-comment-dots"></i>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </>
        )}
      </button>
    </div>
  );
};

export default MessengerWidget;
