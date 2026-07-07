import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onAdmissionProcessClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onAdmissionProcessClick }) => {
  return (
    <footer className="bg-slate-900 text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <img 
              src="/logo.png" 
              alt="LSCS Logo" 
              className="w-16 h-16 object-contain"
            />
            <h4 className="text-3xl font-black">LSCS</h4>
          </div>
          <p className="text-gray-400 leading-relaxed text-base md:text-lg">
            Love and Serve Christian School<br />
            Philippines<br /><br />
            "Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength. Then Love your neighbor as yourself."<br />
            <span className="text-[#E11D48] font-bold italic">- Mark 12: 30-31</span>
          </p>
        </div>
        
        <div>
          <h4 className="text-xl font-bold mb-10 uppercase tracking-widest text-[#E11D48]">Quick Links</h4>
          <ul className="space-y-5 text-gray-400 font-medium text-lg">
            <li>
              <button 
                onClick={() => onAdmissionProcessClick ? onAdmissionProcessClick() : onNavigate('Admissions')} 
                className="hover:text-white transition-colors duration-200 text-left"
              >
                Admission Process
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('Calendar')} 
                className="hover:text-white transition-colors duration-200 text-left"
              >
                School Calendar
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('Team')} 
                className="hover:text-white transition-colors duration-200 text-left"
              >
                Faculty & Staff
              </button>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-bold mb-10 uppercase tracking-widest text-[#E11D48]">Connect With Us</h4>
          <div className="flex space-x-8 text-3xl mb-10">
            <a href="https://www.facebook.com/LSCSI" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E11D48] transition-colors"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-[#E11D48] transition-colors"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.youtube.com/@loveandservechristianschoolinc/featured" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E11D48] transition-colors"><i className="fa-brands fa-youtube"></i></a>
          </div>
          <div className="space-y-3 text-base md:text-lg text-gray-400">
            <p className="flex items-start"><i className="fa-solid fa-phone mt-1 mr-4 text-[#E11D48]"></i>
              <span>
                +63999-982-1836 / 0917-710-7075<br/>
                (02) 7004-8359
              </span>
            </p>
            <p className="flex items-center"><i className="fa-solid fa-envelope mr-4 text-[#E11D48]"></i> loveandserve2014@gmail.com</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm md:text-base">
        <span>© {new Date().getFullYear()} Love and Serve Christian School. All Rights Reserved. Crafted with Faith.</span>
        <button onClick={() => window.location.href = '/admin'} className="mt-4 md:mt-0 text-gray-700 hover:text-gray-400 transition-colors">
          Admin Portal
        </button>
      </div>
    </footer>
  );
};

export default Footer;