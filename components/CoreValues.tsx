import React from 'react';

const values = [
  {
    num: '01',
    icon: 'fa-heart',
    title: 'Love',
    desc: 'Knowing the boundless love of God, loving Him with all our heart, and actively sharing that love with one another.',
    color: 'bg-rose-50 text-[#E11D48]'
  },
  {
    num: '02',
    icon: 'fa-hand-holding-heart',
    title: 'Serve',
    desc: 'Serving God faithfully and dedicating our lives to humble, compassionate, and active service towards our neighbors.',
    color: 'bg-rose-50 text-[#E11D48]'
  },
  {
    num: '03',
    icon: 'fa-cross',
    title: 'Lordship & New Life',
    desc: 'Welcoming Jesus Christ as the absolute Lord of our lives and walking daily in faithful obedience to His Word.',
    color: 'bg-rose-50 text-[#E11D48]'
  },
  {
    num: '04',
    icon: 'fa-dove',
    title: 'Pure Heart',
    desc: 'Living with a clean conscience, walking in complete integrity, and being honest before both God and people.',
    color: 'bg-rose-50 text-[#E11D48]'
  },
  {
    num: '05',
    icon: 'fa-globe',
    title: 'All Nations',
    desc: 'Nurturing global leaders and workers who love and serve the Philippines, spreading faith and hope to all nations.',
    color: 'bg-rose-50 text-[#E11D48]'
  }
];

const CoreValues: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-gray-50 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: School Identity Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
            {/* Subtle decorative background gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50/50 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
            
            <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-rose-50/40 p-3 sm:p-4 rounded-full flex items-center justify-center mb-6 md:mb-8 transition-transform duration-500 hover:scale-105">
              <img 
                src="/logo.png" 
                alt="LSCSI Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="relative z-10">
              <span className="text-[#E11D48] font-black tracking-[0.2em] uppercase text-xs mb-2 sm:mb-3 block">Our Mission Pillar</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4 md:mb-6 leading-tight">Our Core Values</h3>
              <div className="w-16 h-1.5 bg-[#E11D48] mx-auto mb-4 md:mb-6 rounded-full"></div>
              <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                LSCSI is built upon five foundational core values that shape our character, guide our community, and prepare our students to become outstanding Christian leaders for the nation and the world.
              </p>
            </div>
          </div>
          
          {/* Right Column: Core Values List */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {values.map((val, idx) => (
              <div 
                key={idx} 
                className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(225,29,72,0.08)] border border-gray-50 hover:border-rose-100/80 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-6 group"
              >
                {/* Number & Icon Container */}
                <div className="flex items-center space-x-4 shrink-0">
                  <span className="text-xs sm:text-sm font-black tracking-widest text-[#E11D48]/30 group-hover:text-[#E11D48]/60 transition-colors duration-300">
                    {val.num}
                  </span>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${val.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-sm`}>
                    <i className={`fa-solid ${val.icon} text-lg md:text-2xl`}></i>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-lg md:text-2xl font-black text-gray-900 mb-1 sm:mb-2 transition-colors duration-300 group-hover:text-[#E11D48]">
                    {val.title}
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
