import React, { useState } from 'react';

const HomeSurvey: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    source: '',
    priority: '',
    contact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.source && formData.priority && formData.contact) {
      setSubmitted(true);
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  if (submitted) {
    return (
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto bg-green-50 rounded-[3rem] p-12 md:p-20 text-center border-2 border-green-100 animate-fadeIn">
          <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-lg">
            <i className="fa-solid fa-check"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 font-display">Thank You for Your Feedback!</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Your responses help us improve our school community. 
            May the Lord bless you and keep you.
          </p>
          <div className="inline-block bg-white px-8 py-4 rounded-2xl shadow-sm border border-green-100 italic text-green-700">
            "Direct your children onto the right path, and when they are older, they will not leave it." - Proverbs 22:6
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#E11D48] font-bold tracking-widest uppercase text-sm">Quick Survey</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">Help Us Grow</h2>
          <p className="text-gray-500 text-lg mt-4">We'd love to hear your thoughts about our school family.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] shadow-xl p-8 md:p-16 border border-gray-100">
          <div className="space-y-12">
            {/* Question 1 */}
            <div className="space-y-6">
              <label className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                <span className="w-10 h-10 bg-red-50 text-[#E11D48] rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-base">1</span>
                How did you hear about LSCS?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-0 md:ml-14">
                {['Social Media', 'Friends/Family', 'Website Search', 'Signage/Banner'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, source: option })}
                    className={`px-6 py-4 rounded-2xl text-left font-bold transition-all border-2 ${
                      formData.source === option 
                        ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-lg' 
                        : 'bg-gray-50 text-gray-600 border-transparent hover:border-red-100 hover:bg-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-6">
              <label className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                <span className="w-10 h-10 bg-red-50 text-[#E11D48] rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-base">2</span>
                What is most important in a school?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-0 md:ml-14">
                {['Academic Excellence', 'Christian Values', 'Modern Facilities', 'School Community'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: option })}
                    className={`px-6 py-4 rounded-2xl text-left font-bold transition-all border-2 ${
                      formData.priority === option 
                        ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-lg' 
                        : 'bg-gray-50 text-gray-600 border-transparent hover:border-red-100 hover:bg-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div className="space-y-6">
              <label className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                <span className="w-10 h-10 bg-red-50 text-[#E11D48] rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-base">3</span>
                Interested in an admissions call?
              </label>
              <div className="flex flex-col sm:flex-row gap-4 ml-0 md:ml-14">
                {['Yes, please!', 'Maybe later', 'Just browsing'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, contact: option })}
                    className={`flex-1 px-6 py-4 rounded-2xl text-center font-bold transition-all border-2 ${
                      formData.contact === option 
                        ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-lg' 
                        : 'bg-gray-50 text-gray-600 border-transparent hover:border-red-100 hover:bg-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100 text-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-slate-900 text-white px-6 py-3 md:px-12 md:py-5 rounded-2xl font-bold text-base md:text-xl hover:bg-black hover:scale-105 active:scale-95 transition shadow-xl"
            >
              Submit Responses <i className="fa-solid fa-paper-plane ml-3"></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HomeSurvey;