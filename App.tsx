import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CoreValues from './components/CoreValues';
import Programs from './components/Programs';
import LatestNews from './components/LatestNews';
import Footer from './components/Footer';
import MessengerWidget from './components/MessengerWidget';
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
import HistorySection from './components/HistorySection';
import { Page, CalendarEvent, PopupData, GalleryImage, TeamMember, FacilityItem } from './types';
import { INITIAL_TEAM_MEMBERS, INITIAL_FACILITIES } from './data/initialData';
import calendarJson from './public/content/calendar.json';
import galleryJson from './public/content/gallery.json';

import { 
  fetchTeamMembers, saveTeamMembers, 
  fetchFacilities, saveFacilities, 
  fetchGalleryImages, saveGalleryImages, 
  fetchCalendarEvents, saveCalendarEvents, 
  fetchPopups, savePopups 
} from './services/supabaseClient';

const INITIAL_EVENTS: CalendarEvent[] = (calendarJson.events || calendarJson) as CalendarEvent[];
const INITIAL_GALLERY_IMAGES: GalleryImage[] = (galleryJson.images || galleryJson) as GalleryImage[];

const INITIAL_GALLERY_CATEGORIES = ['All', 'Academics', 'Student Life', 'Arts & Sports', 'Campus'];

const getPageFromPathname = (): Page => {
  const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
  switch (path) {
    case 'about': return 'About';
    case 'academics': return 'Academics';
    case 'admissions': return 'Admissions';
    case 'facilities': return 'Facilities';
    case 'gallery': return 'Gallery';
    case 'contact': return 'Contact';
    case 'team': return 'Team';
    case 'careers': return 'Careers';
    case 'admin': return 'Admin';
    case 'calendar': return 'Calendar';
    default: return 'Home';
  }
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromPathname());
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [calendarPdfUrl, setCalendarPdfUrl] = useState<string | null>('/SCHOOL-CALENDAR-SY-2627.pdf');
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(INITIAL_GALLERY_IMAGES);
  const [galleryCategories, setGalleryCategories] = useState<string[]>(INITIAL_GALLERY_CATEGORIES);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('lscs_team_members');
      return saved ? JSON.parse(saved) : INITIAL_TEAM_MEMBERS;
    } catch {
      return INITIAL_TEAM_MEMBERS;
    }
  });

  const [facilitiesList, setFacilitiesList] = useState<FacilityItem[]>(() => {
    try {
      const saved = localStorage.getItem('lscs_facilities_list');
      return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
    } catch {
      return INITIAL_FACILITIES;
    }
  });

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Load data from Supabase DB on mount
  useEffect(() => {
    async function loadDataFromSupabase() {
      try {
        const [team, facs, gallery, events, pop] = await Promise.all([
          fetchTeamMembers(),
          fetchFacilities(),
          fetchGalleryImages(),
          fetchCalendarEvents(),
          fetchPopups(),
        ]);
        if (team && team.length > 0) setTeamMembers(team);
        if (facs && facs.length > 0) setFacilitiesList(facs);
        if (gallery && gallery.length > 0) setGalleryImages(gallery);
        if (events && events.length > 0) setCalendarEvents(events);
        if (pop) setPopups(pop);
      } catch (e) {
        console.warn('Initial Supabase fetch completed with fallback', e);
      } finally {
        setIsDataLoaded(true);
      }
    }
    loadDataFromSupabase();
  }, []);

  useEffect(() => {
    if (!isDataLoaded) return;
    try {
      localStorage.setItem('lscs_team_members', JSON.stringify(teamMembers));
    } catch (e) {
      console.error(e);
    }
    saveTeamMembers(teamMembers);
  }, [teamMembers, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    try {
      localStorage.setItem('lscs_facilities_list', JSON.stringify(facilitiesList));
    } catch (e) {
      console.error(e);
    }
    saveFacilities(facilitiesList);
  }, [facilitiesList, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    saveGalleryImages(galleryImages);
  }, [galleryImages, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    saveCalendarEvents(calendarEvents);
  }, [calendarEvents, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    savePopups(popups);
  }, [popups, isDataLoaded]);
  const [academicsTab, setAcademicsTab] = useState<'preschool' | 'elementary' | 'junior'>('preschool');
  const [scrollToTabs, setScrollToTabs] = useState(false);
  const [scrollToAdmissionProcess, setScrollToAdmissionProcess] = useState(false);
  const [scrollToContactForm, setScrollToContactForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Update URL pathname when page changes
  useEffect(() => {
    const path = currentPage === 'Home' ? '/' : `/${currentPage.toLowerCase()}`;
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPathname());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
                  <div className="aspect-[3/4] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                    <img 
                      src="/img/About-President01.png" 
                      alt="School President" 
                      className="w-full h-full object-cover object-top"
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
                    A Message from <br/>the School President
                  </h2>
                  <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium">
                    <p className="font-bold text-[#E11D48]">
                      Welcome to Love and Serve Christian School!
                    </p>
                    <p>
                      It is our joy to welcome you to our school family. At Love and Serve Christian School, we believe that every child is a precious gift from God, created with a unique purpose and great potential.
                    </p>
                    <p>
                      Our desire is not only to provide quality education but also to help every student grow in faith, wisdom, character, and love. We are committed to creating a safe, nurturing, and Christ-centered environment where children are encouraged to discover their God-given gifts, develop a love for learning, and build a strong foundation for life.
                    </p>
                    <p>
                      We are grateful for the opportunity to partner with parents and our community in guiding the next generation. Together, let us inspire our children to love God, serve others, and pursue excellence in all that they do.
                    </p>
                    <p>
                      May the Lord bless you, and we look forward to growing together with your family.
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
                      <p className="text-[#E11D48] text-sm uppercase tracking-wider font-bold mt-1">School President</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* History Section - Interactive Horizontal Timeline */}
            <HistorySection />

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
        return <Facilities onNavigate={handlePageChange} onScheduleVisit={handleContactFormNavigation} facilitiesList={facilitiesList} />;
      case 'Gallery':
        return <Gallery images={galleryImages} categories={galleryCategories} />;
      case 'Calendar':
        return <Calendar events={calendarEvents} calendarPdfUrl={calendarPdfUrl} />;
      case 'Contact':
        return <Contact scrollToForm={scrollToContactForm} />;
      case 'Team':
        return <Team teamMembers={teamMembers} />;
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
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
          facilitiesList={facilitiesList}
          setFacilitiesList={setFacilitiesList}
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
      {currentPage !== 'Admin' && <div className={isMobileMenuOpen ? 'hidden' : ''}><MessengerWidget /></div>}
    </div>
  );
};

export default App;