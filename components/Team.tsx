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
    { name: 'Ms. Maria Luisa L. Gonzales', role: 'School Head', image: '' },
    { name: 'Mr. Jhoven A. Penaflor', role: 'School Chaplain', image: '' },
    { name: 'Ms. Glaiza T. Placencia', role: 'Pre School Dept. Coordinator', image: '' },
    { name: 'Ms. Rosa B. Destura', role: 'Kinder I Adviser', image: '' },
    { name: 'Ms. Mary Joy R. Despe', role: 'Kinder II Adviser', image: '' },
    { name: 'Ms. Myra P. Peñaflor', role: 'Elem. Coordinator / Grade 6 Adviser', image: '' },
    { name: 'Ms. Jonela A. Pentinio', role: 'Grade 1 Adviser', image: '' },
    { name: 'Ms. Kizha Marie N. Delen', role: 'Grade 2 Adviser', image: '' },
    { name: 'Ms. Maelyn B. Mede', role: 'Grade 3 Adviser', image: '' },
    { name: 'Mr. Gechris O. Ortega', role: 'Grade 4 Adviser', image: '' },
    { name: 'Mr. John Paolo A. Camagon', role: 'Grade 5 Adviser', image: '' },
    { name: 'Ms. Leslie G. Pablea', role: 'NHS Coordinator / Grade 10 Adviser', image: '' },
    { name: 'Mr. Joshua D. Gomez', role: 'Grade 9 Adviser', image: '' },
    { name: 'Ms. Junafe Z. Verano', role: 'Grade 8 Adviser', image: '' },
    { name: 'Mr. Adrian Poul P. Valderama', role: 'Grade 7 Adviser', image: '' },
    { name: 'Ms. Janice O. Milante', role: 'Subject Teacher', image: '' },
    { name: 'Mr. Marlon D. Macaraeg', role: 'Subject Teacher', image: '' },
    { name: 'Ms. Roselyn P. Espuerta', role: 'Subject Teacher', image: '' },
    { name: 'Mr. Kervin E. David', role: 'Subject Teacher', image: '' },
  ];

  // Data for Admin & Support
  const adminSupport = [
    { name: 'Ms. Julie Ann Mandeloso', role: 'School Cashier', image: '' },
    { name: 'Ms. Kaye Z. Trilles', role: 'Registrar', image: '' },
    { name: 'Ms. Aziel Anne L. Gonzales', role: 'Administrative Asst.', image: '' },
    { name: 'Mr. Leonardo O. Tagal Jr.', role: 'School Guard', image: '' },
    { name: 'Mr. Edwin V. Iniego', role: 'School Service Driver', image: '' },
    { name: 'Mr. Patrick A. Pentinio', role: 'School Service Driver', image: '' },
    { name: 'Mr. Hernando B. Tabago', role: 'Maintenance', image: '' },
    { name: 'Mr. Randy P. Miranda', role: 'Support Staff', image: '' },
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
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
              >
                <div className="h-72 overflow-hidden relative bg-gray-100 flex items-center justify-center">
                  {teacher.image ? (
                    <img 
                      src={teacher.image} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
                    />
                  ) : (
                    <i className="fa-solid fa-user text-6xl text-gray-300 transition-transform duration-700 group-hover:scale-110"></i>
                  )}
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
              <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-100 flex items-center justify-center">
                 {staff.image ? (
                   <img 
                     src={staff.image} 
                     alt={staff.name} 
                     className="w-full h-full object-cover"
                   />
                 ) : (
                   <i className="fa-solid fa-user text-3xl text-gray-300"></i>
                 )}
              </div>
              <div className="ml-5">
                 <h5 className="font-bold text-gray-900 text-base leading-tight">{staff.name}</h5>
                 <p className="text-[#E11D48] text-xs font-bold uppercase tracking-wider mt-1">{staff.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;