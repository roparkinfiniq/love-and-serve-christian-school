import React, { useState, useEffect, useRef } from 'react';

interface AcademicsProps {
  initialTab?: 'preschool' | 'elementary' | 'junior';
  shouldScrollToTabs?: boolean;
  scrollToCalendar?: boolean;
}

const Academics: React.FC<AcademicsProps> = ({ 
  initialTab = 'preschool', 
  shouldScrollToTabs = false,
  scrollToCalendar = false,
}) => {
  const [activeTab, setActiveTab] = useState<'preschool' | 'elementary' | 'junior'>(initialTab);
  const tabsSectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLElement>(null);

  // Sync activeTab if initialTab changes (e.g. navigation from Home page)
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Handle auto-scroll to tabs if requested (e.g. from "Learn More" buttons)
  useEffect(() => {
    if (shouldScrollToTabs && tabsSectionRef.current) {
      setTimeout(() => {
        tabsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [shouldScrollToTabs, initialTab]);

  // Handle auto-scroll to calendar if requested (e.g. from Footer)
  useEffect(() => {
    if (scrollToCalendar && calendarRef.current) {
      setTimeout(() => {
        calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [scrollToCalendar]);

  const handleTabChange = (tab: 'preschool' | 'elementary' | 'junior', isBottomNav = false) => {
    setActiveTab(tab);
    
    if (isBottomNav) {
      // Check device width to determine scroll behavior (Tailwind md breakpoint is 768px)
      const isMobile = window.innerWidth < 768;

      if (isMobile && contentRef.current) {
        // Mobile: Scroll directly to content container, bypassing the tabs at the top
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (!isMobile && tabsSectionRef.current) {
        // Desktop: Use 'nearest' to avoid jarring jumps if the tabs are already in view.
        tabsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      // Direct Tab Click: Use 'nearest' to avoid unnecessary jumping
      tabsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const levels = {
    preschool: {
      title: 'Preschool Department',
      subtitle: 'Building Foundations through Play and Discovery',
      description: 'Our preschool program focuses on social-emotional growth, motor skills, and spiritual formation. We provide a safe, nurturing environment where toddlers and kindergarteners learn to love God and others while developing early literacy and numeracy skills through interactive play.',
      features: ['Christ-centered values formation', 'Play-based learning approach', 'Safe and caring environment', 'Basic literacy and numeracy'],
      image: 'https://images.unsplash.com/photo-1556379069-7c1b1b8990b0?auto=format&fit=crop&q=80&w=1200'
    },
    elementary: {
      title: 'Elementary Department',
      subtitle: 'Nurturing Minds and Character',
      description: 'The elementary years are crucial for academic and character development. Our curriculum integrates biblical truths across all subjects, ensuring that students not only excel academically but also grow in wisdom and stature.',
      features: ['Integrated Biblical Worldview', 'Strong core subjects (Math, Science, English)', 'Character development programs', 'Collaborative projects'],
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1200'
    },
    junior: {
      title: 'Junior High School',
      subtitle: 'Equipping Future Leaders',
      description: 'Our Junior High program prepares students for the challenges of adolescence and higher education. We foster critical thinking, leadership skills, and a deeper personal relationship with God, equipping them to be salt and light in the world.',
      features: ['Advanced academic curriculum', 'Leadership training', 'Digital literacy and technology', 'Community service initiatives'],
      image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1200'
    }
  };

  const enrichmentPrograms = [
    { title: 'Hangul Class', image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=600', icon: 'fa-language' },
    { title: 'Taekwondo', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=600', icon: 'fa-user-ninja' },
    { title: 'Music Class', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=600', icon: 'fa-music' },
    { title: 'Guitar Class', image: 'https://images.unsplash.com/photo-1460039230329-eb070fc6c77c?auto=format&fit=crop&q=80&w=600', icon: 'fa-guitar' },
    { title: 'Ukulele Class', image: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&q=80&w=600', icon: 'fa-guitar' },
    { title: 'Dance Class', image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&q=80&w=600', icon: 'fa-person-running' },
    { title: 'Kumdo Class', image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=600', icon: 'fa-khanda' },
    { title: 'Drum & Lyre', image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=600', icon: 'fa-drum' },
  ];

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=2000" 
            alt="Academics Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <span className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold tracking-widest uppercase mb-6 text-sm md:text-base">
            Academic Excellence
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Academics
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-medium leading-relaxed">
            "Excellence in Faith and Learning"
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-red-50 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-md text-[#E11D48] text-3xl">
              <i className="fa-solid fa-book-bible"></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Biblical Worldview Integration</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              At LSCS, we believe that true knowledge begins with the fear of the Lord. Our curriculum is designed not just to inform the mind but to transform the heart. We integrate biblical truths into every subject, helping students see the world through God's perspective and discover their unique purpose in His creation.
            </p>
          </div>
          {/* Decorative Backgrounds */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
        </div>
      </section>

      {/* Academic Levels - Tabbed Interface */}
      <section ref={tabsSectionRef} className="py-20 px-6 max-w-7xl mx-auto scroll-mt-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900">Academic Levels</h2>
          <div className="w-24 h-1.5 bg-[#E11D48] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(Object.keys(levels) as Array<keyof typeof levels>).map((level) => (
            <button
              key={level}
              onClick={() => handleTabChange(level)}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
                activeTab === level
                  ? 'bg-[#E11D48] text-white shadow-lg shadow-red-200'
                  : 'bg-gray-100 text-gray-500 hover:bg-white hover:shadow-md'
              }`}
            >
              {levels[level].title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div 
          ref={contentRef}
          className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row animate-fadeIn scroll-mt-32"
        >
           {/* Image Side */}
           <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
             <img 
               key={levels[activeTab].image} // Force re-render for animation
               src={levels[activeTab].image} 
               alt={levels[activeTab].title}
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105 animate-fadeIn"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r"></div>
           </div>
           
           {/* Text Side */}
           <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
             <span className="text-[#E11D48] font-bold tracking-widest uppercase text-sm mb-4">Curriculum Highlight</span>
             <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{levels[activeTab].title}</h3>
             <p className="text-xl text-gray-500 font-medium mb-8">{levels[activeTab].subtitle}</p>
             <p className="text-gray-600 leading-relaxed mb-10 text-lg">
               {levels[activeTab].description}
             </p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {levels[activeTab].features.map((feature, idx) => (
                 <div key={idx} className="flex items-center text-gray-700">
                   <i className="fa-solid fa-circle-check text-[#E11D48] mr-3"></i>
                   <span className="font-medium">{feature}</span>
                 </div>
               ))}
             </div>

             {/* Navigation Buttons for Better Mobile UX */}
             <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                {activeTab === 'preschool' && (
                  <>
                    <div className="hidden sm:block"></div> {/* Spacer to push Next button to right */}
                    <button 
                      onClick={() => handleTabChange('elementary', true)}
                      className="w-full sm:w-auto group flex items-center justify-center text-[#E11D48] font-bold hover:bg-red-50 px-8 py-4 rounded-xl transition-all border-2 border-[#E11D48] active:scale-95"
                    >
                      Next: Elementary Department <i className="fa-solid fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                  </>
                )}

                {activeTab === 'elementary' && (
                  <>
                    <button 
                      onClick={() => handleTabChange('preschool', true)}
                      className="w-full sm:w-auto group flex items-center justify-center text-gray-500 font-bold hover:bg-gray-50 px-8 py-4 rounded-xl transition-all border-2 border-gray-200 hover:border-gray-300 hover:text-gray-700 active:scale-95"
                    >
                      <i className="fa-solid fa-arrow-left mr-3 group-hover:-translate-x-1 transition-transform"></i> Prev: Preschool
                    </button>
                    <button 
                      onClick={() => handleTabChange('junior', true)}
                      className="w-full sm:w-auto group flex items-center justify-center text-[#E11D48] font-bold hover:bg-red-50 px-8 py-4 rounded-xl transition-all border-2 border-[#E11D48] active:scale-95"
                    >
                      Next: Junior High <i className="fa-solid fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                  </>
                )}

                {activeTab === 'junior' && (
                  <>
                     <button 
                      onClick={() => handleTabChange('elementary', true)}
                      className="w-full sm:w-auto group flex items-center justify-center text-gray-500 font-bold hover:bg-gray-50 px-8 py-4 rounded-xl transition-all border-2 border-gray-200 hover:border-gray-300 hover:text-gray-700 active:scale-95"
                    >
                      <i className="fa-solid fa-arrow-left mr-3 group-hover:-translate-x-1 transition-transform"></i> Prev: Elementary
                    </button>
                    <div className="hidden sm:block"></div> {/* Spacer */}
                  </>
                )}
             </div>

           </div>
        </div>
      </section>

      {/* Enrichment Programs - Grid */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16">
            <div>
              <span className="text-[#E11D48] font-bold tracking-widest uppercase text-sm">Extracurricular</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">Beyond the Classroom</h2>
              <p className="text-gray-500 text-xl mt-4 max-w-2xl">
                Discovering talents and passions through our diverse enrichment programs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {enrichmentPrograms.map((program, idx) => (
              <div 
                key={idx} 
                className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#E11D48] shadow-lg">
                    <i className={`fa-solid ${program.icon}`}></i>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#E11D48] transition-colors">{program.title}</h4>
                  <p className="text-sm text-gray-400">Enrichment Program</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Calendar Placeholder */}
      <section id="calendar" ref={calendarRef} className="py-24 px-6 max-w-4xl mx-auto text-center">
        <div className="bg-gray-50 rounded-[3rem] p-12 md:p-16 border border-gray-200 shadow-inner flex flex-col items-center">
           <div className="text-6xl mb-6 select-none">📅</div>
           <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">School Calendar: SY 2026-2027</h2>
           <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
             Our official academic calendar is currently being finalized. Please check back soon for updates regarding key dates and events.
           </p>
           <button disabled className="bg-gray-200 text-gray-400 px-8 py-4 rounded-xl font-bold cursor-not-allowed flex items-center shadow-sm">
              <i className="fa-solid fa-file-pdf mr-3"></i> Download PDF (Coming Soon)
           </button>
        </div>
      </section>
    </div>
  );
};

export default Academics;