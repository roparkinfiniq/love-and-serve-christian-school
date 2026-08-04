import React, { useState, useEffect, useRef } from 'react';
import { saveInquiry } from '../services/supabaseClient';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
  showFBButton?: boolean;
}

const MessengerWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! Welcome to Love and Serve Christian School. 👋 How can we help you today?',
      time: 'Just now'
    },
    {
      sender: 'bot',
      text: 'Select a topic below or type your inquiry to chat with our team.',
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const FACEBOOK_PAGE_USERNAME = "loveandserveinc";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isOpen, isTyping]);

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

  const toggleChat = () => {
    setIsOpen(!isOpen);
    dismissTooltip();
  };

  const quickTopics = [
    { label: '🏫 Admissions Process', text: 'I would like to inquire about the Admissions Process for SY 2026-2027.' },
    { label: '💰 Tuition & Fees', text: 'Could you provide information regarding Tuition & Fee details?' },
    { label: '📍 Schedule a Campus Visit', text: 'I want to schedule a visit to the LSCS Campus.' },
    { label: '📞 Contact Officer', text: 'Please connect me with an Admissions Counselor.' }
  ];

  const saveInquiryToDatabase = async (userText: string) => {
    try {
      await saveInquiry({
        name: 'Live Chat Visitor',
        email: 'live-chat-visitor@lscs.com.ph',
        phone: 'Live Chat Inquiry',
        department: 'General Support',
        message: userText
      });
    } catch (err) {
      console.error('Failed to log live chat inquiry:', err);
    }
  };

  const handleSendMessage = async (textToSendInput?: string) => {
    const textToSend = textToSendInput || inputMessage.trim();
    if (!textToSend) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // 1. Add User Message to Chat History
    const updatedWithUser: Message[] = [
      ...chatMessages,
      { sender: 'user', text: textToSend, time: timeString }
    ];
    setChatMessages(updatedWithUser);
    if (!textToSendInput) setInputMessage('');
    setIsTyping(true);

    // Save in database for admin records
    saveInquiryToDatabase(textToSend);

    // 2. Add Bot Reply with 1-Click Facebook Messenger Button
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: `Message received! To send this message directly to our Facebook Messenger inbox so our team can reply to you 1:1, tap below:`, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showFBButton: true
        }
      ]);
    }, 500);
  };

  const openFBWithText = (text: string) => {
    const encodedText = encodeURIComponent(text);
    window.open(`https://m.me/${FACEBOOK_PAGE_USERNAME}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end">
      {/* Interactive Messenger Drawer */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] h-[530px] bg-white rounded-3xl shadow-2xl border border-rose-100 flex flex-col overflow-hidden animate-fadeIn duration-300 transform-gpu">
          
          {/* Header */}
          <div className="bg-[#E11D48] text-white px-5 py-4 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center space-x-3 text-left">
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

          {/* Live Chat History Body */}
          <div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-3.5 custom-scrollbar text-left">
            {chatMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-xs ${
                    msg.sender === 'user' 
                      ? 'bg-[#E11D48] text-white rounded-br-xs' 
                      : 'bg-white text-slate-800 border border-gray-100 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                  {msg.showFBButton && (
                    <button
                      onClick={() => {
                        const lastUserMsg = [...chatMessages].reverse().find(m => m.sender === 'user')?.text || '';
                        openFBWithText(lastUserMsg);
                      }}
                      className="mt-2.5 w-full py-2 px-3 bg-[#1877F2] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                    >
                      <i className="fa-brands fa-facebook-messenger text-sm"></i>
                      <span>Send to Facebook Messenger</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px] ml-0.5"></i>
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 w-fit shadow-xs">
                <span className="text-xs text-gray-400 font-bold">LSCS Support is typing</span>
                <span className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-[#E11D48] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#E11D48] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#E11D48] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            )}

            {/* Quick Topic Chips (ONLY ONCE AT START) */}
            {chatMessages.length <= 2 && (
              <div className="pt-2 border-t border-gray-200/60 mt-2">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Quick Inquiry Topics</p>
                <div className="flex flex-col space-y-1.5">
                  {quickTopics.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(topic.text)}
                      className="text-left w-full bg-white hover:bg-rose-50 text-slate-700 hover:text-[#E11D48] px-3.5 py-2.5 rounded-xl border border-gray-200/90 hover:border-rose-300 text-xs font-bold transition flex items-center justify-between group shadow-2xs active:scale-98"
                    >
                      <span>{topic.label}</span>
                      <i className="fa-brands fa-facebook-messenger text-blue-500 text-xs group-hover:scale-110 transition-transform"></i>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Type your message here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-slate-50 border border-gray-200 rounded-full px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#E11D48] focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-10 h-10 bg-[#E11D48] hover:bg-rose-700 disabled:opacity-40 text-white rounded-full flex items-center justify-center transition shadow-md shrink-0 active:scale-95"
                aria-label="Send Message"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 px-1">
              <span>LSCS Online Inquiries</span>
              <a
                href={`https://m.me/${FACEBOOK_PAGE_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Direct Facebook Messenger</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
            </div>
          </div>

        </div>
      )}

      {/* Floating Tooltip */}
      {showTooltip && !isOpen && (
        <div
          onClick={toggleChat}
          className="mb-3 bg-white/95 backdrop-blur-md text-gray-900 px-4 py-2.5 rounded-2xl shadow-[0_10px_30px_-5px_rgba(225,29,72,0.2)] border border-rose-100 flex items-center space-x-2.5 text-xs sm:text-sm font-bold animate-fadeIn transition-all duration-500 cursor-pointer hover:scale-105"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] shrink-0 animate-pulse"></span>
          <span className="text-gray-800 tracking-tight">Need help? Inquire via Messenger!</span>
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
