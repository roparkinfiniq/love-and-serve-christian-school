import React from 'react';

const LatestNews: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gray-50/80 px-4 sm:px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12">
          <div className="mb-6 md:mb-0">
            <span className="text-[#E11D48] font-bold tracking-widest uppercase text-xs sm:text-sm bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 shadow-xs inline-block mb-3">
              Social Updates
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-2 sm:mb-3 tracking-tight">
              LSCSI News & Updates
            </h2>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl">
              Stay connected with the latest announcements, events, and stories directly from our official Facebook page.
            </p>
          </div>
          {/* Button to official Facebook page */}
          <a 
            href="https://www.facebook.com/loveandserveinc/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full md:w-auto inline-flex items-center justify-center font-bold text-white bg-[#1877F2] hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg active:scale-95"
          >
            <i className="fa-brands fa-facebook-f mr-2.5 text-lg"></i>
            Visit Official Facebook Page
            <i className="fa-solid fa-arrow-up-right-from-square ml-2.5 text-xs"></i>
          </a>
        </div>

        {/* Live Facebook Page Plugin Embed Container */}
        <div className="bg-white rounded-3xl p-3 sm:p-6 md:p-8 border border-gray-200/80 shadow-xl flex flex-col items-center justify-center min-h-[580px] overflow-hidden relative">
          <iframe 
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Floveandserveinc%2F&tabs=timeline&width=500&height=650&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
            width="500" 
            height="650" 
            style={{ border: 'none', overflow: 'hidden', maxWidth: '100%', width: '100%', minHeight: '620px' }} 
            scrolling="no" 
            frameBorder="0" 
            allowFullScreen={true} 
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Love and Serve Christian School Official Facebook Feed"
            className="rounded-2xl w-full max-w-[500px]"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;