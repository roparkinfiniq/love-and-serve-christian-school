import React, { useState } from 'react';

const MessengerWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time?: string }>>([
    {
      sender: 'bot',
      text: 'Hello! Welcome to Love and Serve Christian School. 👋 How can we help you today?',
      time: 'Just now'
    },
    {
      sender: 'bot',
      text: 'Select a quick inquiry topic below or type your message to chat with us on Facebook Messenger.',
      time: 'Just now'
    }
  ]);

  const FACEBOOK_PAGE_USERNAME = "LSCSI"; // m.me/LSCSI
  // NOTE: When Meta Page ID is available, domain whitelisting on Facebook Business Suite allows full SDK embed.

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (showTooltip) setShowTooltip(false);
  };

  const quickTopics = [
    { label: '🏫 Admissions Process', text: 'I would like to inquire about the Admissions Process for new students.' },
    { label: '💰 Tuition & Scholarships', text: 'Could you provide information regarding Tuition Fees and Scholarships?' },
    { label: '📍 Schedule a Campus Visit', text: 'I want to schedule a visit to the LSCS Campus.' },
    { label: '📞 Contact School Officer', text: 'Please connect me with an Admissions Counselor.' }
  ];

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputMessage.trim();
    if (!textToSend) return;

    // Append user message locally for responsive UX
    const newMessages = [
      ...chatMessages,
      { sender: 'user' as const, text: textToSend, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      { sender: 'bot' as const, text: 'Opening Facebook Messenger to connect you directly with our team...', time: 'Just now' }
    ];
    setChatMessages(newMessages);
    setInputMessage('');

    // Encode text and redirect to Facebook Messenger
    setTimeout(() => {
      const encodedText = encodeURIComponent(textToSend);
      window.open(`https://m.me/${FACEBOOK_PAGE_USERNAME}?text=${encodedText}`, '_blank');
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end">
      {/* Interactive Messenger Chat Drawer */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-rose-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 transform-gpu">
          
          {/* Header (LSCS Theme) */}
          <div className="bg-[#E11D48] text-white px-5 py-4 flex items-center justify-between shadow-md relative">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 shrink-0">
                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden border-2 border-white/80 relative">
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
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-10 shadow-sm"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base leading-tight">Love and Serve Christian School</h3>
                <div className="flex items-center space-x-1.5 text-[11px] text-rose-100 mt-0.5">
                  <i className="fa-brands fa-facebook-messenger text-white text-xs"></i>
                  <span>Messenger Support • Online</span>
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

          {/* Chat Body */}
          <div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-3.5 custom-scrollbar">
            {chatMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[#E11D48] text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.time && (
                  <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                )}
              </div>
            ))}

            {/* Quick Topic Chips */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Quick Inquiry Topics</p>
              <div className="flex flex-col space-y-2">
                {quickTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(topic.text)}
                    className="text-left w-full bg-white hover:bg-rose-50 text-gray-700 hover:text-[#E11D48] px-3.5 py-2.5 rounded-xl border border-gray-200 hover:border-rose-300 text-xs font-semibold transition flex items-center justify-between group shadow-2xs"
                  >
                    <span>{topic.label}</span>
                    <i className="fa-solid fa-chevron-right text-[10px] text-gray-300 group-hover:text-[#E11D48] transition-transform group-hover:translate-x-0.5"></i>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Type your inquiry..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#E11D48] focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-10 h-10 bg-[#E11D48] hover:bg-rose-700 disabled:opacity-40 text-white rounded-full flex items-center justify-center transition shadow-md shrink-0"
                aria-label="Send Message"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Floating Tooltip */}
      {showTooltip && !isOpen && (
        <div className="mb-3 bg-white text-gray-900 px-4 py-2.5 rounded-2xl shadow-xl border border-rose-100 flex items-center space-x-2 text-sm font-bold animate-bounce transition-all">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] animate-ping"></span>
          <span className="text-gray-800">Inquire via Facebook Messenger!</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }} 
            className="text-gray-400 hover:text-gray-600 ml-1.5 p-0.5 rounded-full hover:bg-gray-100 transition"
            aria-label="Close tooltip"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>
      )}

      {/* Floating Toggle Button (Red Theme) */}
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
