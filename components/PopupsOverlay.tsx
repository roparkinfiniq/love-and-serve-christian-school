import React, { useState, useEffect } from 'react';
import { PopupData } from '../types';

interface PopupsOverlayProps {
  popups: PopupData[];
}

const PopupsOverlay: React.FC<PopupsOverlayProps> = ({ popups }) => {
  const [activePopups, setActivePopups] = useState<PopupData[]>([]);
  const [closedPopupIds, setClosedPopupIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const visible = popups.filter(popup => {
      if (!popup.isActive) return false;
      if (closedPopupIds.has(popup.id)) return false;
      if (popup.startDate && popup.startDate > today) return false;
      if (popup.endDate && popup.endDate < today) return false;
      return true;
    });
    setActivePopups(visible);
  }, [popups, closedPopupIds]);

  const handleClose = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setClosedPopupIds(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  if (activePopups.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity">
       <div className="flex flex-wrap gap-4 justify-center overflow-y-auto max-h-full max-w-full items-center p-4">
         {activePopups.map((popup) => (
            <div key={popup.id} className="relative bg-white rounded-xl shadow-2xl overflow-hidden min-w-[300px] max-w-sm shrink-0 animate-fadeIn">
               <button 
                  onClick={(e) => handleClose(popup.id, e)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/60 transition-colors shadow-lg"
               >
                 <i className="fa-solid fa-xmark"></i>
               </button>
               {popup.linkUrl ? (
                 <a href={popup.linkUrl} target="_blank" rel="noopener noreferrer" className="block outline-none hover:opacity-95 transition-opacity">
                   {popup.imageUrl && <img src={popup.imageUrl} alt={popup.title} className="w-full h-auto max-h-[60vh] object-contain bg-gray-50" />}
                   <div className="p-5 bg-white border-t border-gray-100">
                      <h3 className="font-bold text-gray-900">{popup.title}</h3>
                   </div>
                 </a>
               ) : (
                 <div className="block">
                   {popup.imageUrl && <img src={popup.imageUrl} alt={popup.title} className="w-full h-auto max-h-[60vh] object-contain bg-gray-50" />}
                   <div className="p-5 bg-white border-t border-gray-100">
                      <h3 className="font-bold text-gray-900">{popup.title}</h3>
                   </div>
                 </div>
               )}
            </div>
         ))}
       </div>
    </div>
  );
};

export default PopupsOverlay;
