import React from 'react';

const VisionMissionPhilosophy: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Vision & Mission Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-rose-50/20 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-[#E11D48] font-bold tracking-widest uppercase text-xs sm:text-sm bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 shadow-xs inline-block">
              Core Principles
            </span>
            <h2 className="text-2.5xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 sm:mt-4 tracking-tight">
              Vision & Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Vision Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-700 ease-in-out relative group overflow-hidden text-left transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-rose-100/50 rounded-bl-full -z-0 transition-transform duration-700 ease-in-out group-hover:scale-110 transform-gpu"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-rose-100 text-[#E11D48] flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-xs group-hover:scale-110 group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-700 ease-in-out transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
                  <i className="fa-solid fa-compass transform-gpu antialiased"></i>
                </div>
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#E11D48] mb-1 block">Our Future Direction</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2.5 sm:mb-4">VISION</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                  LSCSI aims to be a competent Christian School in academic and non-academic matters, producing well-rounded citizens and God-fearing individuals.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-700 ease-in-out relative group overflow-hidden text-left transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-rose-100/50 rounded-bl-full -z-0 transition-transform duration-700 ease-in-out group-hover:scale-110 transform-gpu"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-rose-100 text-[#E11D48] flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-xs group-hover:scale-110 group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-700 ease-in-out transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
                  <i className="fa-solid fa-hand-holding-heart transform-gpu antialiased"></i>
                </div>
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#E11D48] mb-1 block">Our Daily Calling</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2.5 sm:mb-4">MISSION</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                  LSCSI is committed to train children to love and serve God and others, develop, nurture, and enhance their potentials to be fully equipped in the service and calling that God entrusted them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            {/* Left Column: Content */}
            <div className="w-full md:w-2/3 text-left">
              <div className="w-12 sm:w-16 h-1.5 bg-[#E11D48] rounded-full mb-4 sm:mb-6"></div>
              <span className="text-[#E11D48] font-bold tracking-widest uppercase text-xs sm:text-sm">Educational Foundation</span>
              <h2 className="text-2.5xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6 sm:mb-8 tracking-tight">
                Our Philosophy
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    icon: "fa-cross",
                    title: "Faith in God & Scripture",
                    desc: "We believe in God, the Creator, Holy, and Love. We believe in the Holy Trinity and the divine authority of the Bible."
                  },
                  {
                    icon: "fa-hands-praying",
                    title: "Man's Divine Purpose",
                    desc: "We believe that man is God's special creation with a purpose to nurture the world by restoring relationship with God, loving and serving Him and others."
                  },
                  {
                    icon: "fa-graduation-cap",
                    title: "Holistic Student Excellence",
                    desc: "The school is dedicated to help pupils excel academically, develop Christian values and patriotism, enhance talents, and build self-esteem."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 sm:gap-5 p-4.5 sm:p-6 rounded-2xl bg-gray-50/70 border border-gray-100 hover:bg-rose-50/50 hover:border-rose-200/80 hover:-translate-y-1 hover:shadow-md transition-all duration-700 ease-in-out group transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#E11D48] shadow-xs border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-700 ease-in-out text-lg sm:text-xl transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
                      <i className={`fa-solid ${item.icon} transform-gpu antialiased`}></i>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Decorative Badge */}
            <div className="w-full md:w-1/3 flex justify-center mt-4 md:mt-0">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-rose-100 via-rose-50 to-white p-6 sm:p-8 flex flex-col items-center justify-center text-center border border-rose-100 shadow-lg group transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#E11D48] text-white flex items-center justify-center text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 shadow-md group-hover:scale-110 transition-transform duration-700 ease-in-out transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
                  <i className="fa-solid fa-seedling transform-gpu antialiased"></i>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-gray-900">Christ-Centered</h4>
                <p className="text-[11px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Foundation for Life</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMissionPhilosophy;
