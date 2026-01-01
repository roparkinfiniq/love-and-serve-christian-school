
import React from 'react';
import { Program } from '../types';

const programs: Program[] = [
  { id: 'pre', icon: '🧸', title: 'Preschool', description: 'Learning through play and discovery in a safe environment.' },
  { id: 'elem', icon: '✏️', title: 'Elementary', description: 'Building strong fundamental skills and character foundations.' },
  { id: 'jhs', icon: '🧪', title: 'Junior High', description: 'Exploring interests and developing critical thinking skills.' },
  { id: 'shs', icon: '🎓', title: 'Senior High', description: 'Preparing for specialized college paths and professional life.' }
];

const Programs: React.FC = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div>
          <h3 className="text-3xl md:text-4xl font-extrabold">Academic Programs</h3>
          <p className="text-gray-500 mt-2">Quality education for every stage of your child's growth.</p>
        </div>
        <button className="text-[#E11D48] font-bold hover:underline mt-4 md:mt-0 flex items-center">
          View All Curriculums <i className="fa-solid fa-arrow-right ml-2"></i>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map((p) => (
          <div 
            key={p.id} 
            className="group bg-white border-2 border-gray-100 p-8 rounded-[2rem] hover:border-[#E11D48] transition-all duration-300 cursor-pointer hover:shadow-xl"
          >
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{p.icon}</div>
            <h5 className="font-extrabold text-xl text-gray-800">{p.title}</h5>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programs;
