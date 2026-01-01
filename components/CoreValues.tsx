import React from 'react';

const values = [
  {
    icon: 'fa-heart',
    title: 'Love',
    desc: 'Teaching kindness and compassion through the love of Christ in everything we do.',
    color: 'bg-red-50'
  },
  {
    icon: 'fa-hand-holding-heart',
    title: 'Serve',
    desc: 'Encouraging our students to be leaders who serve their community and the world.',
    color: 'bg-red-50',
    featured: true
  },
  {
    icon: 'fa-book-bible',
    title: 'Faith',
    desc: 'Building a strong spiritual foundation through Bible-based learning and prayer.',
    color: 'bg-red-50'
  }
];

const CoreValues: React.FC = () => {
  return (
    <section className="py-28 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our Core Values</h3>
          <div className="w-24 h-2 bg-[#E11D48] mx-auto mt-6 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {values.map((val, idx) => (
            <div 
              key={idx} 
              className={`bg-white p-12 rounded-[3rem] transition duration-500 ease-in-out transform-gpu [backface-visibility:hidden] hover:-translate-y-4 cursor-default shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-2xl border-t-8 ${val.featured ? 'border-[#E11D48]' : 'border-transparent hover:border-red-100'}`}
            >
              <div className={`group w-24 h-24 ${val.color} rounded-2xl flex items-center justify-center mx-auto mb-10 transition-transform duration-500 hover:scale-110`}>
                <i className={`fa-solid ${val.icon} text-4xl text-[#E11D48]`}></i>
              </div>
              <h4 className="text-3xl font-extrabold mb-6 text-center">{val.title}</h4>
              <p className="text-gray-500 text-lg leading-relaxed text-center">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;