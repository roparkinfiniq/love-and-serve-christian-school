import React, { useState } from 'react';
import { GalleryImage } from '../types';

interface GalleryProps {
  images: GalleryImage[];
  categories: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images, categories }) => {
  const activeCategoryState = useState<string>('All');
  const activeCategory = activeCategoryState[0];
  const setActiveCategory = activeCategoryState[1];
  
  const animatingState = useState(false);
  const isAnimating = animatingState[0];
  const setIsAnimating = animatingState[1];

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleCategoryChange = (cat: string) => {
    setIsAnimating(true);
    setActiveCategory(cat);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="animate-fadeIn bg-white min-h-screen">
       {/* Hero */}
       <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
             <img 
               src="/img/Campus_Life-Our_Gallery.png" 
               alt="Gallery Hero" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
             <span className="inline-block py-1.5 px-4 sm:py-2 sm:px-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold tracking-widest uppercase mb-4 md:mb-6 text-xs sm:text-sm">Campus Life</span>
             <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 md:mb-6">Our Gallery</h1>
             <p className="text-base sm:text-xl text-gray-200 font-medium max-w-2xl mx-auto">
               A glimpse into the vibrant life, joyous moments, and everyday excellence at Love and Serve Christian School.
             </p>
          </div>
       </section>

       {/* Gallery Section */}
       <section className="py-12 md:py-20 px-4 md:px-8 max-w-[1800px] mx-auto">
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:-translate-y-1 transform-gpu will-change-transform antialiased [backface-visibility:hidden] ${
                  activeCategory === cat
                    ? 'bg-[#E11D48] text-white shadow-lg shadow-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-white hover:shadow-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className={`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
             {filteredImages.map((img, idx) => (
                <div key={`${img.src}-${idx}`} className="break-inside-avoid">
                   <button 
                     onClick={() => setSelectedImage(img)}
                     className="block w-full text-left relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gray-100 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
                   >
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
                        loading="lazy"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 flex justify-between items-end pointer-events-none transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
                         <div>
                           <p className="text-white font-bold text-lg tracking-wide drop-shadow-md">{img.alt}</p>
                           <p className="text-gray-300 text-xs mt-1 uppercase tracking-wider font-semibold drop-shadow-md">{img.category}</p>
                         </div>
                         <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-transform duration-500 shrink-0">
                            <i className="fa-solid fa-expand text-sm"></i>
                         </div>
                      </div>
                   </button>
                </div>
             ))}
          </div>
       </section>

       {/* Image Modal */}
       {selectedImage && (
         <div 
           className="fixed inset-0 z-[500] flex items-center justify-center bg-black/90 p-4 animate-fadeIn"
           onClick={() => setSelectedImage(null)}
         >
           <button 
             className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
             onClick={(e) => {
               e.stopPropagation();
               setSelectedImage(null);
             }}
           >
             <i className="fa-solid fa-xmark text-4xl"></i>
           </button>
           
           {/* Navigation Buttons */}
           <button 
             className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 p-4 rounded-full transition-all z-10"
             onClick={(e) => {
               e.stopPropagation();
               const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
               const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
               setSelectedImage(filteredImages[prevIndex]);
             }}
           >
             <i className="fa-solid fa-chevron-left text-3xl"></i>
           </button>

           <button 
             className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 p-4 rounded-full transition-all z-10"
             onClick={(e) => {
               e.stopPropagation();
               const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
               const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
               setSelectedImage(filteredImages[nextIndex]);
             }}
           >
             <i className="fa-solid fa-chevron-right text-3xl"></i>
           </button>

           <div 
             className="relative max-w-7xl max-h-[90vh] flex items-center justify-center"
             onClick={(e) => e.stopPropagation()}
           >
             <img 
               src={selectedImage.src} 
               alt={selectedImage.alt}
               className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
             />
             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <p className="text-white font-bold text-xl">{selectedImage.alt}</p>
                <p className="text-gray-300 text-sm mt-1 uppercase tracking-wider font-semibold">{selectedImage.category}</p>
             </div>
           </div>
         </div>
       )}
    </div>
  );
};

export default Gallery;