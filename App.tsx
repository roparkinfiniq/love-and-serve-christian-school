
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CoreValues from './components/CoreValues';
import Programs from './components/Programs';
import Footer from './components/Footer';
import AICounselor from './components/AICounselor';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');

  const renderContent = () => {
    switch (currentPage) {
      case 'Home':
        return (
          <>
            <Hero />
            <CoreValues />
            <Programs />
            <section className="py-24 bg-white px-6">
              <div className="max-w-7xl mx-auto bg-red-50 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black mb-6">Start Your Child's <br/>Faith Journey Today</h2>
                  <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
                    Join a community that values character as much as academics. 
                    Applications for the next school year are now open!
                  </p>
                  <button onClick={() => setCurrentPage('Admissions')} className="bg-[#E11D48] text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-lg hover:scale-105 transition transform">
                    Apply for Admission
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-200/50 rounded-full -ml-24 -mb-24"></div>
              </div>
            </section>
          </>
        );
      case 'About':
        return (
          <div className="animate-fadeIn pb-0">
            {/* History Section - Logo Left, Text Right */}
            <section className="py-24 px-6 bg-white">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center">
                    <img 
                      src="https://i.ibb.co/C3X3hWd/lscsi-logo.png" 
                      alt="LSCSI School Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="w-16 h-1 bg-[#b02a48] mb-4"></div>
                  <h2 className="text-4xl font-black mb-8 text-gray-800 tracking-tight uppercase">History</h2>
                  <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                    <p>
                      <span className="font-bold">LSCSI</span> is a product of earnest prayers and <span className="font-bold">God</span>'s provisions. Under the organization Love and Serve All Nations International Inc. (<span className="font-bold text-gray-800">LASANII</span>) inclined with its 5 missions comes a new rising Christian school located in Antipolo Rizal. Established in the year 2014 as an evidence of <span className="font-bold text-gray-800">God</span>'s perpetual Grace in preparation towards the next generations as the future worshipers of <span className="font-bold text-gray-800">God</span> prepared spiritually and academically.
                    </p>
                    <p>
                      <span className="font-bold">LSCSI</span> envisions that the child's excellence and maximum potential can only be developed by teaching Christianly through Concrete Biblical Worldview along with <span className="font-bold text-gray-800">God</span>-fearing Teachers, Parent-Teacher Collaboration and <span className="font-bold text-gray-800">God</span>'s help for the service of <span className="font-bold text-gray-800">God</span> and men.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Vision Section - Text Left, Image Right */}
            <section className="py-24 px-6 bg-white">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                  <div className="w-16 h-1 bg-[#b02a48] mb-4"></div>
                  <h2 className="text-4xl font-black mb-8 text-gray-800 tracking-tight uppercase">Vision</h2>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                    <span className="font-bold">LSCSI</span> aimed to be a competent Christian School in academic and non-academic matters, producing well-rounded citizens and God-fearing individuals.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                    {/* Illustration mimicking the Vision image in screenshot */}
                    <div className="text-[#9b1c31] text-center">
                      <i className="fa-solid fa-sun text-4xl mb-2 text-yellow-400"></i>
                      <div className="relative">
                        <i className="fa-solid fa-cross text-6xl mb-2"></i>
                        <i className="fa-solid fa-book-open text-8xl absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 opacity-30"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mission Section - Image Left, Text Right */}
            <section className="py-24 px-6 bg-white">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
                <div className="w-full md:w-1/2">
                  <div className="w-16 h-1 bg-[#b02a48] mb-4"></div>
                  <h2 className="text-4xl font-black mb-8 text-gray-800 tracking-tight uppercase">Mission</h2>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                    <span className="font-bold">LSCSI</span> is committed to train children to love and serve <span className="font-bold">God</span> and others, develop, nurture, and enhance their potentials to be fully equipped in the service and calling that <span className="font-bold">God</span> entrusted them.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                    {/* Illustration mimicking the Mission image in screenshot */}
                    <div className="relative flex items-center justify-center">
                      <i className="fa-solid fa-heart text-9xl text-pink-200"></i>
                      <i className="fa-solid fa-cross text-4xl text-[#9b1c31] absolute"></i>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Philosophy Section - Text Left, Image Right */}
            <section className="py-24 px-6 bg-white">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                  <div className="w-16 h-1 bg-[#b02a48] mb-4"></div>
                  <h2 className="text-4xl font-black mb-8 text-gray-800 tracking-tight uppercase">Philosophy</h2>
                  <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                    <p>1. We believe in God, the Creator, Holy, and Love. We believe in the Holy Trinity and the Bible.</p>
                    <p>2. We believe that man is God's special creation and was created with a purpose to nurture the world through restoring his relationship with God by means of loving and serving Him and others.</p>
                    <p>3. The school is dedicated to help pupils to be excellent in their academic skills, develop Christian values and patriotism, enhance their talents and gifts, and build up their self-esteem.</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                    {/* Illustration mimicking the Philosophy image in screenshot */}
                    <div className="text-purple-300 relative">
                       <i className="fa-solid fa-head-side-virus text-9xl"></i>
                       <i className="fa-solid fa-seedling text-4xl text-green-400 absolute top-1/4 left-1/2 -translate-x-1/2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Meet our LSCSI' Faculty and Staffs Section */}
            <section className="pt-24 pb-0 bg-white">
               {/* Grey Banner Background */}
               <div className="bg-[#cacaca] py-16 px-6">
                  <div className="max-w-4xl mx-auto bg-[#c5c5c5] p-12 md:p-16 text-center border-t border-b border-gray-400">
                    <h3 className="text-4xl md:text-6xl font-bold text-gray-700 mb-8 uppercase tracking-tighter">
                      Meet our LSCSI' <br/>
                      FACULTY AND STAFFS
                    </h3>
                    <button className="bg-[#801b2a] text-white px-12 py-3 rounded-full font-black text-xl uppercase shadow-xl hover:scale-110 transition transform active:scale-95 border border-black">
                      CLICK HERE!
                    </button>
                  </div>
               </div>
            </section>
          </div>
        );
      case 'Academics':
        return (
          <section className="py-20 px-6 max-w-7xl mx-auto animate-fadeIn">
            <h2 className="text-4xl font-extrabold mb-8 text-[#E11D48] uppercase tracking-tighter">Academics</h2>
            <Programs />
            <div className="mt-12 bg-gray-50 p-10 rounded-[3rem] border-2 border-dashed border-gray-200">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-wide">Extracurricular Activities</h3>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Music & Arts', 'Sports Varsity', 'Bible Study', 'Robotics Club', 'Debate Society', 'Volunteerism', 'Dance Troupe', 'Choir'].map(item => (
                  <li key={item} className="flex items-center text-gray-700 font-bold">
                    <i className="fa-solid fa-star text-yellow-400 mr-3"></i> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      case 'Admissions':
        return (
          <section className="py-20 px-6 max-w-4xl mx-auto animate-fadeIn">
            <h2 className="text-4xl font-extrabold mb-10 text-[#E11D48] uppercase tracking-tighter text-center">Admissions</h2>
            <div className="space-y-12 text-gray-700">
              <div className="flex space-x-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-[#E11D48] text-white rounded-3xl flex items-center justify-center font-black text-2xl shadow-lg">1</div>
                <div>
                  <h3 className="text-2xl font-black mb-2 uppercase">Inquiry & Tour</h3>
                  <p className="text-lg">Visit our campus or book a virtual tour to see our facilities and meet our warm staff.</p>
                </div>
              </div>
              <div className="flex space-x-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-[#E11D48] text-white rounded-3xl flex items-center justify-center font-black text-2xl shadow-lg">2</div>
                <div>
                  <h3 className="text-2xl font-black mb-2 uppercase">Application Submission</h3>
                  <p className="text-lg">Submit the necessary documents and the application form through our simple online portal.</p>
                </div>
              </div>
              <div className="flex space-x-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-[#E11D48] text-white rounded-3xl flex items-center justify-center font-black text-2xl shadow-lg">3</div>
                <div>
                  <h3 className="text-2xl font-black mb-2 uppercase">Assessment & Interview</h3>
                  <p className="text-lg">Student assessment and parent interview to ensure a beautiful fit for our Christian community.</p>
                </div>
              </div>
            </div>
            <div className="mt-16 text-center">
              <button className="bg-[#E11D48] text-white px-12 py-5 rounded-full font-black text-xl uppercase shadow-2xl hover:scale-105 transition transform">Start Application Now</button>
            </div>
          </section>
        );
      case 'Gallery':
        return (
          <section className="py-20 px-6 max-w-7xl mx-auto animate-fadeIn">
            <h2 className="text-4xl font-extrabold mb-10 text-[#E11D48] uppercase tracking-tighter">School Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="group aspect-square bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer relative">
                  <img src={`https://picsum.photos/seed/${i + 50}/800/800`} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i className="fa-solid fa-magnifying-glass-plus text-white text-3xl"></i>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-red-100 selection:text-[#E11D48]">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer />
      <AICounselor />
    </div>
  );
};

export default App;
