import React from 'react';

const Team: React.FC = () => {
  // Data for Leadership
  const leadership = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'School Principal',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      message: '"Leading with faith and a heart for every student\'s future."'
    },
    {
      name: 'Rev. David Martinez',
      role: 'School Administrator',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
      message: '"Building a foundation of excellence and service."'
    }
  ];

  // Data for Faculty
  const faculty = [
    { name: 'Ms. Emily Chen', role: 'Preschool Head', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600' },
    { name: 'Mr. James Wilson', role: 'Elementary Mathematics', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600' },
    { name: 'Mrs. Maria Santos', role: 'Science Department', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600' },
    { name: 'Mr. John Lee', role: 'Music & Arts', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600' },
    { name: 'Ms. Sarah Thompson', role: 'English Literature', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600' },
    { name: 'Mr. Michael Brown', role: 'Physical Education', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=600' },
    { name: 'Mrs. Hannah White', role: 'Values Education', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=600' },
    { name: 'Mr. Robert Garcia', role: 'Junior High Adviser', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600' },
  ];

  // Data for Admin & Support
  const adminSupport = [
    { name: 'Ms. Jennifer Wu', role: 'School Registrar', category: 'Office Staff', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Mr. Alex Turner', role: 'IT Support Lead', category: 'Technical Team', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
    { name: 'Ms. Lisa Baker', role: 'School Accountant', category: 'Office Staff', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400' },
    { name: 'Mr. Carlos Gomez', role: 'Head of Security', category: 'Support Staff', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="animate-fadeIn bg-white min-h-screen">
      {/* Header */}
      <section className="bg-red-50/50 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#E11D48] font-bold tracking-widest uppercase text-sm mb-4 inline-block">Our Community</span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Meet Our Dedicated Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The passionate individuals working tirelessly behind the scenes and in the classrooms to nurture the next generation of leaders.
          </p>
        </div>
      </section>

      {/* Tier 1: Leadership */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900">School Leadership</h2>
          <div className="w-16 h-1.5 bg-[#E11D48] mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {leadership.map((leader, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
                <div className="absolute inset-0 bg-red-100 rounded-full transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10"
                />
                <div className="absolute bottom-4 right-4 z-20 bg-[#E11D48] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg">
                  <i className="fa-solid fa-quote-right"></i>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{leader.name}</h3>
              <p className="text-[#E11D48] font-bold uppercase tracking-wider mb-4">{leader.role}</p>
              <p className="text-gray-500 italic text-lg leading-relaxed max-w-md">
                {leader.message}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tier 2: Faculty */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900">Our Faculty</h2>
            <p className="text-gray-500 mt-4 text-lg">Committed educators shaping minds and hearts.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {faculty.map((teacher, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={teacher.image} 
                    alt={teacher.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 text-center border-t-4 border-transparent group-hover:border-[#E11D48] transition-colors">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{teacher.name}</h4>
                  <p className="text-[#E11D48] font-medium text-sm uppercase tracking-wide">{teacher.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 3: Admin & Support */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900">Administrative & Support Team</h2>
          <p className="text-gray-500 mt-4 text-lg">The pillars ensuring our school runs smoothly and safely.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminSupport.map((staff, idx) => (
            <div 
              key={idx} 
              className="flex items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-100">
                 <img 
                   src={staff.image} 
                   alt={staff.name} 
                   className="w-full h-full object-cover"
                 />
              </div>
              <div className="ml-5">
                 <h5 className="font-bold text-gray-900 text-lg">{staff.name}</h5>
                 <p className="text-gray-500 text-sm">{staff.role}</p>
                 <span className="inline-block mt-2 text-xs font-bold text-[#E11D48] bg-red-50 px-2 py-1 rounded-md">
                   {staff.category}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;