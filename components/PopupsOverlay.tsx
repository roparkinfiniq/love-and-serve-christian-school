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
    
    // Sort so newest or arbitrary order is consistent
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 transition-opacity">
       <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-[90vw] sm:max-w-sm md:max-w-md shrink-0 animate-fadeIn flex flex-col max-h-[90vh]">
          
          {/* Header Controls */}
          {activePopups.length > 1 && (
            <div className="absolute top-3 left-3 z-10 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
              {currentIndex + 1} / {activePopups.length}
            </div>
          )}

          <button 
            onClick={(e) => handleClose(false, e)}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors shadow-lg"
            title="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="overflow-y-auto flex-1 bg-gray-50 flex flex-col">
             {currentPopup.linkUrl ? (
               <a href={currentPopup.linkUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-1 outline-none hover:opacity-95 transition-opacity">
                 {currentPopup.imageUrl && <img src={currentPopup.imageUrl} alt="Popup Image" className="w-full h-auto max-h-[60vh] object-contain shrink-0" />}
                 {(currentPopup.content || !currentPopup.imageUrl) && (
                   <div className="p-6 bg-white border-t border-gray-100 break-words break-all sm:break-words w-full overflow-hidden text-gray-800 text-sm md:text-base leading-relaxed flex-1 flex items-center justify-center min-h-[120px] text-center">
                      <div className="w-full max-w-full prose prose-sm max-w-none prose-p:text-center prose-h1:text-center prose-h2:text-center prose-h3:text-center prose-h4:text-center text-center">
                        <Markdown>{currentPopup.content || currentPopup.title}</Markdown>
                      </div>
                   </div>
                 )}
               </a>
             ) : (
               <div className="flex flex-col flex-1 cursor-default">
                 {currentPopup.imageUrl && <img src={currentPopup.imageUrl} alt="Popup Image" className="w-full h-auto max-h-[60vh] object-contain shrink-0" />}
                 {(currentPopup.content || !currentPopup.imageUrl) && (
                   <div className="p-6 bg-white border-t border-gray-100 break-words break-all sm:break-words w-full overflow-hidden text-gray-800 text-sm md:text-base leading-relaxed flex-1 flex items-center justify-center min-h-[120px] text-center">
                      <div className="w-full max-w-full prose prose-sm max-w-none prose-p:text-center prose-h1:text-center prose-h2:text-center prose-h3:text-center prose-h4:text-center text-center">
                        <Markdown>{currentPopup.content || currentPopup.title}</Markdown>
                      </div>
                   </div>
                 )}
               </div>
             )}
          </div>

          {/* Footer Actions */}
          <div className="flex border-t border-gray-200">
             <button 
                onClick={(e) => handleClose(true, e)}
                className="flex-1 px-4 py-3.5 text-sm text-gray-500 hover:bg-gray-100 transition-colors border-r border-gray-200 font-medium"
             >
                <i className="fa-regular fa-clock mr-2"></i>
                Hide for 24 hours
             </button>
             <button 
                onClick={(e) => handleClose(false, e)}
                className="flex-1 px-4 py-3.5 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors"
             >
                Close
             </button>
          </div>

          {/* Carousel Buttons */}
          {activePopups.length > 1 && (
             <>
               <button 
                  onClick={() => setCurrentIndex(prev => (prev === 0 ? activePopups.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/30 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition-colors shadow-sm"
               >
                 <i className="fa-solid fa-chevron-left"></i>
               </button>
               <button 
                  onClick={() => setCurrentIndex(prev => (prev === activePopups.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/30 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition-colors shadow-sm"
               >
                 <i className="fa-solid fa-chevron-right"></i>
               </button>
             </>
          )}
       </div>
    </div>
  );
};

export default PopupsOverlay;
