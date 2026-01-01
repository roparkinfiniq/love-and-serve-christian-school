import React from 'react';
import { Program } from '../types';

const programs: Program[] = [
  { id: 'pre', icon: '🧸', title: 'Preschool', description: 'Learning through play and discovery in a safe environment.' },
  { id: 'elem', icon: '✏️', title: 'Elementary', description: 'Building strong fundamental skills and character foundations.' },
  { id: 'jhs', icon: '🎓', title: 'Junior High', description: 'Exploring interests and developing critical thinking skills.' }
];

const Programs: React.FC = () => {
  return (
    <section className="py-28 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16">
        <div>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-800">Academic Programs</h3>
          <p className="text-gray-500 text-lg mt-4">Quality education for every stage of your child's growth.</p>
        </div>
        <button className="text-[#E11D48] text-lg font-bold hover:text-red-700 transition-colors mt-6 md:mt-0 flex items-center">
          View All Curriculums <i className="fa-solid fa-arrow-right ml-3"></i>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {programs.map((p) => (
          <div 
            key={p.id} 
            className="group bg-white border border-gray-100 p-10 rounded-[2.5rem] hover:border-pink-200 hover:bg-pink-50/10 transition duration-500 ease-in-out transform-gpu [backface-visibility:hidden] cursor-pointer hover:shadow-xl hover:-translate-y-2"
          >
            <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500 inline-block">{p.icon}</div>
            <h5 className="font-extrabold text-2xl text-gray-800">{p.title}</h5>
            <p className="text-gray-500 text-base mt-4 leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programs;