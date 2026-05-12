import React, { useState } from 'react';
import { CalendarEvent } from '../types';

interface AdminProps {
  calendarEvents?: CalendarEvent[];
  setCalendarEvents?: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
}

const Admin: React.FC<AdminProps> = ({ calendarEvents = [], setCalendarEvents }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'popup' | 'info' | 'media' | 'chatbot' | 'calendar' | 'settings'>('popup');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
          <div>
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-[#E11D48]">
                <i className="fa-solid fa-lock text-2xl"></i>
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-black text-gray-900">
              Admin Portal
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to manage the school website
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#E11D48] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage school information, media, and AI counselor settings.
            </p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="text-gray-500 hover:text-gray-900 text-sm font-bold transition-colors"
          >
            Sign out
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('popup')}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'popup'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-solid fa-bell w-6 text-center"></i>
                Emergency Popups
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'info'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-solid fa-school w-6 text-center"></i>
                School Basic Info
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'media'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-solid fa-photo-film w-6 text-center"></i>
                Media & Documents
              </button>
              <button
                onClick={() => setActiveTab('chatbot')}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'chatbot'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-solid fa-robot w-6 text-center"></i>
                AI Chatbot Settings
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'calendar'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-regular fa-calendar-check w-6 text-center"></i>
                School Calendar
              </button>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-gray-800 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className="fa-solid fa-gear w-6 text-center"></i>
                  Account Settings
                </button>
              </div>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 bg-white">
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Account Settings</h2>
                  <p className="text-gray-600 mb-6">Manage your admin credentials and account recovery options.</p>
                </div>

                <div className="space-y-8">
                   {/* Password Change */}
                   <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <i className="fa-solid fa-key mr-2 text-gray-500"></i> Change Password
                      </h3>
                      <div className="space-y-4 max-w-sm">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Current Password</label>
                          <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-gray-800 focus:border-gray-800 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-gray-800 focus:border-gray-800 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-gray-800 focus:border-gray-800 outline-none" />
                        </div>
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-gray-900 transition mt-2">
                          Update Password
                        </button>
                      </div>
                   </div>

                   {/* Recovery Email */}
                   <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                      <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
                        <i className="fa-solid fa-envelope-circle-check mr-2 text-blue-600"></i> Security & Recovery Email
                      </h3>
                      <p className="text-sm text-blue-700 mb-4">Set a recovery email address in case you forget your admin password.</p>
                      
                      <div className="flex gap-3 max-w-md">
                        <input type="email" placeholder="admin-recovery@example.com" className="flex-1 border border-blue-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition whitespace-nowrap">
                          Save Email
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-end border-b pb-2 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 border-none">School Calendar</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage events, holidays, and academic schedules.</p>
                  </div>
                  <button 
                    className="bg-[#E11D48] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition flex items-center"
                    onClick={() => {
                      if (setCalendarEvents) {
                        setCalendarEvents(prev => [...prev, {
                          id: Date.now().toString(),
                          title: 'New Event',
                          date: new Date().toISOString().split('T')[0],
                          category: 'Academic'
                        }]);
                      }
                    }}
                  >
                    <i className="fa-solid fa-plus mr-2"></i> Add Event
                  </button>
                </div>
                
                <div className="bg-white border text-left border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {calendarEvents.map(ev => (
                        <tr key={ev.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {ev.date}
                            {ev.endDate && <span className="text-gray-500 font-normal"> to {ev.endDate}</span>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                            {ev.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${ev.category === 'Holiday' ? 'bg-red-100 text-[#E11D48] border-red-200' : ev.category === 'Religious' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                              {ev.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                            <button 
                              className="text-red-600 hover:text-red-900"
                              onClick={() => {
                                if (setCalendarEvents) {
                                  setCalendarEvents(prev => prev.filter(e => e.id !== ev.id));
                                }
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {calendarEvents.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                            No upcoming events.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'popup' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Emergency Popup Management</h2>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div>
                    <h3 className="font-bold text-gray-900">Enable Popup</h3>
                    <p className="text-sm text-gray-500">Show an emergency popup to visitors on the main page.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#E11D48]"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Notice Title</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="e.g., School closure due to severe weather" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Details</label>
                    <textarea rows={4} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="Please provide the detailed message here."></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Attached Image URL (Optional)</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="Image link URL" />
                  </div>
                </div>

                <div className="pt-4 text-right">
                  <button className="bg-[#E11D48] text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition">Save Changes</button>
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">School Basic Info (For AI Learning)</h2>
                  <p className="text-gray-600 mb-6">The information entered here helps the AI Counselor accurately answer questions from parents and students.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Tuition & Fees Guide</label>
                    <textarea rows={3} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="Tuition by grade, payment period, etc." defaultValue="Preschool: 3,000,000 KRW/year&#10;Elementary: 4,500,000 KRW/year"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Admission Process Summary</label>
                    <textarea rows={3} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="Step-by-step admission process" defaultValue="1. Submit application and documents&#10;2. Student interview and level test&#10;3. Parent interview&#10;4. Final decision and tuition payment"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Key Curriculum Features</label>
                    <textarea rows={3} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="Specialized school curriculum" defaultValue="Bilingual (English/Korean) education based on a biblical worldview. Project-Based Learning (PBL) and creative character education."></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Frequently Asked Questions (FAQ Data)</label>
                    <textarea rows={4} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="Write in Q&A format" defaultValue="Q: Is there a school bus?&#10;A: Yes, we run school buses to major areas (Antipolo, Manila, etc.)."></textarea>
                  </div>
                </div>

                <div className="pt-4 text-right">
                   <button className="bg-[#E11D48] text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition">Update Data (Sync with AI)</button>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Media & Document Management</h2>
                </div>

                {/* Photos */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">📸 Upload Recent Photos</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer">
                    <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-400 mb-3"></i>
                    <p className="text-gray-600 font-medium">Click or drag photo files here.</p>
                    <p className="text-xs text-gray-400 mt-1">Supported formats: JPG, PNG, WEBP (Max 5MB)</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {/* Placeholder images */}
                    {[1, 2, 3].map(i => (
                      <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                        <img src={`https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop`} alt="School" className="w-full h-full object-cover" />
                         <button className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition shadow hover:bg-red-600">
                           <i className="fa-solid fa-trash text-sm"></i>
                         </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PDFs */}
                <div className="mb-8 border-t pt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">📄 Upload Documents for Parents</h3>
                  <div className="border border-gray-200 rounded-xl divide-y">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-xl">
                       <span className="font-bold text-gray-700 text-sm">Currently Registered Documents</span>
                       <button className="text-[#E11D48] text-sm font-bold hover:underline"><i className="fa-solid fa-plus mr-1"></i> Add New Document</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white">
                      <div className="flex items-center text-gray-700">
                        <i className="fa-regular fa-file-pdf text-red-500 text-xl mr-3"></i>
                        <span>2026_Admission_Application.pdf</span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white">
                      <div className="flex items-center text-gray-700">
                         <i className="fa-regular fa-file-pdf text-red-500 text-xl mr-3"></i>
                         <span>Academic_Calendar.pdf</span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chatbot' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">AI Chatbot Settings</h2>
                </div>

                <div className="space-y-6">
                   <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Welcome Message</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" defaultValue="Hello! I am the LSCS AI Counselor. Ask me anything about admissions or school life!" />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-3">Counselor Tone & Persona</label>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="border-2 border-red-500 bg-red-50/30 p-4 rounded-xl cursor-pointer flex items-start">
                          <input type="radio" name="tone" className="mt-1 mr-3 text-red-600 focus:ring-red-500" defaultChecked />
                          <div>
                            <span className="block font-bold text-gray-900">Friendly & Warm Tone</span>
                            <span className="text-sm text-gray-500 mt-1 block">Warm, easy-to-understand tone with emojis, like an elementary school teacher 😊</span>
                          </div>
                        </label>
                        <label className="border border-gray-200 hover:border-red-300 p-4 rounded-xl cursor-pointer flex items-start transition">
                          <input type="radio" name="tone" className="mt-1 mr-3 text-red-600 focus:ring-red-500" />
                          <div>
                             <span className="block font-bold text-gray-900">Professional Admissions Tone</span>
                             <span className="text-sm text-gray-500 mt-1 block">Clean, refined tone prioritizing accurate information delivery.</span>
                          </div>
                        </label>
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-1">Chatbot Activation (Show on website)</label>
                     <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none">
                        <option>Always visible (Bottom right)</option>
                        <option>Pop-up only during admission season</option>
                        <option>Disabled (Hidden)</option>
                     </select>
                  </div>
                </div>

                <div className="pt-4 text-right">
                  <button className="bg-[#E11D48] text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition">Save Settings</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
