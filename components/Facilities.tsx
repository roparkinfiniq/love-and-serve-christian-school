import React from 'react';
import { Page } from '../types';

interface FacilitiesProps {
  onNavigate: (page: Page) => void;
  onScheduleVisit?: () => void;
}

const Facilities: React.FC<FacilitiesProps> = ({ onNavigate, onScheduleVisit }) => {
  const facilities = [
    { 
      title: 'School Ground', 
      image: '/img/Campus_Life-school grounds.png',
      desc: 'Wide and well-maintained open spaces for learning, activities, and community gatherings'
    },
    { 
      title: 'Playground', 
      image: '/img/Campus_Life-Playground.png',
      desc: 'A safe and vibrant space for active play and physical development.'
    },
    { 
      title: 'Library', 
      image: '/img/Campus_Life-Library.png',
      desc: 'A quiet sanctuary filled with knowledge and study resources.'
    },
    { 
      title: 'Computer Lab', 
      image: '/img/Campus_Life-Computer_Room.png',
      desc: 'Modern workstations equipping students with digital skills.'
    },
    { 
      title: 'Science Laboratory', 
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
      desc: 'Fully equipped facility for hands-on experiments and discovery.'
    },
    { 
      title: 'Worship Hall', 
      image: '/img/Campus_Life-worship hall.png',
      desc: 'A spacious venue for school events, performances, and worship.'
    },
    { 
      title: 'Kindergarten Classroom', 
      image: '/img/Campus_Life-Kinder.png',
      desc: 'Colorful and interactive environments designed for early learners.'
    },
    { 
      title: 'Spacious Classrooms', 
      image: '/img/Campus_Life-Spacious_Claassrooms.png',
      desc: 'Bright, ventilated rooms conducive to focused learning.'
    },
    { 
      title: 'School Clinic', 
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
      desc: 'Clean and ready medical assistance for student health and safety.'
    },
    { 
      title: 'School Office', 
      image: '/img/Campus_Life-School Office.png',
      desc: 'Dedicated space for administrative inquiry, student services, and school operations.'
    }
  ];

  return (
    <div className="animate-fadeIn bg-white min-h-screen">
      
      {/* Section 1: Virtual Tour Video (Hero) */}
      <section className="relative bg-slate-900 py-20 lg:py-28 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12">
              <span className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E11D48] font-bold tracking-widest uppercase mb-6 text-sm">
                Experience Campus
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Take a Virtual Tour</h1>
              <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                Can't visit in person? Walk through our halls, peek into classrooms, and feel the spirit of LSCS from wherever you are.
              </p>
           </div>

           {/* Video Container */}
           <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-slate-800 bg-black">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/5jX40R4PcLs?rel=0" 
                title="LSCS Virtual Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
           </div>
        </div>
      </section>

      {/* Section 2: Campus Highlights (Curated Gallery) */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <div className="w-16 h-1.5 bg-[#E11D48] mx-auto mb-6 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Explore Our Campus Highlights</h2>
          <p className="text-gray-500 text-lg mt-4">Modern workstations equipping students with digital skills.</p>
        </div>

        {/* Grid: 1 column mobile, 2 sm, 4 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {facilities.map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col h-full transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E11D48] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 relative bg-slate-900 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=2000" 
            alt="Campus Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-[#E11D48] opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
              State-of-the-art facilities designed to nurture learning and growth.
            </h3>
            <button 
              onClick={() => onScheduleVisit ? onScheduleVisit() : onNavigate('Contact')}
              className="group flex items-center gap-3 bg-[#E11D48] text-white px-6 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg shadow-[0_10px_40px_-10px_rgba(225,29,72,0.8)] hover:bg-red-600 hover:-translate-y-1 hover:shadow-[0_15px_50px_-10px_rgba(225,29,72,1)] transition-all duration-300 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
            >
               <span>Schedule a Campus Visit</span>
               <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
            </button>
        </div>
      </section>
    </div>
  );
};

export default Facilities;