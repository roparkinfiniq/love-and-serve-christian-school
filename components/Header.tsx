import React, { useState } from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'Home' },
    { label: 'About Us', page: 'About' },
    { label: 'Academics', page: 'Academics' },
    { label: 'Admissions', page: 'Admissions' },
    { label: 'Gallery', page: 'Gallery' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
        {/* Logo and Name */}
        <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => onPageChange('Home')}>
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 overflow-hidden group-hover:scale-105 group-hover:shadow-md transition-all duration-500">
            {!logoError ? (
              <img 
                src="logo.png" 
                alt="LSCSI Logo" 
                className="w-[85%] h-[85%] object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <i className="fa-solid fa-cross text-[#E11D48] text-2xl"></i>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#E11D48] leading-none tracking-tight">LSCS</h1>
            <p className="hidden md:block text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Love and Serve Christian School</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-12">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => onPageChange(item.page)}
              className={`text-base font-bold transition-all py-1 border-b-2 ${
                currentPage === item.page 
                ? 'text-[#E11D48] border-[#E11D48]' 
                : 'text-gray-500 border-transparent hover:text-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-4">
          <button 
            className="hidden sm:block bg-[#E11D48] text-white px-9 py-3 rounded-2xl font-black hover:bg-red-700 transition transform shadow-lg active:scale-95 text-base"
          >
            Contact Us
          </button>
          <button 
            className="lg:hidden text-[#E11D48] text-3xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-50 p-8 flex flex-col space-y-6 animate-fadeIn">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => {
                onPageChange(item.page);
                setMobileMenuOpen(false);
              }}
              className={`text-left font-bold text-lg py-2 ${currentPage === item.page ? 'text-[#E11D48]' : 'text-gray-500'}`}
            >
              {item.label}
            </button>
          ))}
          <button 
            className="bg-[#E11D48] text-white px-6 py-5 rounded-2xl font-black shadow-lg uppercase tracking-widest text-sm"
          >
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;