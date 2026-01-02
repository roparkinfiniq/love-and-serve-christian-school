import React, { useState } from 'react';

type Category = 'All' | 'Academics' | 'Student Life' | 'Arts & Sports' | 'Campus';

const Gallery: React.FC = () => {
  const activeCategoryState = useState<Category>('All');
  const activeCategory = activeCategoryState[0];
  const setActiveCategory = activeCategoryState[1];
  
  const animatingState = useState(false);
  const isAnimating = animatingState[0];
  const setIsAnimating = animatingState[1];

  const categories: Category[] = ['All', 'Academics', 'Student Life', 'Arts & Sports', 'Campus'];

  const images = [
    { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200', alt: 'Science Lab Experiment', category: 'Academics' },
    { src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800', alt: 'Library Study Session', category: 'Academics' },
    { src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200', alt: 'Classroom Engagement', category: 'Academics' },
    { src: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&q=80&w=800', alt: 'Creative Arts Class', category: 'Arts & Sports' },
    { src: 'https://images.unsplash.com/photo-1560523160-754a9e25c68f?auto=format&fit=crop&q=80&w=1200', alt: 'Preschool Playtime', category: 'Student Life' },
    { src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800', alt: 'Student Friendship', category: 'Student Life' },
    { src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200', alt: 'Sports & Athletics', category: 'Arts & Sports' },
    { src: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=800', alt: 'Teacher & Student', category: 'Academics' },
    { src: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=1200', alt: 'Graduation Day', category: 'Student Life' },
    { src: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800', alt: 'Quiet Reading Time', category: 'Academics' },
    { src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200', alt: 'School Lunch', category: 'Student Life' },
    { src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800', alt: 'Painting Workshop', category: 'Arts & Sports' },
    { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200', alt: 'Campus Grounds', category: 'Campus' },
    { src: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&q=80&w=800', alt: 'School Hallways', category: 'Campus' },
    { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200', alt: 'Collaborative Learning', category: 'Academics' },
    { src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800', alt: 'Elementary Reading', category: 'Academics' },
    { src: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1200', alt: 'Taekwondo Practice', category: 'Arts & Sports' },
    { src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=800', alt: 'Music Class', category: 'Arts & Sports' },
    { src: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=1200', alt: 'School Bus Arriving', category: 'Campus' },
    { src: 'https://images.unsplash.com/photo-1568792923760-d70635a89fdc?auto=format&fit=crop&q=80&w=800', alt: 'Campus Aerial View', category: 'Campus' },
  ];

  const handleCategoryChange = (cat: Category) => {
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
               src="https://images.unsplash.com/photo-1568792923760-d70635a89fdc?auto=format&fit=crop&q=80&w=2000" 
               alt="Gallery Hero" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
             <span className="inline-block py-2 px-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold tracking-widest uppercase mb-6 text-sm">Campus Life</span>
             <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Our Gallery</h1>
             <p className="text-xl text-gray-200 font-medium max-w-2xl mx-auto">
               A glimpse into the vibrant life, joyous moments, and everyday excellence at Love and Serve Christian School.
             </p>
          </div>
       </section>

       {/* Gallery Section */}
       <section className="py-20 px-4 md:px-8 max-w-[1800px] mx-auto">
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform hover:-translate-y-1 ${
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
          <div className={`columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
             {filteredImages.map((img, idx) => (
                <div key={`${img.src}-${idx}`} className="break-inside-avoid">
                   <a 
                     href={img.src} 
                     target="_blank" 
                     rel="noreferrer"
                     className="block relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gray-100"
                   >
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110 will-change-transform"
                        loading="lazy"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                         <div className="transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                            <div className="bg-white/10 p-4 rounded-full text-white border border-white/50 hover:bg-white hover:text-black transition-colors duration-300 shadow-xl">
                               <i className="fa-solid fa-expand text-xl"></i>
                            </div>
                         </div>
                      </div>
                      
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                         <p className="text-white font-bold text-base tracking-wide">{img.alt}</p>
                         <p className="text-gray-300 text-xs mt-1 uppercase tracking-wider font-semibold">{img.category}</p>
                      </div>
                   </a>
                </div>
             ))}
          </div>
       </section>
    </div>
  );
};

export default Gallery;