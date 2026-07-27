import React from 'react';
import { TeamMember } from '../types';
import { INITIAL_TEAM_MEMBERS } from '../data/initialData';

interface TeamProps {
  teamMembers?: TeamMember[];
}

const Team: React.FC<TeamProps> = ({ teamMembers = INITIAL_TEAM_MEMBERS }) => {
  const leadership = teamMembers.filter(m => m.category === 'Leadership');
  const faculty = teamMembers.filter(m => m.category === 'Faculty');
  const adminSupport = teamMembers.filter(m => m.category === 'AdminSupport');

  return (
    <div className="animate-fadeIn bg-white min-h-screen">
      {/* Header */}
      <section className="bg-red-50/50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#E11D48] font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 inline-block">Our Community</span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-4 sm:mb-6">Meet Our Dedicated Team</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The passionate individuals working tirelessly behind the scenes and in the classrooms to nurture the next generation of leaders.
          </p>
        </div>
      </section>

      {/* Tier 1: Leadership */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2.5xl sm:text-3xl font-black text-gray-900">School Leadership</h2>
          <div className="w-16 h-1.5 bg-[#E11D48] mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 max-w-5xl mx-auto">
          {leadership.map((leader, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-red-100 rounded-full transform translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                {leader.image ? (
                  <div className="w-full h-full rounded-full border-4 border-white shadow-xl relative z-10 overflow-hidden bg-white">
                    <img 
                      src={leader.image} 
                      alt={leader.name} 
                      className="w-full h-full object-cover transition-transform duration-300"
                      style={{ 
                        objectPosition: (leader as any).position || 'center',
                        transform: (leader as any).scale ? `scale(${(leader as any).scale})` : undefined
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full border-4 border-white shadow-xl relative z-10 bg-slate-100 flex items-center justify-center">
                    <i className="fa-solid fa-user text-6xl sm:text-8xl text-gray-300"></i>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 bg-[#E11D48] text-white w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-xl shadow-lg">
                  <i className="fa-solid fa-quote-right"></i>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">{leader.name}</h3>
              <p className="text-[#E11D48] text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4">{leader.role}</p>
              <p className="text-gray-500 italic text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
                {leader.message}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tier 2: Faculty */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2.5xl sm:text-3xl font-black text-gray-900">Our Faculty</h2>
            <p className="text-gray-500 mt-2 sm:mt-4 text-sm sm:text-base md:text-lg">Committed educators shaping minds and hearts.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {faculty.map((teacher, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
              >
                <div className="h-60 sm:h-72 overflow-hidden relative bg-gray-100 flex items-center justify-center">
                  {teacher.image ? (
                    <img 
                      src={teacher.image} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
                      style={{ objectPosition: teacher.position || 'center top' }}
                    />
                  ) : (
                    <i className="fa-solid fa-user text-5xl sm:text-6xl text-gray-300 transition-transform duration-700 group-hover:scale-110"></i>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5 sm:p-6 text-center border-t-4 border-transparent group-hover:border-[#E11D48] transition-colors">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{teacher.name}</h4>
                  <p className="text-[#E11D48] font-medium text-xs sm:text-sm uppercase tracking-wide">{teacher.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 3: Admin & Support */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2.5xl sm:text-3xl font-black text-gray-900">Administrative & Support Team</h2>
          <p className="text-gray-500 mt-2 sm:mt-4 text-sm sm:text-base md:text-lg">The pillars ensuring our school runs smoothly and safely.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {adminSupport.map((staff, idx) => (
            <div 
              key={idx} 
              className="flex items-center p-3.5 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-100 flex items-center justify-center">
                 {staff.image ? (
                   <img 
                     src={staff.image} 
                     alt={staff.name} 
                     className="w-full h-full object-cover"
                     style={{ objectPosition: (staff as any).position || 'center top' }}
                   />
                 ) : (
                   <i className="fa-solid fa-user text-2xl sm:text-3xl text-gray-300"></i>
                 )}
              </div>
              <div className="ml-4 sm:ml-5">
                 <h5 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">{staff.name}</h5>
                 <p className="text-[#E11D48] text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-1">{staff.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;