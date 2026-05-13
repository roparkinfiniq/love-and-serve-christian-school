import React, { useState } from 'react';
import { CalendarEvent, PopupData } from '../types';

interface AdminProps {
  calendarEvents?: CalendarEvent[];
  setCalendarEvents?: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  calendarPdfUrl?: string | null;
  setCalendarPdfUrl?: React.Dispatch<React.SetStateAction<string | null>>;
  popups?: PopupData[];
  setPopups?: React.Dispatch<React.SetStateAction<PopupData[]>>;
}

const Admin: React.FC<AdminProps> = ({ calendarEvents = [], setCalendarEvents, calendarPdfUrl, setCalendarPdfUrl, popups = [], setPopups }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'popup' | 'info' | 'media' | 'chatbot' | 'calendar' | 'settings'>('popup');
  const [editingPopup, setEditingPopup] = useState<Partial<PopupData> | null>(null);

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
      <>
        {/* Mobile Warning */}
        <div className="flex lg:hidden min-h-screen bg-gray-50 flex-col items-center justify-center p-6 pt-28">
          <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-sm mx-auto mt-20">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-desktop text-2xl text-[#E11D48]"></i>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Desktop Only</h2>
            <p className="text-gray-500">The Admin Dashboard is optimized for larger screens. Please access this page from a desktop or tablet.</p>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex min-h-screen bg-gray-50 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-20">
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
      </>
    );
  }

  return (
    <>
      {/* Mobile Warning */}
      <div className="flex lg:hidden min-h-screen bg-gray-50 flex-col items-center justify-center p-6 pt-28">
        <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-sm mx-auto mt-20">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-desktop text-2xl text-[#E11D48]"></i>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Desktop Only</h2>
          <p className="text-gray-500">The Admin Dashboard is optimized for larger screens. Please access this page from a desktop or tablet.</p>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20 animate-fadeIn">
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

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Yearly Calendar Document</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload a PDF or Image of the annual academic calendar so parents can download it directly.</p>
                  <input 
                    type="file" 
                    accept=".pdf,image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && setCalendarPdfUrl) {
                        const url = URL.createObjectURL(file);
                        setCalendarPdfUrl(url);
                      }
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-colors"
                  />
                  {calendarPdfUrl && (
                    <div className="mt-4 flex items-center text-green-600 font-bold text-sm">
                      <i className="fa-solid fa-check-circle mr-2"></i> Document Uploaded
                    </div>
                  )}
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
                <div className="flex justify-between items-end border-b pb-2 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 border-none">Popup Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage popups, visibility dates, and images.</p>
                  </div>
                  {!editingPopup ? (
                    <button 
                      className="bg-[#E11D48] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition flex items-center"
                      onClick={() => setEditingPopup({ isActive: true, startDate: new Date().toISOString().split('T')[0], endDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] })}
                    >
                      <i className="fa-solid fa-plus mr-2"></i> Add Popup
                    </button>
                  ) : (
                    <button 
                      className="text-gray-500 hover:text-gray-700 transition font-bold"
                      onClick={() => setEditingPopup(null)}
                    >
                      <i className="fa-solid fa-arrow-left mr-2"></i> Back to List
                    </button>
                  )}
                </div>

                {!editingPopup ? (
                  <div className="bg-white border text-left border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {popups.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                         No popups found. Click "Add Popup" to create one.
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dates</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {popups.map((popup) => (
                            <tr key={popup.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-none">
                                {popup.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-none">
                                {popup.startDate} to {popup.endDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap border-none">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${popup.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {popup.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-none space-x-3">
                                <button
                                  className="text-blue-600 hover:text-blue-900"
                                  onClick={() => setEditingPopup(popup)}
                                >
                                  <i className="fa-solid fa-pen-to-square"></i> Edit
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => setPopups && setPopups(popups.filter(p => p.id !== popup.id))}
                                >
                                  <i className="fa-solid fa-trash"></i> Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Popup Title</label>
                      <input 
                        type="text" 
                        value={editingPopup.title || ''}
                        onChange={(e) => setEditingPopup({...editingPopup, title: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                        placeholder="e.g., Summer Camp Registration" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                      <input 
                        type="text" 
                        value={editingPopup.imageUrl || ''}
                        onChange={(e) => setEditingPopup({...editingPopup, imageUrl: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                        placeholder="https://..." 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Link URL (Optional link when image clicked)</label>
                      <input 
                        type="text" 
                        value={editingPopup.linkUrl || ''}
                        onChange={(e) => setEditingPopup({...editingPopup, linkUrl: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                        placeholder="https://..." 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
                        <input 
                          type="date" 
                          value={editingPopup.startDate || ''}
                          onChange={(e) => setEditingPopup({...editingPopup, startDate: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">End Date</label>
                        <input 
                          type="date" 
                          value={editingPopup.endDate || ''}
                          onChange={(e) => setEditingPopup({...editingPopup, endDate: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                       <div>
                         <h3 className="font-bold text-gray-900">Manually Enable/Disable</h3>
                         <p className="text-sm text-gray-500">Toggle this to force hide or show the popup within its dates.</p>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                         <input 
                           type="checkbox" 
                           checked={editingPopup.isActive}
                           onChange={(e) => setEditingPopup({...editingPopup, isActive: e.target.checked})}
                           className="sr-only peer" 
                         />
                         <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#E11D48]"></div>
                       </label>
                    </div>

                    <div className="pt-4 text-right">
                      <button 
                        onClick={() => {
                          if (!editingPopup.title || !editingPopup.startDate || !editingPopup.endDate) {
                            alert("Please fill out required fields: Title, Start Date, End Date.");
                            return;
                          }
                          if (setPopups) {
                            if (editingPopup.id) {
                              setPopups(popups.map(p => p.id === editingPopup.id ? editingPopup as PopupData : p));
                            } else {
                              setPopups([...popups, { ...editingPopup, id: Math.random().toString(36).substr(2, 9) } as PopupData]);
                            }
                            setEditingPopup(null);
                          }
                        }}
                        className="bg-[#E11D48] text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition"
                      >
                        Save Popup
                      </button>
                    </div>
                  </div>
                )}
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
    </>
  );
};

export default Admin;
