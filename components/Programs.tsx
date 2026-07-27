import React from 'react';
import { Program } from '../types';

// Updated IDs to match the tabs in Academics.tsx
const programs: Program[] = [
  { 
    id: 'preschool', 
    image: '/img/Home-Preshool.jpg', 
    title: 'Preschool', 
    description: 'Learning through play and discovery in a safe environment.' 
  },
  { 
    id: 'elementary', 
    image: '/img/Home-Elementary.png', 
    title: 'Elementary', 
    description: 'Building strong fundamental skills and character foundations.' 
  },
  { 
    id: 'junior', 
    image: '/img/Home-JuniorHigh.jpg', 
    title: 'Junior High', 
    description: 'Exploring interests and developing critical thinking skills.' 
  }
];

interface ProgramsProps {
  onProgramClick?: (tab: 'preschool' | 'elementary' | 'junior') => void;
  onViewAll?: () => void;
}

const Programs: React.FC<ProgramsProps> = ({ onProgramClick, onViewAll }) => {
  return (
    <section className="py-16 md:py-28 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 md:mb-16">
        <div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800">Academic Programs</h3>
          <p className="text-gray-500 text-base md:text-lg mt-2 md:mt-4">Quality education for every stage of your child's growth.</p>
        </div>
        <button 
          onClick={onViewAll}
          className="text-[#E11D48] text-base md:text-lg font-bold hover:text-rose-700 transition-colors mt-4 md:mt-0 flex items-center"
        >
          View All Curriculums <i className="fa-solid fa-arrow-right ml-2 md:ml-3 text-xs sm:text-sm"></i>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {programs.map((p) => (
          <div 
            key={p.id} 
            onClick={() => onProgramClick && onProgramClick(p.id as 'preschool' | 'elementary' | 'junior')}
            className="group bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition duration-500 ease-in-out cursor-pointer border border-gray-100"
          >
            {/* Image Container */}
            <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src={p.image} 
                alt={p.title} 
                className={`w-full h-full object-cover transition-transform duration-700 ease-in-out transform-gpu will-change-transform antialiased [backface-visibility:hidden] ${
                  p.id === 'preschool'
                    ? 'object-bottom scale-105 origin-bottom group-hover:scale-[1.20]'
                    : 'group-hover:scale-110'
                }`}
              />
            </div>
            
            {/* Content Container */}
            <div className="p-6 sm:p-8 md:p-10 border-t-0 rounded-b-3xl md:rounded-b-[2.5rem] relative bg-white z-20 transform-gpu antialiased transition-all duration-500">
              <div className="transform-gpu transition-transform duration-500 group-hover:-translate-y-1 will-change-transform [backface-visibility:hidden]">
                <h5 className="font-extrabold text-2xl sm:text-3xl text-gray-900 mb-2 md:mb-3 transition-colors duration-300 group-hover:text-[#E11D48] hover:text-rose-600 cursor-pointer">{p.title}</h5>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed transition-colors duration-300 group-hover:text-gray-800 hover:text-gray-900">{p.description}</p>
              </div>
              
              <div className="mt-4 md:mt-6 flex items-center text-sm sm:text-base text-[#E11D48] font-bold transition-all duration-300 group-hover:text-rose-600 hover:text-rose-700 cursor-pointer transform-gpu group-hover:translate-x-1 will-change-transform [backface-visibility:hidden]">
                Learn More <i className="fa-solid fa-arrow-right ml-2 text-xs sm:text-sm transform transition-transform group-hover:translate-x-1 will-change-transform antialiased"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programs;