import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { PopupData } from '../types';

interface PopupsOverlayProps {
  popups: PopupData[];
}

export const PopupsOverlay: React.FC<PopupsOverlayProps> = ({ popups }) => {
  const [activePopups, setActivePopups] = useState<PopupData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const closedMap = JSON.parse(localStorage.getItem('ls_closed_popups') || '{}');
    
    const visible = popups.filter(popup => {
      if (!popup.isActive) return false;
      
      if (closedMap[popup.id]) {
        const closedUntil = new Date(closedMap[popup.id]);
        if (new Date() < closedUntil) {
          return false;
        }
      }
      
      if (popup.startDate && popup.startDate > today) return false;
      if (popup.endDate && popup.endDate < today) return false;
      return true;
    });
    
    setActivePopups(visible);
  }, [popups]);

  if (activePopups.length === 0) return null;

  const handleClose = (hideFor24Hours: boolean, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const currentPopup = activePopups[currentIndex];
    
    if (hideFor24Hours) {
      const closedMap = JSON.parse(localStorage.getItem('ls_closed_popups') || '{}');
      const tomorrow = new Date();
      tomorrow.setHours(tomorrow.getHours() + 24);
      closedMap[currentPopup.id] = tomorrow.toISOString();
      localStorage.setItem('ls_closed_popups', JSON.stringify(closedMap));
    }

    const nextPopups = activePopups.filter((_, i) => i !== currentIndex);
    setActivePopups(nextPopups);
    
    if (currentIndex >= nextPopups.length) {
      setCurrentIndex(Math.max(0, nextPopups.length - 1));
    }
  };

  const currentPopup = activePopups[currentIndex];
  if (!currentPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-opacity animate-fadeIn">
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden w-full max-w-[92vw] sm:max-w-md md:max-w-lg shrink-0 flex flex-col max-h-[88vh] transform-gpu transition-all duration-500 ease-in-out">
        
        {/* Pagination Counter Badge */}
        {activePopups.length > 1 && (
          <div className="absolute top-4 left-4 z-20 bg-slate-900/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-black tracking-wider shadow-md">
            {currentIndex + 1} / {activePopups.length}
          </div>
        )}

        {/* Close Button */}
        <button 
          onClick={(e) => handleClose(false, e)}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-slate-900/70 hover:bg-slate-900 backdrop-blur-md text-white rounded-full transition-all duration-300 shadow-md hover:scale-105"
          title="Close Popup"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        {/* Scrollable Popup Content Body */}
        <div className="overflow-y-auto flex-1 bg-white flex flex-col scrollbar-thin">
          
          {/* Top Featured Banner Image */}
          {currentPopup.imageUrl && (
            <div className="relative w-full max-h-[42vh] bg-slate-100 overflow-hidden shrink-0">
              <img 
                src={currentPopup.imageUrl} 
                alt={currentPopup.title || "School Announcement"} 
                className="w-full h-full max-h-[42vh] object-cover" 
              />
            </div>
          )}

          {/* Text Content Section */}
          <div className="p-6 sm:p-8 flex flex-col flex-1 text-left">
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#E11D48] text-xs font-black uppercase tracking-wider border border-rose-100 shadow-xs">
                <i className="fa-solid fa-bullhorn text-[11px]"></i> School Announcement
              </span>
            </div>

            {/* Popup Title */}
            {currentPopup.title && (
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-3 leading-snug">
                {currentPopup.title}
              </h3>
            )}

            {/* Markdown Message Body */}
            {currentPopup.content && (
              <div className="prose prose-slate prose-sm max-w-none text-slate-700 leading-relaxed font-sans break-words [word-break:break-word] flex-1">
                <Markdown>{currentPopup.content}</Markdown>
              </div>
            )}

            {/* Optional Call to Action Button */}
            {currentPopup.linkUrl && (
              <a 
                href={currentPopup.linkUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#E11D48] hover:bg-rose-700 text-white text-sm font-bold rounded-2xl transition shadow-md hover:shadow-lg"
              >
                <span>View Full Details / 자세히 보기</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </a>
            )}
          </div>
        </div>

        {/* Footer Actions Bar */}
        <div className="flex border-t border-gray-100 bg-gray-50/60 shrink-0">
          <button 
            onClick={(e) => handleClose(true, e)}
            className="flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 transition border-r border-gray-100 flex items-center justify-center gap-2"
          >
            <i className="fa-regular fa-clock text-gray-400"></i>
            <span>Hide for 24 hours</span>
          </button>
          <button 
            onClick={(e) => handleClose(false, e)}
            className="flex-1 py-3.5 px-4 text-xs sm:text-sm font-black text-slate-900 hover:text-[#E11D48] hover:bg-gray-100/80 transition flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
            <span>Close</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PopupsOverlay;
