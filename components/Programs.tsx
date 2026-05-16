import React from 'react';
import { Program } from '../types';

// Updated IDs to match the tabs in Academics.tsx
const programs: Program[] = [
  { 
    id: 'preschool', 
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800', 
    title: 'Preschool', 
    description: 'Learning through play and discovery in a safe environment.' 
  },
  { 
    id: 'elementary', 
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800', 
    title: 'Elementary', 
    description: 'Building strong fundamental skills and character foundations.' 
  },
  { 
    id: 'junior', 
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', 
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
    <section className="py-28 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16">
        <div>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-800">Academic Programs</h3>
          <p className="text-gray-500 text-lg mt-4">Quality education for every stage of your child's growth.</p>
        </div>
        <button 
          onClick={onViewAll}
          className="text-[#E11D48] text-lg font-bold hover:text-rose-700 transition-colors mt-6 md:mt-0 flex items-center"
        >
          View All Curriculums <i className="fa-solid fa-arrow-right ml-3"></i>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {programs.map((p) => (
          <div 
            key={p.id} 
            onClick={() => onProgramClick && onProgramClick(p.id as 'preschool' | 'elementary' | 'junior')}
            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 ease-in-out cursor-pointer"
          >
            {/* Image Container */}
            <div className="h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
              />
            </div>
            
            {/* Content Container */}
            <div className="p-10 border border-t-0 border-gray-100 rounded-b-[2.5rem] relative bg-white z-20 transform-gpu antialiased transition-all duration-500">
              <div className="transform-gpu transition-transform duration-500 group-hover:-translate-y-1 will-change-transform [backface-visibility:hidden]">
                <h5 className="font-extrabold text-3xl text-gray-900 mb-3 transition-colors duration-300 group-hover:text-[#E11D48] hover:text-rose-600 cursor-pointer">{p.title}</h5>
                <p className="text-gray-500 text-lg leading-relaxed transition-colors duration-300 group-hover:text-gray-800 hover:text-gray-900">{p.description}</p>
              </div>
              
              <div className="mt-6 flex items-center text-[#E11D48] font-bold transition-all duration-300 group-hover:text-rose-600 hover:text-rose-700 cursor-pointer transform-gpu group-hover:translate-x-1 will-change-transform [backface-visibility:hidden]">
                Learn More <i className="fa-solid fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1 will-change-transform antialiased"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programs;