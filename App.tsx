import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CoreValues from './components/CoreValues';
import Programs from './components/Programs';
import LatestNews from './components/LatestNews';
import Footer from './components/Footer';
import AICounselor from './components/AICounselor';
import Contact from './components/Contact';
import Academics from './components/Academics';
import Admissions from './components/Admissions';
import Gallery from './components/Gallery';
import Facilities from './components/Facilities';
import Team from './components/Team';
import Careers from './components/Careers';
import Admin from './components/Admin';
import Calendar from './components/Calendar';
import PopupsOverlay from './components/PopupsOverlay';
import { Page, CalendarEvent, PopupData, GalleryImage } from './types';

const INITIAL_EVENTS: CalendarEvent[] = [
  // June 2026
  { id: 'e1', date: '2026-06-02', title: "Parent's Orientation (8:30-11:00 AM) & Dedication of Teachers", category: 'Special' },
  { id: 'e2', date: '2026-06-03', title: 'Medical Mission (Afternoon)', category: 'Special' },
  { id: 'e3', date: '2026-06-04', title: 'Medical Mission (Whole Day)', category: 'Special' },
  { id: 'e4', date: '2026-06-08', endDate: '2026-06-11', title: 'Opening Block: Start of Term 1', category: 'Academic' },
  { id: 'e5', date: '2026-06-09', title: 'Class Opening Worship', category: 'Religious' },
  { id: 'e6', date: '2026-06-10', endDate: '2026-06-11', title: "Student's Orientation", category: 'Academic' },
  { id: 'e7', date: '2026-06-12', title: 'Independence Day (Regular Holiday)', category: 'Holiday' },
  { id: 'e8', date: '2026-06-15', title: 'Start of Regular Classes for All Levels', category: 'Academic' },
  { id: 'e9', date: '2026-06-19', title: 'First Chapel Service (8:00 - 9:00 AM)', category: 'Religious' },

  // July 2026
  { id: 'e10', date: '2026-07-09', endDate: '2026-07-10', title: '1st Summative Test', category: 'Academic' },
  { id: 'e11', date: '2026-07-24', title: 'Nutrition Day', category: 'Special' },
  { id: 'e12', date: '2026-07-30', endDate: '2026-07-31', title: '2nd Summative Test', category: 'Academic' },

  // August 2026
  { id: 'e13', date: '2026-08-21', title: 'Ninoy Aquino Day (Non-Working Holiday)', category: 'Holiday' },
  { id: 'e14', date: '2026-08-26', endDate: '2026-08-28', title: 'Term 1 Examination', category: 'Academic' },
  { id: 'e15', date: '2026-08-28', title: 'Buwan ng Wika (By Classroom)', category: 'Special' },

  // September 2026
  { id: 'e16', date: '2026-09-02', endDate: '2026-09-15', title: 'End-of-Term Block', category: 'Academic' },
  { id: 'e17', date: '2026-09-11', title: "1st Parent's & Teacher's Conference & Card Giving", category: 'Academic' },
  { id: 'e18', date: '2026-09-14', endDate: '2026-09-15', title: 'Wellness Break of Learners (Tentative)', category: 'Special' },
  { id: 'e19', date: '2026-09-14', endDate: '2026-09-15', title: 'INSET (Tentative)', category: 'Special' },
  { id: 'e20', date: '2026-09-16', title: 'Start of Term 2', category: 'Academic' },
  { id: 'e21', date: '2026-09-16', title: 'Testing Window for NCAE (Grade 10)', category: 'Academic' },
  { id: 'e22', date: '2026-09-24', title: 'Field Trip', category: 'Special' },

  // October 2026
  { id: 'e23', date: '2026-10-05', endDate: '2026-10-09', title: 'NAT for Grade 10', category: 'Academic' },
  { id: 'e24', date: '2026-10-06', title: "World Teacher's Day", category: 'Special' },
  { id: 'e25', date: '2026-10-15', endDate: '2026-10-16', title: '1st Summative Test', category: 'Academic' },
  { id: 'e26', date: '2026-10-28', endDate: '2026-10-29', title: '2nd Summative Test', category: 'Academic' },
  { id: 'e27', date: '2026-10-30', title: 'UN Day/Mission Month Celebration', category: 'Special' },

  // November 2026
  { id: 'e28', date: '2026-11-02', title: "All Soul's Day (Special Non-Working Holiday)", category: 'Holiday' },
  { id: 'e29', date: '2026-11-27', title: 'Thanksgiving Celebration', category: 'Religious' },
  { id: 'e30', date: '2026-11-30', title: 'Bonifacio Day (Holiday)', category: 'Holiday' },

  // December 2026
  { id: 'e31', date: '2026-12-03', endDate: '2026-12-04', title: 'Term 2 Examination', category: 'Academic' },
  { id: 'e32', date: '2026-12-07', endDate: '2026-12-18', title: 'End-of-Term Block', category: 'Academic' },
  { id: 'e33', date: '2026-12-08', title: 'Feast of Immaculate Conception (Holiday)', category: 'Holiday' },
  { id: 'e34', date: '2026-12-16', title: 'Classroom Christmas Party', category: 'Special' },
  { id: 'e35', date: '2026-12-17', title: 'General Christmas Celebration', category: 'Special' },
  { id: 'e36', date: '2026-12-18', title: "Teacher's Christmas Celebration", category: 'Special' },
  { id: 'e37', date: '2026-12-19', endDate: '2027-01-01', title: 'Year End Break (Wellness Break)', category: 'Holiday' },

  // January 2027
  { id: 'e38', date: '2027-01-04', title: 'Start of Term 3', category: 'Academic' },
  { id: 'e39', date: '2027-01-08', title: "2nd Parent's & Teacher's Conference & Card Giving", category: 'Academic' },
  { id: 'e40', date: '2027-01-25', endDate: '2027-01-29', title: 'Bible Week Celebration', category: 'Religious' },
  { id: 'e41', date: '2027-01-28', endDate: '2027-01-29', title: '1st Summative Test', category: 'Academic' },

  // February 2027
  { id: 'e42', date: '2027-02-18', endDate: '2027-02-19', title: '2nd Summative Test', category: 'Academic' },
  { id: 'e43', date: '2027-02-25', title: 'People Power Anniversary (Regular Holiday)', category: 'Holiday' },
  { id: 'e44', date: '2027-02-27', title: 'Purity Night', category: 'Special' },

  // March 2027
  { id: 'e45', date: '2027-03-08', endDate: '2027-03-12', title: 'NAT for Grade 6', category: 'Academic' },
  { id: 'e46', date: '2027-03-09', endDate: '2027-03-11', title: 'Term 3 Exam (Moving Up & Graduating)', category: 'Academic' },
  { id: 'e47', date: '2027-03-17', endDate: '2027-03-19', title: 'Term 3 Exam (Non-Graduating)', category: 'Academic' },
  { id: 'e48', date: '2027-03-23', title: 'Academic Deliberation (Moving Up/Graduating)', category: 'Academic' },
  { id: 'e49', date: '2027-03-24', title: 'Academic Deliberation (Non-Graduating)', category: 'Academic' },
  { id: 'e50', date: '2027-03-25', title: 'Maundy Thursday (Regular Holiday)', category: 'Holiday' },
  { id: 'e51', date: '2027-03-26', title: 'Good Friday (Regular Holiday)', category: 'Holiday' },
  { id: 'e52', date: '2027-03-30', title: 'Moving Up (AM) & Recognition Day Gr 1-5 (PM)', category: 'Academic' },
  { id: 'e53', date: '2027-03-31', title: 'Recognition & Commencement Gr 6-10 (AM)', category: 'Academic' },

  // April 2027
  { id: 'e54', date: '2027-04-01', endDate: '2027-04-08', title: 'End-of-Term Block', category: 'Academic' },
  { id: 'e55', date: '2027-04-08', title: 'Final Card Distribution', category: 'Academic' }
];

const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200', alt: 'Science Lab Experiment', category: 'Academics' },
  { id: '2', src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800', alt: 'Library Study Session', category: 'Academics' },
  { id: '3', src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200', alt: 'Classroom Engagement', category: 'Academics' },
  { id: '4', src: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&q=80&w=800', alt: 'Creative Arts Class', category: 'Arts & Sports' },
  { id: '5', src: 'https://images.unsplash.com/photo-1560523160-754a9e25c68f?auto=format&fit=crop&q=80&w=1200', alt: 'Preschool Playtime', category: 'Student Life' },
  { id: '6', src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800', alt: 'Student Friendship', category: 'Student Life' },
  { id: '7', src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200', alt: 'Sports & Athletics', category: 'Arts & Sports' },
  { id: '8', src: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=800', alt: 'Teacher & Student', category: 'Academics' },
  { id: '9', src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200', alt: 'School Campus', category: 'Campus' },
];

const INITIAL_GALLERY_CATEGORIES = ['All', 'Academics', 'Student Life', 'Arts & Sports', 'Campus'];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(
    window.location.pathname === '/admin' ? 'Admin' : 'Home'
  );
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [calendarPdfUrl, setCalendarPdfUrl] = useState<string | null>(null);
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(INITIAL_GALLERY_IMAGES);
  const [galleryCategories, setGalleryCategories] = useState<string[]>(INITIAL_GALLERY_CATEGORIES);
  const [academicsTab, setAcademicsTab] = useState<'preschool' | 'elementary' | 'junior'>('preschool');
  const [scrollToTabs, setScrollToTabs] = useState(false);
  const [scrollToAdmissionProcess, setScrollToAdmissionProcess] = useState(false);
  const [scrollToContactForm, setScrollToContactForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Wrapper for standard page navigation (resets specific scroll targets)
  const handlePageChange = (page: Page) => {
    setScrollToTabs(false);
    setScrollToAdmissionProcess(false);
    setScrollToContactForm(false);
    setCurrentPage(page);
  };

  const handleProgramNavigation = (tab: 'preschool' | 'elementary' | 'junior') => {
    setAcademicsTab(tab);
    setScrollToTabs(true); // Trigger scroll in Academics component
    setScrollToAdmissionProcess(false);
    setCurrentPage('Academics');
  };

  const handleViewAllCurriculums = () => {
    setAcademicsTab('preschool');
    setScrollToTabs(true); // Scroll to tabs section
    setScrollToAdmissionProcess(false);
    setCurrentPage('Academics');
  };

  const handleAdmissionProcessNavigation = () => {
    setScrollToTabs(false);
    setScrollToAdmissionProcess(true); // Trigger scroll to admission process
    setCurrentPage('Admissions');
  };

  const handleContactFormNavigation = () => {
    setScrollToTabs(false);
    setScrollToAdmissionProcess(false);
    setScrollToContactForm(true); // Trigger scroll to contact form
    setCurrentPage('Contact');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'Home':
        return (
          <>
            <Hero onNavigate={handlePageChange} />
            <CoreValues />
            <Programs 
              onProgramClick={handleProgramNavigation} 
              onViewAll={handleViewAllCurriculums}
            />
            <LatestNews />
            <section className="py-20 md:py-28 bg-white px-4 md:px-6">
              <div className="max-w-7xl mx-auto bg-red-50 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-24 text-center relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-8 text-gray-900 leading-tight">Start Your Child's <br className="hidden sm:block" />Faith Journey Today</h2>
                  <p className="text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto text-base md:text-xl leading-relaxed">
                    Join a community that values character as much as academics. 
                    Applications for the next school year are now open!
                  </p>
                  <button onClick={() => handlePageChange('Admissions')} className="bg-[#E11D48] text-white px-6 py-3 md:px-12 md:py-5 rounded-2xl font-bold text-base md:text-2xl shadow-lg hover:scale-105 transition transform transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
                    Apply for Admission
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-red-100 rounded-full -mr-32 -mt-32 md:-mr-40 md:-mt-40"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-red-200/50 rounded-full -ml-24 -mb-24 md:-ml-32 md:-mb-32"></div>
              </div>
            </section>
          </>
        );
      case 'About':
        return (
          <div className="animate-fadeIn">
            {/* Principal's Welcome Section */}
            <section className="py-24 px-6 bg-white border-b border-gray-50">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Left Column: Portrait - Mobile: First, Desktop: First (Order 1) */}
                <div className="relative md:order-1">
                  <div className="aspect-[3/4] md:aspect-square bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                      alt="Principal" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-red-50 rounded-full -z-0"></div>
                  <div className="absolute -top-8 -left-8 w-32 h-32 border-4 border-red-50 rounded-full -z-0"></div>
                </div>

                {/* Right Column: Message - Mobile: Second, Desktop: Second (Order 2) */}
                <div className="md:order-2">
                  <span className="inline-block text-[#E11D48] font-bold tracking-[0.2em] uppercase text-sm mb-6">Welcome Message</span>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                    A Message from <br/>the Principal
                  </h2>
                  <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium">
                    <p>
                      Welcome to Love and Serve Christian School. We are dedicated to raising the next generation with faith, excellence, and love. Our commitment goes beyond academic rigor; we strive to mold character and instill values that last a lifetime.
                    </p>
                    <p>
                      As we partner with parents and the community, our prayer is that every child who walks through our doors experiences the transformative love of Christ and discovers their God-given potential in a safe, nurturing environment.
                    </p>
                  </div>
                  
                  {/* Signature */}
                  <div className="mt-12">
                    {/* Placeholder image removed until a real signature is available 
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Signature_sample.svg" 
                      alt="Signature" 
                      className="h-16 opacity-50 mb-4 -ml-2"
                    /> */}
                    <div>
                      <p className="font-bold text-gray-900 text-xl">Rev. Wonjae Park</p>
                      <p className="text-[#E11D48] text-sm uppercase tracking-wider font-bold mt-1">School Principal</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* History Section - Vertical Timeline */}
            <section className="py-24 px-6 bg-white overflow-hidden">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                  <span className="text-[#E11D48] font-bold tracking-widest uppercase text-sm">Our Journey</span>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">History of LSCSI</h2>
                </div>

                <div className="relative">
                  {/* Vertical Line - Updated to Gradient Fade In/Out */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-300 to-transparent rounded-full"></div>

                  <div className="space-y-12 md:space-y-24 relative">
                    {[
                      {
                        year: "2014",
                        title: "The Beginning",
                        description: "Established in Antipolo Rizal under the organization Love and Serve All Nations International Inc. (LASANII)."
                      },
                      {
                        year: "Growth",
                        title: "Mission Expansion",
                        description: "Expanded with 5 core missions to become a rising Christian school."
                      },
                      {
                        year: "Present",
                        title: "Next Generation",
                        description: "Preparing the next generation as God-fearing leaders and future worshipers."
                      }
                    ].map((item, index) => (
                      <div key={index} className={`relative flex items-center justify-between w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                        
                        {/* Timeline Dot */}
                        <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#E11D48] border-4 border-white shadow-md z-20"></div>

                        {/* Content Card */}
                        <div className="w-full pl-24 md:pl-0 md:w-5/12">
                           <div className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group text-left transform-gpu will-change-transform antialiased [backface-visibility:hidden]`}>
                             <span className="text-[#E11D48] font-black text-3xl mb-2 block">{item.year}</span>
                             <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                             <p className="text-gray-600 leading-relaxed">{item.description}</p>
                           </div>
                        </div>

                        {/* Spacer for Desktop Zig-Zag */}
                        <div className="hidden md:block md:w-5/12"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Vision & Mission Sections - Minimalist 2-Column Grid */}
            <section className="py-24 px-6 bg-white">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                
                {/* Vision */}
                <div className="flex flex-col items-center text-center group">
                  <i className="fa-solid fa-eye text-6xl text-[#E11D48] mb-8 transition-transform duration-500 group-hover:scale-110 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"></i>
                  <h2 className="text-4xl font-black text-gray-900 uppercase mb-6 tracking-tight">Vision</h2>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-md">
                    LSCSI aimed to be a competent Christian School in academic and non-academic matters, producing well-rounded citizens and God-fearing individuals.
                  </p>
                </div>

                {/* Mission */}
                <div className="flex flex-col items-center text-center group">
                  <i className="fa-solid fa-heart text-6xl text-[#E11D48] mb-8 transition-transform duration-500 group-hover:scale-110 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"></i>
                  <h2 className="text-4xl font-black text-gray-900 uppercase mb-6 tracking-tight">Mission</h2>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-md">
                    LSCSI is committed to train children to love and serve God and others, develop, nurture, and enhance their potentials to be fully equipped in the service and calling that God entrusted them.
                  </p>
                </div>

              </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-28 bg-white px-6">
              <div className="max-w-6xl mx-auto">
                {/* Mobile: Image First (flex-col-reverse), Desktop: Text First (flex-row) */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-20">
                  <div className="w-full md:w-2/3">
                    <div className="w-20 h-1.5 bg-[#E11D48] mb-8"></div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 md:mb-10 text-gray-900 uppercase tracking-tight break-words">Philosophy</h2>
                    <div className="space-y-8">
                      {[
                        "We believe in God, the Creator, Holy, and Love. We believe in the Holy Trinity and the Bible.",
                        "We believe that man is God's special creation and was created with a purpose to nurture the world through restoring his relationship with God by means of loving and serving Him and others.",
                        "The school is dedicated to help pupils to be excellent in their academic skills, develop Christian values and patriotism, enhance their talents and gifts, and build up their self-esteem."
                      ].map((text, i) => (
                        <div key={i} className="flex gap-6 group/phil p-6 rounded-2xl hover:bg-red-50/30 transition-colors duration-500">
                          <span className="text-3xl font-black text-[#E11D48] transition-transform duration-500">{i + 1}.</span>
                          <p className="text-xl text-gray-600 leading-relaxed transition-colors duration-500 group-hover/phil:text-gray-800">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                     <div className="w-64 h-64 md:w-80 md:h-80 bg-red-50 rounded-[4rem] md:rounded-[5rem] flex items-center justify-center transform rotate-3 border-4 border-white shadow-lg transition-all duration-700 hover:rotate-0 hover:scale-102 transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
                        <i className="fa-solid fa-seedling text-7xl md:text-9xl text-[#E11D48] opacity-80"></i>
                     </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Modern Faculty and Staff CTA Section */}
            <section className="relative py-40 md:py-60 overflow-hidden group">
               <div className="absolute inset-0 z-0">
                 <img 
                   src="/img/About-Meet_The_Team.jpg" 
                   alt="Teachers in classroom" 
                   className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105 transform-gpu will-change-transform antialiased [backface-visibility:hidden]"
                 />
                 <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] group-hover:bg-black/50 transition-colors duration-1000"></div>
               </div>

               <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                  <span className="inline-block text-[#E11D48] font-bold tracking-widest uppercase mb-6 text-base">Our Educators</span>
                  <h3 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tight leading-tight">
                    Meet our LSCSI <br/>
                    <span className="text-white">Faculty and Staff</span>
                  </h3>
                  <p className="text-gray-200 text-xl md:text-2xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                    Dedicated educators nurturing the next generation with love and faith.
                  </p>
                  
                  <button onClick={() => handlePageChange('Team')} className="group/btn relative inline-flex items-center justify-center px-8 py-4 md:px-16 md:py-6 font-black text-white transition-all duration-300 bg-[#E11D48] rounded-full hover:bg-rose-500 hover:scale-105 active:scale-95 shadow-lg transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
                    <span className="relative uppercase tracking-wider text-base md:text-xl">Meet the Team</span>
                    <i className="fa-solid fa-arrow-right ml-4 transition-transform group-hover/btn:translate-x-1"></i>
                  </button>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#E11D48] to-transparent opacity-30"></div>
            </section>
          </div>
        );
      case 'Academics':
        return <Academics 
            initialTab={academicsTab} 
            shouldScrollToTabs={scrollToTabs} 
        />;
      case 'Admissions':
        return <Admissions onNavigate={handlePageChange} scrollToProcess={scrollToAdmissionProcess} />;
      case 'Facilities':
        return <Facilities onNavigate={handlePageChange} onScheduleVisit={handleContactFormNavigation} />;
      case 'Gallery':
        return <Gallery images={galleryImages} categories={galleryCategories} />;
      case 'Calendar':
        return <Calendar events={calendarEvents} calendarPdfUrl={calendarPdfUrl} />;
      case 'Contact':
        return <Contact scrollToForm={scrollToContactForm} />;
      case 'Team':
        return <Team />;
      case 'Careers':
        return <Careers />;
      case 'Admin':
        return <Admin 
          calendarEvents={calendarEvents} 
          setCalendarEvents={setCalendarEvents} 
          calendarPdfUrl={calendarPdfUrl} 
          setCalendarPdfUrl={setCalendarPdfUrl} 
          popups={popups}
          setPopups={setPopups}
          galleryImages={galleryImages}
          setGalleryImages={setGalleryImages}
          galleryCategories={galleryCategories}
          setGalleryCategories={setGalleryCategories}
        />;
      default:
        return <Hero onNavigate={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PopupsOverlay popups={popups} />
      <Header 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer 
        onNavigate={handlePageChange} 
        onAdmissionProcessClick={handleAdmissionProcessNavigation}
      />
      {currentPage !== 'Admin' && <div className={isMobileMenuOpen ? 'hidden' : ''}><AICounselor /></div>}
    </div>
  );
};

export default App;