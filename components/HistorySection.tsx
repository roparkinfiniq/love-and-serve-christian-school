import React, { useState } from 'react';

export interface HistoryMilestone {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

const HISTORY_DATA: HistoryMilestone[] = [
  {
    year: "1997",
    title: "The Vision Begins",
    description: "Love and Serve All Nations International Inc. (LASANII) was founded, beginning its mission of sharing God's love and serving the Filipino people.",
    icon: "fa-seedling"
  },
  {
    year: "2011",
    title: "Groundbreaking",
    description: "The Ground Breaking Ceremony and Ribbon Cutting marked the first step toward establishing Love and Serve Christian School.",
    icon: "fa-[#E11D48] fa-compass-drafting"
  },
  {
    year: "2012",
    title: "Dedication Service",
    description: "A Dedication Service was held to officially prepare the school for its operations and commit its ministry to God.",
    icon: "fa-church"
  },
  {
    year: "2014",
    title: "The Beginning",
    description: "Love and Serve Christian School (LSCSI) officially opened its Academic Year in Antipolo, Rizal, providing Christ-centered education.",
    icon: "fa-school"
  },
  {
    year: "2015",
    title: "Growing Together",
    description: "The Elementary Department officially opened, expanding the school's ministry and educational programs.",
    icon: "fa-graduation-cap"
  },
  {
    year: "2019",
    title: "First Graduation",
    description: "Five years after opening, LSCSI celebrated its first graduating class—a testimony of God's faithfulness and ministry growth.",
    icon: "fa-award"
  },
  {
    year: "Present",
    title: "Preparing Future Leaders",
    description: "LSCSI continues to develop students spiritually and academically through Biblical worldview, God-fearing teachers, and strong partnerships.",
    icon: "fa-hands-holding-child"
  }
];

const HistorySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const activeMilestone = HISTORY_DATA[activeIndex];

  const handleSelectIndex = (newIndex: number) => {
    if (newIndex === activeIndex || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 200);
  };

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? HISTORY_DATA.length - 1 : activeIndex - 1;
    handleSelectIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeIndex === HISTORY_DATA.length - 1 ? 0 : activeIndex + 1;
    handleSelectIndex(nextIdx);
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-rose-50/30 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#E11D48] font-bold tracking-widest uppercase text-xs sm:text-sm bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 shadow-sm inline-block">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-4 tracking-tight">
            History of LSCSI
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Explore key milestones in our journey of faith, academic excellence, and Christian education.
          </p>
        </div>

        {/* Interactive Timeline Navigation Bar */}
        <div className="relative mb-10 overflow-x-auto pt-6 pb-4 px-4 scrollbar-none">
          <div className="min-w-[650px] max-w-5xl mx-auto relative">
            {/* Circle Row with Background Line Shared Container */}
            <div className="relative h-14 flex items-center justify-between">
              {/* Progress Connecting Line - Smooth Slow Fill */}
              <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-gray-200 rounded-full z-0">
                <div 
                  className="h-full bg-[#E11D48] rounded-full transition-all duration-700 ease-in-out"
                  style={{ width: `${(activeIndex / (HISTORY_DATA.length - 1)) * 100}%` }}
                ></div>
              </div>

              {/* Milestone Circles */}
              {HISTORY_DATA.map((item, index) => {
                const isActive = index === activeIndex;
                const isPast = index <= activeIndex;
                return (
                  <button
                    key={item.year}
                    onClick={() => handleSelectIndex(index)}
                    className="relative z-10 flex flex-col items-center group focus:outline-none transition-all duration-500 ease-in-out"
                  >
                    {/* Node Circle */}
                    <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-transform duration-500 ease-in-out transform-gpu ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}>
                      {/* Outer Ring Overlay (Smooth Opacity Fade) */}
                      <div className={`absolute -inset-1 rounded-full bg-rose-300/60 transition-opacity duration-500 ease-in-out ${
                        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                      }`}></div>

                      {/* Circle Core */}
                      <div className={`relative z-10 w-full h-full rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-colors duration-500 ease-in-out ${
                        isActive || isPast 
                          ? 'bg-[#E11D48] text-white shadow-md' 
                          : 'bg-white text-gray-400 border-2 border-gray-300 group-hover:border-[#E11D48] group-hover:text-[#E11D48]'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Year Labels Row */}
            <div className="flex justify-between items-center mt-2">
              {HISTORY_DATA.map((item, index) => {
                const isActive = index === activeIndex;
                const isPast = index <= activeIndex;
                return (
                  <button
                    key={`year-${item.year}`}
                    onClick={() => handleSelectIndex(index)}
                    className="flex flex-col items-center group focus:outline-none transition-all duration-500 ease-in-out w-10 sm:w-12 text-center"
                  >
                    <span className={`text-xs sm:text-sm font-bold transition-all duration-500 ease-in-out ${
                      isActive ? 'text-[#E11D48] font-black scale-105' : isPast ? 'text-gray-800' : 'text-gray-400 group-hover:text-gray-600'
                    }`}>
                      {item.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured Showcase Card with Smooth Transitions */}
        <div className="relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-700 ease-in-out overflow-hidden">
          {/* Watermark Year Background */}
          <div className={`absolute right-4 bottom-2 text-7xl sm:text-9xl font-black text-rose-500/5 select-none pointer-events-none font-mono tracking-tighter transition-all duration-500 ease-in-out ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            {activeMilestone.year}
          </div>

          <div className={`relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 transition-all duration-500 ease-in-out ${
            isAnimating ? 'opacity-0 scale-98 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
          }`}>
            {/* Left Content Column */}
            <div className="flex-1 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <span className="bg-rose-100 text-[#E11D48] font-black text-xl sm:text-2xl px-4 py-1.5 rounded-xl shadow-sm">
                  {activeMilestone.year}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Milestone {activeIndex + 1} of {HISTORY_DATA.length}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                {activeMilestone.title}
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                {activeMilestone.description}
              </p>
            </div>

            {/* Right Navigation & Control Column */}
            <div className="flex items-center gap-3 self-end md:self-center shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs font-bold text-gray-400 md:hidden">
                {activeIndex + 1} / {HISTORY_DATA.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-[#E11D48] text-gray-700 hover:text-white transition-all duration-500 ease-in-out flex items-center justify-center shadow-sm active:scale-95"
                  title="Previous Milestone"
                >
                  <i className="fa-solid fa-arrow-left text-base"></i>
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-2xl bg-[#E11D48] hover:bg-rose-600 text-white transition-all duration-500 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
                  title="Next Milestone"
                >
                  <i className="fa-solid fa-arrow-right text-base"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Years Fast Selector Grid (For Quick Scanning) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-8">
          {HISTORY_DATA.map((item, idx) => (
            <button
              key={item.year}
              onClick={() => handleSelectIndex(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-500 ease-in-out ${
                idx === activeIndex 
                  ? 'bg-rose-50 border-[#E11D48] text-[#E11D48] shadow-sm font-bold ring-1 ring-[#E11D48]' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-rose-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-xs font-black text-[#E11D48]">{item.year}</div>
              <div className="text-xs font-bold text-gray-800 truncate mt-0.5">{item.title}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
