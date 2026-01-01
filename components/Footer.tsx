
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#801b2a] text-white pt-10 pb-4">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/20 pb-8 mb-4">
          <div className="mb-6 md:mb-0">
            <p className="text-sm font-bold tracking-tight">
              Copyright © 2026 Love and Serve Christian School Inc.
            </p>
          </div>
          
          <div className="flex space-x-6 text-xl">
            <a href="#" className="hover:text-red-200 transition-colors"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="hover:text-red-200 transition-colors"><i className="fa-brands fa-google"></i></a>
            <a href="#" className="hover:text-red-200 transition-colors"><i className="fa-solid fa-phone"></i></a>
          </div>
        </div>
        
        <div className="text-center text-[10px] opacity-60 uppercase tracking-widest">
          Nurturing Hearts, Inspiring Minds
        </div>
      </div>
    </footer>
  );
};

export default Footer;
