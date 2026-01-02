import React, { useState, useRef, useEffect } from 'react';

interface AdmissionsProps {
  scrollToProcess?: boolean;
}

const Admissions: React.FC<AdmissionsProps> = ({ scrollToProcess = false }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const processRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (scrollToProcess && processRef.current) {
      // Timeout ensures the page renders before scrolling
      setTimeout(() => {
        processRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [scrollToProcess]);

  const steps = [
    { number: 1, title: 'Submit Application', desc: 'Fill out the online form or visit our admissions office.' },
    { number: 2, title: 'Review & Interview', desc: 'Submit required documents and schedule a parent interview.' },
    { number: 3, title: 'Assessment', desc: 'Student takes an age-appropriate assessment test.' },
    { number: 4, title: 'Enrollment', desc: 'Pay the reservation fee and welcome to the family!' },
  ];

  const requirements = [
    'PSA Birth Certificate (Original & Photocopy)',
    'Report Card / Form 138 (Original)',
    'Certificate of Good Moral Character',
    '2 pcs 2x2 Recent ID Picture',
    'Medical Certificate (if applicable)',
    'Form 137 (Copy of School Records)'
  ];

  const faqs = [
    { q: 'When does the admission period start?', a: 'Admissions for the upcoming school year typically open in January. We encourage early application as slots are limited.' },
    { q: 'What are the tuition fees?', a: 'Tuition fees vary by grade level. Please download our information packet or contact the finance office for a detailed schedule of fees.' },
    { q: 'Is there an entrance exam?', a: 'Yes, students from Grade 1 onwards are required to take an assessment test to determine their academic readiness.' },
    { q: 'Do you offer scholarships?', a: 'Yes, we offer academic scholarships for honor students and financial aid for qualified families. Please ask our admissions officer for details.' }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="animate-fadeIn bg-white">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000" 
                  alt="Students Walking Together" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-red-900/60 mix-blend-multiply"></div>
            </div>
            <div className="relative z-10 text-center px-6 max-w-4xl">
                 <span className="inline-block py-2 px-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold tracking-widest uppercase mb-6 text-sm">Admissions Open</span>
                 <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Join Our Family</h1>
                 <p className="text-xl text-gray-100 font-medium max-w-2xl mx-auto">Embark on a journey of faith, excellence, and service. We can't wait to welcome you to LSCS.</p>
            </div>
        </section>

        {/* Process Steps */}
        <section ref={processRef} id="process" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-32">
            <div className="text-center mb-20">
                <span className="text-[#E11D48] font-bold tracking-widest uppercase text-sm">Step-by-Step</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">Admissions Process</h2>
            </div>
            
            <div className="relative">
                {/* Desktop Connecting Line - Solid Style for 'Flow' effect */}
                <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[3px] bg-red-200"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex flex-col items-center text-center group">
                            {/* Circle Number */}
                            <div className="w-24 h-24 bg-white border-4 border-red-50 rounded-full flex items-center justify-center text-3xl font-black text-[#E11D48] mb-6 shadow-sm group-hover:scale-110 group-hover:border-[#E11D48] transition-all duration-300 z-10 relative">
                                {step.number}
                            </div>

                            {/* Mobile Vertical Lines Removed per request */}
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Requirements & Download */}
        <section className="py-24 bg-gray-50 px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl font-black text-gray-900 mb-8">Application Requirements</h2>
                    <ul className="space-y-4">
                        {requirements.map((req, i) => (
                            <li key={i} className="flex items-start">
                                <i className="fa-solid fa-circle-check text-[#E11D48] mt-1 mr-4"></i>
                                <span className="text-lg text-gray-700 font-medium">{req}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl text-center border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-20 h-20 bg-red-50 text-[#E11D48] rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Apply?</h3>
                    <p className="text-gray-500 mb-8">Start your application online for the fastest processing, or download the form to submit in person.</p>
                    
                    <div className="space-y-4">
                        <a href="#" className="w-full bg-[#E11D48] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-red-700 hover:shadow-red-200 transition-all active:scale-95 flex items-center justify-center group">
                            <i className="fa-solid fa-laptop-file mr-3 group-hover:scale-110 transition-transform"></i> Apply Online Now
                        </a>
                        <button className="w-full bg-white border-2 border-[#E11D48] text-[#E11D48] py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-all active:scale-95 flex items-center justify-center">
                            <i className="fa-solid fa-download mr-3"></i> Download PDF Form
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-6">Form updated for SY 2024-2025</p>
                </div>
            </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-16">
                 <h2 className="text-4xl font-black text-gray-900">Common Questions</h2>
                 <p className="text-gray-500 text-lg mt-4">Everything you need to know about joining LSCS.</p>
            </div>
            
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md bg-white">
                        <button 
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            onClick={() => toggleFaq(idx)}
                        >
                            <span className="text-lg font-bold text-gray-800">{faq.q}</span>
                            <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}></i>
                        </button>
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                                {faq.a}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="text-center mt-12">
                <p className="text-gray-500">Still have questions?</p>
                <button className="inline-block mt-2 text-[#E11D48] font-bold hover:underline">Contact our Admissions Office</button>
            </div>
        </section>
    </div>
  );
};

export default Admissions;