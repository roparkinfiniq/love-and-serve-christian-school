
import React, { useState } from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'Home' },
    { label: 'About', page: 'About' },
    { label: 'Facilities', page: 'Academics' },
    { label: 'Admission', page: 'Admissions' },
    { label: 'Contact', page: 'Gallery' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3">
        {/* Logo and Name */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => onPageChange('Home')}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
            <img 
              src="https://i.ibb.co/C3X3hWd/lscsi-logo.png" 
              alt="LSCSI Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-[#9b1c31] tracking-tight">
            Love and Serve Christian School Inc.
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onPageChange(item.page)}
              className={`text-sm font-medium transition-colors duration-200 ${
                currentPage === item.page 
                ? 'text-[#9b1c31] font-bold border-b-2 border-[#9b1c31]' 
                : 'text-gray-600 hover:text-[#9b1c31]'
              } pb-1`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-[#9b1c31] text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-fadeIn">
          <div className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onPageChange(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-lg font-bold py-2 ${
                  currentPage === item.page ? 'text-[#9b1c31]' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
