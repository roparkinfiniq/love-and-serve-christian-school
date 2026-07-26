import React from 'react';
import { Page } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="bg-white py-12 md:py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Main Title & Text - Order 2 on Mobile, Order 1 on Desktop */}
        <div className="animate-fadeIn order-2 lg:order-1">
          {/* Welcome Badge */}
          <span className="inline-block bg-red-50 text-[#E11D48] px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest mb-4 md:mb-8">
            WELCOME TO LSCSI
          </span>
          
          {/* Main Title - Darker Gray for "Home for" */}
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight text-slate-800">
            "Home for <br/>
            <span className="text-[#E11D48]">Holistic Excellence"</span>
          </h2>
          
          {/* Description */}
          <p className="text-slate-500 text-sm sm:text-base md:text-xl mt-6 md:mt-10 leading-relaxed max-w-2xl font-medium">
            At LSCSI, we are committed to providing a Christ-centered education that nurtures wisdom, character, and excellence. Through quality education and a supportive community, we empower students to live with purpose, lead with confidence, and shine as a light to others. Be part of the LSCSI family and experience a meaningful journey of learning.
          </p>
          
          {/* Re-designed Dual Buttons */}
          <div className="flex flex-col sm:flex-row mt-8 md:mt-14 space-y-3 sm:space-y-0 sm:space-x-6 items-center sm:items-stretch">
            {/* Primary CTA: Enroll Now - Updated Hover Effect to be Brighter */}
            <button 
              onClick={() => onNavigate('Admissions')}
              className="w-full sm:w-auto bg-[#E11D48] hover:bg-[#ff4f70] text-white px-6 py-3.5 md:px-12 md:py-6 rounded-2xl font-black text-base md:text-xl transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(225,29,72,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(225,29,72,0.6)] hover:-translate-y-1 active:scale-95 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
            >
              Enroll Now
            </button>
            
            {/* Secondary CTA: Virtual Tour - Added Lift and Shadow to match Enroll Now */}
            <button 
              onClick={() => onNavigate('Facilities')}
              className="w-full sm:w-auto group flex items-center justify-center border-2 border-slate-200 text-slate-600 bg-white px-6 py-3.5 md:px-12 md:py-6 rounded-2xl font-black text-base md:text-xl transition-all duration-300 hover:border-[#E11D48] hover:text-[#E11D48] hover:bg-rose-50 shadow-[0_10px_30px_-10px_rgba(148,163,184,0.1)] hover:shadow-[0_15px_40px_-10px_rgba(225,29,72,0.2)] hover:-translate-y-1 active:scale-95 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
            >
              <i className="fa-solid fa-camera-rotate mr-3 text-slate-400 group-hover:text-[#E11D48] transition-colors duration-300"></i>
              <span>Virtual Tour</span>
            </button>
          </div>
        </div>
        
        {/* Right Side Visual Group - Order 1 on Mobile, Order 2 on Desktop */}
        <div className="relative group lg:ml-10 order-1 lg:order-2">
          <div className="w-full h-[280px] sm:h-[400px] md:h-[600px] bg-gray-100 rounded-[2.5rem] md:rounded-[5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-4 border-white transform transition-all duration-700 group-hover:rotate-1 transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
            <img 
              src="/img/Home-main.png" 
              alt="Students" 
              className="w-full h-full object-cover"
              style={{ objectPosition: '65% 50%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
          </div>
          
          {/* Floating Message Badge */}
          <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-yellow-400 p-4 sm:p-8 rounded-2xl sm:rounded-[2.5rem] shadow-2xl transform -rotate-3 transition-transform group-hover:rotate-0 group-hover:scale-110 duration-500 transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
            <p className="text-black font-black text-lg sm:text-2xl italic tracking-tight">"God is Love"</p>
          </div>
          
          {/* Accent Decoration */}
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-red-50 rounded-full -z-10 animate-pulse opacity-40"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;