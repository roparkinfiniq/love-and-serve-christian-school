import React from 'react';
import { Page } from '../types';

interface FacilitiesProps {
  onNavigate: (page: Page) => void;
  onScheduleVisit?: () => void;
}

const Facilities: React.FC<FacilitiesProps> = ({ onNavigate, onScheduleVisit }) => {
  const facilities = [
    { 
      title: 'Playground', 
      image: 'https://images.unsplash.com/photo-1560523160-754a9e25c68f?auto=format&fit=crop&q=80&w=600',
      desc: 'A safe and vibrant space for active play and physical development.'
    },
    { 
      title: 'Library', 
      image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=600',
      desc: 'A quiet sanctuary filled with knowledge and study resources.'
    },
    { 
      title: 'Computer Lab', 
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
      desc: 'Modern workstations equipping students with digital skills.'
    },
    { 
      title: 'Science Laboratory', 
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
      desc: 'Fully equipped facility for hands-on experiments and discovery.'
    },
    { 
      title: 'Auditorium', 
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600',
      desc: 'A spacious venue for school events, performances, and worship.'
    },
    { 
      title: 'Kindergarten Classroom', 
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=600',
      desc: 'Colorful and interactive environments designed for early learners.'
    },
    { 
      title: 'Spacious Classrooms', 
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
      desc: 'Bright, ventilated rooms conducive to focused learning.'
    },
    { 
      title: 'School Clinic', 
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
      desc: 'Clean and ready medical assistance for student health and safety.'
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
          <p className="text-gray-500 text-lg mt-4">State-of-the-art facilities designed to nurture learning and growth.</p>
        </div>

        {/* Grid: 2 columns mobile, 4 columns desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {facilities.map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
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
      <section className="py-16 px-6 bg-red-50 text-center">
         <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Want to see it in person?</h3>
            <button 
              onClick={() => onScheduleVisit ? onScheduleVisit() : onNavigate('Contact')}
              className="bg-[#E11D48] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-all"
            >
               Schedule a Campus Visit
            </button>
         </div>
      </section>
    </div>
  );
};

export default Facilities;