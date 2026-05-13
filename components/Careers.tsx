import React from 'react';

const Careers: React.FC = () => {
  const positions = [
    { title: 'Math Major Teacher', icon: 'fa-calculator' },
    { title: 'Science Major Teacher', icon: 'fa-microscope' },
    { title: 'Filipino Major Teacher', icon: 'fa-book-open' },
    { title: 'T.L.E. Major Teacher', icon: 'fa-screwdriver-wrench' },
  ];

  return (
    <div id="careers" className="animate-fadeIn min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-red-50 py-24 px-6 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-100 rounded-full -ml-24 -mb-24 opacity-50"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[#E11D48] font-bold tracking-widest uppercase text-sm mb-4 inline-block bg-white px-4 py-1 rounded-full shadow-sm">
            Join Our Team
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Join Our LSCSI Family!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We are hiring dedicated teachers to nurture the next generation. Be part of our mission.
          </p>
        </div>
      </section>

      {/* Current Opportunities (Grid) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900 uppercase">
            HIRING TEACHERS: Current Openings
          </h2>
          <div className="w-20 h-1.5 bg-[#E11D48] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {positions.map((job, idx) => (
            <div 
              key={idx} 
              className="group bg-white p-10 rounded-[2rem] shadow-lg border border-gray-100 hover:border-[#E11D48] transition-all duration-300 hover:-translate-y-2 text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-slate-50 text-[#E11D48] rounded-full flex items-center justify-center mb-8 text-4xl group-hover:scale-110 group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-300 shadow-sm">
                <i className={`fa-solid ${job.icon}`}></i>
              </div>
              <h3 className="text-xl font-extrabold text-gray-800 group-hover:text-[#E11D48] transition-colors">
                {job.title}
              </h3>
              <p className="mt-4 text-sm text-gray-400 font-bold uppercase tracking-wider">
                Full-Time Position
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Apply (Call to Action) */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden text-white shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Apply?</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Send your resume directly to us and start your journey at LSCS.
            </p>
            <a 
              href="mailto:loveandserve2014@gmail.com"
              className="inline-flex items-center justify-center bg-[#D32F2F] text-white px-6 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl shadow-[0_10px_20px_rgba(211,47,47,0.4)] hover:bg-red-600 hover:shadow-[0_15px_30px_rgba(211,47,47,0.5)] hover:-translate-y-1 transition-all duration-300 group"
            >
              Send Resume via Email <span className="ml-3 text-2xl group-hover:rotate-12 transition-transform">✉️</span>
            </a>
          </div>
          
          {/* Background Accents */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
            <div className="absolute top-[-10%] right-[-5%] w-64 h-64 rounded-full bg-[#D32F2F] blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 rounded-full bg-[#E11D48] blur-3xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;