import React from 'react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: 'fa-location-dot',
      title: 'Visit Us',
      content: 'Antipolo, Rizal, Philippines',
      sub: 'Main Campus',
      action: 'https://maps.google.com'
    },
    {
      icon: 'fa-phone',
      title: 'Call Us',
      content: '+63 (000) 000-0000',
      sub: 'Mon-Fri from 8am to 5pm',
      action: 'tel:+630000000000'
    },
    {
      icon: 'fa-envelope',
      title: 'Email Us',
      content: 'info@lscs.edu.ph',
      sub: 'We reply within 24 hours',
      action: 'mailto:info@lscs.edu.ph'
    },
    {
      icon: 'fa-clock',
      title: 'Office Hours',
      content: 'Monday - Friday',
      sub: '8:00 AM - 5:00 PM',
      action: null
    }
  ];

  return (
    <section className="py-24 bg-gray-50 min-h-screen animate-fadeIn">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="text-[#E11D48] font-bold tracking-widest uppercase text-sm">Get in Touch</span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-6">Contact Us</h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Have questions about admissions, academics, or school life? We're here to help you start your journey with LSCS.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, idx) => (
            <a 
              key={idx} 
              href={info.action || '#'} 
              className={`bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${!info.action ? 'cursor-default' : ''}`}
            >
              <div className="w-16 h-16 bg-red-50 text-[#E11D48] rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className={`fa-solid ${info.icon}`}></i>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{info.title}</h3>
              <p className="text-gray-900 font-semibold mb-1">{info.content}</p>
              <p className="text-sm text-gray-400">{info.sub}</p>
            </a>
          ))}
        </div>

        {/* Bottom Section: Form & Map Split */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            
            {/* Left: Contact Form */}
            <div className="p-10 md:p-16">
              <h3 className="text-3xl font-black text-slate-900 mb-2">Send a Message</h3>
              <p className="text-gray-500 mb-8">Fill out the form below and our admissions team will get back to you shortly.</p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition-all text-gray-600">
                    <option>General Inquiry</option>
                    <option>Admissions</option>
                    <option>Student Services</option>
                    <option>Carrers</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="button"
                  className="w-full bg-[#E11D48] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-red-700 hover:shadow-red-200 transition-all transform active:scale-95"
                >
                  Send Message <i className="fa-solid fa-paper-plane ml-2"></i>
                </button>
              </form>
            </div>

            {/* Right: Map */}
            <div className="relative h-[400px] lg:h-auto bg-gray-200 min-h-[500px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61765.98679904739!2d121.13459146953123!3d14.636660100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b9087c2b66d9%3A0xa5e25287f7396001!2sAntipolo%2C%20Rizal!5e0!3m2!1sen!2sph!4v1709664551234!5m2!1sen!2sph" 
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="LSCS Location"
              ></iframe>
              
              {/* Overlay Badge */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-xs hidden sm:block">
                <p className="font-bold text-slate-800 text-sm"><i className="fa-solid fa-map-pin text-[#E11D48] mr-2"></i>Antipolo, Rizal</p>
                <p className="text-xs text-gray-500 mt-1">Visit our campus to experience the environment.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;