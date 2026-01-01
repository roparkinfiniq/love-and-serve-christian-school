import React, { useState, useRef, useEffect } from 'react';
import { getCounselorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AICounselor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your LSCS AI Counselor. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getCounselorResponse(messages, input);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to Counselor. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-96 md:w-[28rem] h-[600px] rounded-[2.5rem] shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-[#E11D48] p-5 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-robot text-xl"></i>
              <span className="font-bold text-lg">LSCS AI Counselor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-base leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#E11D48] text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 shadow-sm rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-5 border-t bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-[#E11D48] text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition"
              >
                <i className="fa-solid fa-paper-plane text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#E11D48] text-white w-18 h-18 p-5 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition transform"
        >
          <i className="fa-solid fa-message"></i>
        </button>
      )}
    </div>
  );
};

export default AICounselor;