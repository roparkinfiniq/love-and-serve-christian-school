import React from 'react';

const LatestNews: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Button moved up for Mobile */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-12">
          <div className="mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">LSCSI News & Updates</h2>
            <div className="h-2 w-24 bg-[#E11D48] rounded-full"></div>
            <p className="text-xl text-gray-500 mt-6 max-w-2xl">
              Stay connected with the latest announcements, events, and stories from our campus.
            </p>
          </div>
          {/* Unified Button: Visible on all screens, full width on mobile */}
          <button className="w-full md:w-auto inline-flex items-center justify-center font-bold text-[#E11D48] hover:text-red-700 transition text-lg bg-white px-6 py-4 md:py-3 rounded-xl shadow-md md:shadow-sm hover:shadow-md border border-gray-100 md:border-transparent">
             Visit Facebook Page <i className="fa-solid fa-arrow-up-right-from-square ml-3"></i>
          </button>
        </div>

        {/* Feed Placeholder */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-200 shadow-xl min-h-[500px] flex items-center justify-center relative overflow-hidden group">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-105 opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full -ml-24 -mb-24 transition-transform duration-700 group-hover:scale-105 opacity-60"></div>
            
            {/* Loading Placeholder */}
            <div className="text-center relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-100/50 text-[#1877F2] rounded-full flex items-center justify-center mb-6 animate-pulse ring-8 ring-blue-50">
                    <i className="fa-brands fa-facebook-f text-4xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Facebook Feed Loading...</h3>
                <p className="text-gray-500 max-w-md">We are fetching the latest posts from our social media page. Please wait a moment.</p>
            </div>

            {/* Area for Iframe (This is where you will paste the code later) */}
            <div id="fb-root" className="hidden"></div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;