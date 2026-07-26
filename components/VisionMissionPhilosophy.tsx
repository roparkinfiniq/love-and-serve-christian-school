import React from 'react';

const VisionMissionPhilosophy: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Vision & Mission Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-rose-50/20 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#E11D48] font-bold tracking-widest uppercase text-xs sm:text-sm bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 shadow-sm inline-block">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-4 tracking-tight">
              Vision & Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 ease-in-out relative group overflow-hidden text-left transform-gpu will-change-transform">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/50 rounded-bl-full -z-0 transition-transform duration-700 ease-in-out group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 text-[#E11D48] flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-700 ease-in-out">
                  <i className="fa-solid fa-compass"></i>
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-[#E11D48] mb-1 block">Our Future Direction</span>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">VISION</h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  LSCSI aims to be a competent Christian School in academic and non-academic matters, producing well-rounded citizens and God-fearing individuals.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 ease-in-out relative group overflow-hidden text-left transform-gpu will-change-transform">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/50 rounded-bl-full -z-0 transition-transform duration-700 ease-in-out group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 text-[#E11D48] flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-700 ease-in-out">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-[#E11D48] mb-1 block">Our Daily Calling</span>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">MISSION</h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  LSCSI is committed to train children to love and serve God and others, develop, nurture, and enhance their potentials to be fully equipped in the service and calling that God entrusted them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 sm:px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column: Content */}
            <div className="w-full md:w-2/3 text-left">
              <div className="w-16 h-1.5 bg-[#E11D48] rounded-full mb-6"></div>
              <span className="text-[#E11D48] font-bold tracking-widest uppercase text-xs sm:text-sm">Educational Foundation</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-8 tracking-tight">
                Our Philosophy
              </h2>
              
              <div className="space-y-6">
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
                  <div key={idx} className="flex items-start gap-5 p-6 rounded-2xl bg-gray-50/70 border border-gray-100 hover:bg-rose-50/50 hover:border-rose-200/80 hover:-translate-y-1 hover:shadow-md transition-all duration-700 ease-in-out group transform-gpu will-change-transform">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#E11D48] shadow-sm border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-700 ease-in-out text-xl">
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Decorative Badge */}
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-rose-100 via-rose-50 to-white p-8 flex flex-col items-center justify-center text-center border border-rose-100 shadow-xl group">
                <div className="w-24 h-24 rounded-full bg-[#E11D48] text-white flex items-center justify-center text-5xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-700 ease-out">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <h4 className="text-xl font-black text-gray-900">Christ-Centered</h4>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Foundation for Life</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMissionPhilosophy;
