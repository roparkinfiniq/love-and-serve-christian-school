import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="animate-fadeIn">
          {/* Welcome Badge */}
          <span className="inline-block bg-red-50 text-[#E11D48] px-5 py-2 rounded-full text-sm md:text-base font-bold uppercase tracking-widest mb-8">
            Welcome to LSCS
          </span>
          
          {/* Main Title - Darker Gray for "Nurturing Hearts" */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight text-slate-800">
            Nurturing Hearts, <br/>
            <span className="text-[#E11D48]">Inspiring Minds</span>
          </h2>
          
          {/* Description */}
          <p className="text-slate-500 text-xl md:text-2xl mt-10 leading-relaxed max-w-xl font-medium">
            Providing a Christ-centered education where students grow in wisdom, 
            love, and service. Join our family and start a bright journey today!
          </p>
          
          {/* Re-designed Dual Buttons */}
          <div className="flex flex-col sm:flex-row mt-14 space-y-5 sm:space-y-0 sm:space-x-6 items-center sm:items-stretch">
            {/* Primary CTA: Enroll Now */}
            <button className="group relative bg-[#E11D48] text-white px-12 py-6 rounded-2xl font-black text-xl transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(225,29,72,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(225,29,72,0.6)] hover:-translate-y-1 active:scale-95 overflow-hidden">
              <span className="relative z-10">Enroll Now</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            
            {/* Secondary CTA: Virtual Tour (More subtle, refined) */}
            <button className="group flex items-center justify-center border-2 border-slate-200 text-slate-600 bg-white px-12 py-6 rounded-2xl font-black text-xl transition-all duration-300 hover:border-pink-300 hover:text-pink-500 hover:bg-pink-50/30 active:scale-95">
              <i className="fa-solid fa-camera-rotate mr-4 text-slate-400 group-hover:text-pink-400 transition-colors duration-300"></i>
              <span>Virtual Tour</span>
            </button>
          </div>
        </div>
        
        {/* Right Side Visual Group */}
        <div className="relative group lg:ml-10">
          <div className="w-full h-[400px] md:h-[600px] bg-gray-100 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-4 border-white transform transition-all duration-700 group-hover:rotate-1">
            <img 
              src="https://images.unsplash.com/photo-1544717297-fa95b3ee96c3?auto=format&fit=crop&w=1200&q=80" 
              alt="Students Learning" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
          </div>
          
          {/* Floating Message Badge */}
          <div className="absolute -bottom-6 -left-6 bg-yellow-400 p-8 rounded-[2.5rem] shadow-2xl transform -rotate-3 transition-transform group-hover:rotate-0 group-hover:scale-110 duration-500">
            <p className="text-white font-black text-2xl italic tracking-tight">"God is Love"</p>
          </div>
          
          {/* Accent Decoration */}
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-red-50 rounded-full -z-10 animate-pulse opacity-40"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;