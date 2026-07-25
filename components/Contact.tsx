import React, { useRef, useEffect, useState } from 'react';
import { saveInquiry } from '../services/supabaseClient';

interface ContactProps {
  scrollToForm?: boolean;
}

const Contact: React.FC<ContactProps> = ({ scrollToForm = false }) => {
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (scrollToForm && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [scrollToForm]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;

    if (!formData.name.trim()) {
      setNameError('Please fill out this field.');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!formData.email.trim()) {
      setEmailError('Please fill out this field.');
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!formData.message.trim()) {
      setMessageError('Please fill out this field.');
      hasError = true;
    } else {
      setMessageError('');
    }

    if (hasError) return;

    setEmailError('');
    setNameError('');
    setMessageError('');
    setIsSubmitting(true);

    async function processSubmit() {
      try {
        await saveInquiry({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });
      } catch (err) {
        console.error('Failed to save inquiry:', err);
      } finally {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        setTimeout(() => setIsSuccess(false), 4000);
      }
    }

    processSubmit();
  };

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
      content: '+63999-982-1836 / +63917-710-7075',
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
      sub: '7:30 AM - 4:00 PM',
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
              className={`bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group transform-gpu will-change-transform antialiased [backface-visibility:hidden] ${!info.action ? 'cursor-default' : ''}`}
            >
              <div className="w-16 h-16 bg-red-50 text-[#E11D48] rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
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
              
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {isSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center mb-4 animate-fadeIn">
                    <i className="fa-solid fa-check-circle mr-2 text-green-500"></i>
                    Your message has been sent successfully! We will get back to you soon.
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({...formData, name: e.target.value});
                        if (nameError) setNameError('');
                      }}
                      placeholder="Juan Dela Cruz"
                      className={`w-full bg-gray-50 border ${nameError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition-all`}
                      disabled={isSubmitting}
                    />
                    {nameError && <p className="text-red-500 text-xs font-bold mt-1 ml-1 animate-fadeIn"><i className="fa-solid fa-circle-exclamation mr-1"></i>{nameError}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (emailError) setEmailError('');
                      }}
                      placeholder="juandelacruz@example.com"
                      className={`w-full bg-gray-50 border ${emailError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition-all`}
                      disabled={isSubmitting}
                    />
                    {emailError && <p className="text-red-500 text-xs font-bold mt-1 ml-1 animate-fadeIn"><i className="fa-solid fa-circle-exclamation mr-1"></i>{emailError}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition-all text-gray-600"
                    disabled={isSubmitting}
                  >
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
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({...formData, message: e.target.value});
                      if (messageError) setMessageError('');
                    }}
                    placeholder="How can we help you?"
                    className={`w-full bg-gray-50 border ${messageError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition-all resize-none`}
                    maxLength={1000}
                    disabled={isSubmitting}
                  ></textarea>
                  {messageError && <p className="text-red-500 text-xs font-bold mt-1 ml-1 animate-fadeIn"><i className="fa-solid fa-circle-exclamation mr-1"></i>{messageError}</p>}
                  <div className="text-right text-xs text-gray-400 mt-1 mr-2 font-medium">
                    {formData.message.length} / 1000
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full font-bold text-base md:text-lg py-3 md:py-4 rounded-xl shadow-lg transition-all transform active:scale-95 ${
                    isSuccess 
                      ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-green-200'
                      : isSubmitting
                        ? 'bg-rose-400 text-white cursor-wait relative'
                        : 'bg-[#E11D48] text-white hover:bg-rose-500 hover:shadow-red-200'
                  }`}
                >
                  {isSuccess ? (
                    <>Message Sent <i className="fa-solid fa-check ml-2"></i></>
                  ) : isSubmitting ? (
                    <>Sending... <i className="fa-solid fa-circle-notch fa-spin ml-2"></i></>
                  ) : (
                    <>Send Message <i className="fa-solid fa-paper-plane ml-2"></i></>
                  )}
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