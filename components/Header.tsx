import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

interface NavGroup {
  label: string;
  items?: { label: string; page: Page }[];
  page?: Page;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [logoError, setLogoError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems: NavGroup[] = [
    { label: 'Home', page: 'Home' },
    { 
      label: 'About', 
      items: [
        { label: 'About Us', page: 'About' },
        { label: 'Our Team', page: 'Team' }
      ]
    },
    { 
      label: 'Campus Life', 
      items: [
        { label: 'Academics', page: 'Academics' },
        { label: 'Facilities', page: 'Facilities' },
        { label: 'Gallery', page: 'Gallery' },
        { label: 'School Calendar', page: 'Calendar' }
      ]
    },
    { label: 'Admissions', page: 'Admissions' },
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-500 ease-in-out ${
      isScrolled ? 'shadow-md border-b border-gray-100' : 'border-b border-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3.5 sm:py-4">
        {/* Logo and Name */}
        <div className="flex items-center space-x-3 sm:space-x-4 cursor-pointer group" onClick={() => onPageChange('Home')}>
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-in-out transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="LSCSI Logo" 
                className="w-full h-full object-contain filter drop-shadow-sm transform-gpu antialiased [backface-visibility:hidden]"
                onError={() => setLogoError(true)}
              />
            ) : (
              <i className="fa-solid fa-cross text-[#E11D48] text-xl sm:text-2xl transform-gpu antialiased"></i>
            )}
          </div>
          <div className="transform-gpu antialiased">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#E11D48] leading-none tracking-tight">LSCSI</h1>
            <p className="hidden md:block text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Love and Serve Christian School Inc.</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-8 items-center">
          {navItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {item.items ? (
                <div className="py-2 cursor-pointer relative flex items-center space-x-1.5 focus:outline-none">
                  <span className={`text-base font-bold transition-all ${
                    item.items.some(subItem => subItem.page === currentPage) ? 'text-[#E11D48]' : 'text-gray-500 hover:text-gray-800'
                  }`}>
                    {item.label}
                  </span>
                  <i className="fa-solid fa-chevron-down text-[10px] text-gray-400 group-hover:text-gray-600 transition-transform group-hover:-rotate-180 duration-300"></i>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-[100%] mt-1 -left-4 min-w-[240px] bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 z-50 overflow-hidden">
                    <div className="py-2">
                       {item.items.map(subItem => (
                         <button
                           key={subItem.page}
                           onClick={() => onPageChange(subItem.page)}
                           className={`w-full text-left px-5 py-3 font-semibold transition-colors flex items-center group/item ${
                             currentPage === subItem.page 
                               ? 'bg-red-50 text-[#E11D48]' 
                               : 'text-gray-600 hover:bg-gray-50 hover:text-[#E11D48]'
                           }`}
                         >
                           <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors ${currentPage === subItem.page ? 'bg-[#E11D48]' : 'bg-transparent group-hover/item:bg-red-300'}`}></div>
                           {subItem.label}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => item.page && onPageChange(item.page)}
                  className={`text-base font-bold py-2 transition-all ${
                    currentPage === item.page 
                    ? 'text-[#E11D48]' 
                    : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onPageChange('Contact')}
            className="hidden sm:block bg-[#E11D48] text-white px-9 py-3 rounded-2xl font-black hover:bg-rose-500 transition transform shadow-lg hover:shadow-xl active:scale-95 text-base"
          >
            Contact Us
          </button>
          <button 
            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-[#E11D48] text-xl transition-colors hover:bg-red-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark scale-110' : 'fa-bars'} transition-transform duration-300`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[calc(100vh-100px)] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 flex flex-col space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
          {navItems.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              {item.items ? (
                <div className="mb-2">
                  <div className="py-2 text-xs font-black text-gray-400 uppercase tracking-widest pl-2">
                    {item.label}
                  </div>
                  <div className="flex flex-col space-y-1 pl-4 border-l-2 border-red-100 ml-2 mt-2">
                    {item.items.map(subItem => (
                      <button
                        key={subItem.page}
                        onClick={() => {
                          onPageChange(subItem.page);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left font-bold text-lg py-2.5 px-3 rounded-lg transition-colors ${
                          currentPage === subItem.page 
                            ? 'bg-red-50 text-[#E11D48]' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (item.page) onPageChange(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-bold text-xl py-3 px-2 transition-colors ${
                    currentPage === item.page ? 'text-[#E11D48]' : 'text-gray-900 hover:text-[#E11D48]'
                  }`}
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
          <div className="pt-6 mt-4 border-t border-gray-100 pb-4">
            <button 
              onClick={() => {
                onPageChange('Contact');
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-[#E11D48] text-white px-6 py-3 rounded-xl font-black shadow-lg uppercase tracking-widest text-sm"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;