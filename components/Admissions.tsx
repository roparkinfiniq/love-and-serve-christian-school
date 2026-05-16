import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';

interface AdmissionsProps {
  onNavigate: (page: Page) => void;
  scrollToProcess?: boolean;
}

const Admissions: React.FC<AdmissionsProps> = ({ onNavigate, scrollToProcess = false }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isScholarshipModalOpen, setIsScholarshipModalOpen] = useState(false);
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
    { number: 1, title: 'Submit Admission Requirements', desc: 'Bring the required documents to the Admissions Office.' },
    { number: 2, title: 'Complete the Application Form', desc: 'Fill out the Student Application Form with the necessary information.' },
    { number: 3, title: 'Take the Entrance Assessment', desc: 'New & Transferee students will take an entrance examination or assessment.' },
    { number: 4, title: 'Payment of Fees', desc: 'Settle the enrollment fee to secure the student’s slot.' },
    { number: 5, title: 'Attend the Orientation Program', desc: 'Parents and students will attend the orientation before the start of classes.' },
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
    { q: 'When does the admission period start?', a: 'Admissions for the upcoming school year typically open in January until the first week of June. We encourage early application as slots are limited.' },
    { q: 'What are the tuition fees?', a: 'Tuition fees vary by grade level. Please download our information packet or contact the finance office for a detailed schedule of fees.' },
    { q: 'Is there an entrance exam?', a: 'Yes, students from Grade 1 onwards are required to take an assessment test to determine their academic readiness.' },
    { 
      q: 'Do you offer scholarships?', 
      a: 'Yes, we offer academic scholarships for honor students and financial aid for qualified families. Please ask our admissions officer for details.' 
    }
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
                <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[3px] bg-red-200"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
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

                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl text-center border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300 transform-gpu will-change-transform antialiased [backface-visibility:hidden]">
                    <div className="w-20 h-20 bg-red-50 text-[#E11D48] rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Apply?</h3>
                    <p className="text-gray-500 mb-8">Start your application online for the fastest processing, or download the form to submit in person.</p>
                    
                    <div className="space-y-4">
                        <a href="#" className="w-full bg-[#E11D48] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-rose-500 hover:shadow-red-200 transition-all active:scale-95 flex items-center justify-center group">
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

        {/* Scholars Testimonials */}
        <section className="py-24 px-6 bg-white relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 -ml-20 -mb-20"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block py-2 px-6 rounded-full bg-red-50 border border-red-100 text-[#E11D48] font-bold tracking-widest uppercase mb-6 text-sm">Our Community</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Hear from Our Scholars</h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">Discover how LSCSI's scholarship programs are transforming lives and empowering the next generation of leaders.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Testimony 1 */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        <div className="flex text-yellow-400 mb-6 text-sm space-x-1">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium mb-8">
                            "The academic scholarship I received from LSCSI didn't just ease my family's financial burden—it gave me the confidence to pursue my dream of becoming an engineer. The teachers here really care about our future."
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-red-50 rounded-full flex justify-center items-center font-bold text-2xl text-[#E11D48] border border-red-100">
                                E
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Elijah Santos</h4>
                                <p className="text-sm text-[#E11D48] font-semibold">Grade 12 Academic Scholar</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimony 2 */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        <div className="flex text-yellow-400 mb-6 text-sm space-x-1">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium mb-8">
                            "Thanks to the sibling discount and early bird enrollment, all three of us siblings can attend LSCS together. It's a true blessing to be part of a school that feels like a family and supports its community so strongly."
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-blue-50 rounded-full flex justify-center items-center font-bold text-2xl text-blue-600 border border-blue-100">
                                M
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Maria Garcia</h4>
                                <p className="text-sm text-blue-600 font-semibold">Parent of 3 Enrolled Students</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-16">
                 <h2 className="text-4xl font-black text-gray-900">Common Questions</h2>
                 <p className="text-gray-500 text-lg mt-4">Everything you need to know about joining LSCSI.</p>
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
                                {faq.q.includes('scholarships') && (
                                  <div className="mt-4">
                                    <button 
                                      onClick={() => setIsScholarshipModalOpen(true)}
                                      className="text-[#E11D48] font-bold text-sm flex items-center group focus:outline-none"
                                    >
                                      <i className="fa-solid fa-circle-info mr-2 no-underline"></i>
                                      <span className="group-hover:underline">Click to know more about our discounts and scholarships</span>
                                    </button>
                                  </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="text-center mt-12">
                <p className="text-gray-500">Still have questions?</p>
                <button 
                  onClick={() => onNavigate('Contact')}
                  className="inline-block mt-2 text-[#E11D48] font-bold hover:underline"
                >
                  Contact our Admissions Office
                </button>
            </div>
        </section>

        {/* Scholarships & Discounts Modal */}
        {isScholarshipModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsScholarshipModalOpen(false)}
            ></div>
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeInUp hide-scrollbar">
              <div className="sticky top-0 bg-white/95 backdrop-blur-md px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
                <h3 className="text-2xl font-black text-gray-900">Discounts & Scholarships</h3>
                <button 
                  onClick={() => setIsScholarshipModalOpen(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-red-50 hover:text-[#E11D48] rounded-full flex items-center justify-center transition-colors text-gray-500"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-[#E11D48] mb-2 flex items-center">
                    <i className="fa-solid fa-users mr-3"></i> Sibling Discount
                  </h4>
                  <p className="text-gray-700 mb-3">Families with multiple children enrolled at LSCSI are eligible for our sibling discounts applied to tuition fees:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                    <li><strong>2nd Child:</strong> 5% Discount</li>
                    <li><strong>3rd Child:</strong> 10% Discount</li>
                    <li><strong>4th Child (and subsequent):</strong> 15% Discount</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <i className="fa-solid fa-medal text-yellow-500 mr-3"></i> Academic Scholarships
                  </h4>
                  <p className="text-gray-700">
                    We reward academic excellence. Incoming students who graduated with High Honors or Highest Honors from their previous school may apply for partial or full tuition discounts, subject to available slots and assessment.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <i className="fa-solid fa-clock text-blue-500 mr-3"></i> Early Bird Enrollment
                  </h4>
                  <p className="text-gray-700">
                    Enroll before the end of March to receive a special early bird discount on miscellaneous fees.
                  </p>
                </div>
              </div>

              <div className="px-8 py-6 bg-gray-50 text-center rounded-b-[2rem]">
                <p className="text-sm text-gray-500 mb-4">Terms and conditions apply. For exact computation, please contact the admissions office.</p>
                <button 
                  onClick={() => {
                    setIsScholarshipModalOpen(false);
                    onNavigate('Contact');
                  }}
                  className="bg-[#E11D48] text-white px-6 py-3 md:px-8 md:py-3 rounded-full font-bold hover:bg-rose-500 shadow-md hover:shadow-lg transition-all"
                >
                  Contact Admissions for Details
                </button>
              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default Admissions;