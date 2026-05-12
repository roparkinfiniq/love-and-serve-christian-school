import React, { useState } from 'react';

import { CalendarEvent } from '../types';

interface CalendarProps {
  events?: CalendarEvent[]; // Made optional just in case, but typically we pass it
}

const Calendar: React.FC<CalendarProps> = ({ events = [] }) => {
  // Use a fixed start (Aug 2024)
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7, 1));
  const [selectedDay, setSelectedDay] = useState<{ date: Date, events: CalendarEvent[] } | null>(null);

  // We use the 'events' passed from App.tsx instead of 'rawEvents'

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Academic': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Holiday': return 'bg-red-100 text-[#E11D48] border-red-200';
      case 'Religious': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate blank spaces for days before the 1st
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  // Generate days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Check if a day has events
  const getEventsForDay = (day: number) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const d = new Date(formattedDate);
    
    return events.filter(ev => {
      if (ev.endDate) {
        const start = new Date(ev.date);
        const end = new Date(ev.endDate);
        return d >= start && d <= end;
      }
      return ev.date === formattedDate;
    });
  };

  const handleDayClick = (day: number, dayEvents: CalendarEvent[]) => {
    if (dayEvents.length > 0) {
      setSelectedDay({
        date: new Date(year, month, day),
        events: dayEvents
      });
    }
  };

  return (
    <div className="animate-fadeIn min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-slate-900 py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E11D48] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 -mr-20 -mt-20"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">School Calendar</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              SY 2024 - 2025 Calendar of Activities
            </p>
        </div>
      </section>

      {/* Calendar Area */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header Controls */}
          <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-4">
              <button onClick={prevMonth} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <h2 className="text-2xl font-black text-gray-900 min-w-[200px] text-center">
                {monthNames[month]} {year}
              </h2>
              <button onClick={nextMonth} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs font-medium text-gray-600">Academic</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#E11D48]"></div>
                <span className="text-xs font-medium text-gray-600">Holiday</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs font-medium text-gray-600">Religious</span>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-gray-50/50 p-6">
            <div className="grid grid-cols-7 gap-4 mb-4">
              {dayNames.map(day => (
                <div key={day} className="text-center font-bold text-gray-400 text-sm uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-4">
              {blanks.map(blank => (
                <div key={`blank-${blank}`} className="min-h-[100px] md:min-h-[120px] rounded-2xl bg-transparent"></div>
              ))}

              {days.map(day => {
                const dayEvents = getEventsForDay(day);
                const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
                const hasEvents = dayEvents.length > 0;

                return (
                  <div 
                    key={day} 
                    onClick={() => hasEvents ? handleDayClick(day, dayEvents) : undefined}
                    className={`min-h-[100px] md:min-h-[120px] rounded-2xl p-2 md:p-3 transition-colors border ${hasEvents ? 'cursor-pointer hover:-translate-y-1 hover:shadow-md' : ''} ${
                      isToday ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-white shadow-sm'
                    }`}
                  >
                    <div className={`text-sm md:text-base font-bold mb-2 ${isToday ? 'text-[#E11D48]' : 'text-gray-700'}`}>
                      {day}
                    </div>
                    <div className="space-y-1 md:space-y-1.5 flex flex-col">
                      {dayEvents.map((ev, idx) => (
                        <div 
                          key={idx} 
                          className={`text-[10px] md:text-xs font-bold px-2 py-1.5 rounded border whitespace-normal break-words leading-tight ${getCategoryColor(ev.category)}`}
                          title={ev.title}
                        >
                          {ev.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Info Notice */}
      <section className="mt-12 text-center px-6">
         <p className="text-gray-500 text-sm">
            <i className="fa-solid fa-circle-info mr-2 text-gray-400"></i>
            Dates are subject to change. For automated updates, Google Calendar integration is available.
         </p>
      </section>

      {/* Day Details Modal */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setSelectedDay(null)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeInUp">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedDay.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <button 
                onClick={() => setSelectedDay(null)} 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {selectedDay.events.map((ev, idx) => {
                const categoryColorClass = getCategoryColor(ev.category);
                // Extract just the background and text color nicely for the card
                const bgClass = categoryColorClass.split(' ').find(cls => cls.startsWith('bg-')) || 'bg-gray-50';
                
                return (
                  <div key={idx} className={`p-5 rounded-2xl border ${categoryColorClass} bg-opacity-30`}>
                    <div className="flex items-center space-x-2 mb-2">
                       <div className={`w-2 h-2 rounded-full ${bgClass.replace('100', '500')}`}></div>
                       <div className="text-xs uppercase tracking-widest font-bold opacity-80">{ev.category}</div>
                    </div>
                    <h4 className="text-xl font-black mb-2">{ev.title}</h4>
                    {ev.endDate && ev.endDate !== ev.date && (
                      <div className="text-sm font-medium opacity-90 mt-2 flex items-center">
                        <i className="fa-regular fa-calendar mr-2"></i>
                        {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(ev.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
