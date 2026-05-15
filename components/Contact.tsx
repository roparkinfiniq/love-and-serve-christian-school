import React, { useRef, useEffect } from 'react';

interface ContactProps {
  scrollToForm?: boolean;
}

const Contact: React.FC<ContactProps> = ({ scrollToForm = false }) => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToForm && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [scrollToForm]);

  const contactInfo = [
    {
      icon: 'fa-location-dot',
      title: 'Visit Us',
      content: 'L30 Knights of Columbus, Brgy. San Roque, Antipolo Rizal',
      sub: 'Main Campus',
      action: 'https://maps.google.com'
    },
    {
      icon: 'fa-phone',
      title: 'Call Us',
      content: '+63999-982-1836 / 0917-710-7075',
      sub: '(02) 7004-8359',
      action: 'tel:+639999821836'
    },
    {
      icon: 'fa-envelope',
      title: 'Email Us',
      content: 'loveandserve2014@gmail.com',
      sub: 'We reply within 24 hours',
      action: 'mailto:loveandserve2014@gmail.com'
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
        <div 
          ref={formRef} 
          id="contact-form-box"
          className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden scroll-mt-32"
        >
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
                      placeholder="Juan Dela Cruz"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="juandelacruz@example.com"
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
                    <option>Careers</option>
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
                  className="w-full bg-[#E11D48] text-white font-bold text-base md:text-lg py-3 md:py-4 rounded-xl shadow-lg hover:bg-red-700 hover:shadow-red-200 transition-all transform active:scale-95"
                >
                  Send Message <i className="fa-solid fa-paper-plane ml-2"></i>
                </button>
              </form>
            </div>

            {/* Right: Map */}
            <div className="relative h-[400px] lg:h-auto bg-gray-200 min-h-[500px]">
              <iframe 
                src="https://maps.google.com/maps?q=Love+and+Serve+Christian+School+Antipolo+Rizal&t=&z=15&ie=UTF8&iwloc=&output=embed&hl=en"
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