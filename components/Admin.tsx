import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarEvent, PopupData, GalleryImage } from '../types';

interface AdminProps {
  calendarEvents?: CalendarEvent[];
  setCalendarEvents?: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  calendarPdfUrl?: string | null;
  setCalendarPdfUrl?: React.Dispatch<React.SetStateAction<string | null>>;
  popups?: PopupData[];
  setPopups?: React.Dispatch<React.SetStateAction<PopupData[]>>;
  galleryImages?: GalleryImage[];
  setGalleryImages?: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  galleryCategories?: string[];
  setGalleryCategories?: React.Dispatch<React.SetStateAction<string[]>>;
}

const Admin: React.FC<AdminProps> = ({ 
  calendarEvents = [], setCalendarEvents, 
  calendarPdfUrl, setCalendarPdfUrl, 
  popups = [], setPopups,
  galleryImages = [], setGalleryImages,
  galleryCategories = [], setGalleryCategories
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'popup' | 'info' | 'media' | 'chatbot' | 'calendar'>('popup');
  const [editingPopup, setEditingPopup] = useState<Partial<PopupData> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<CalendarEvent> | null>(null);

  const [newPhotoSrc, setNewPhotoSrc] = useState('');
  const [newPhotoAlt, setNewPhotoAlt] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState(galleryCategories[1] || 'All');
  const [newCategory, setNewCategory] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [calendarFileName, setCalendarFileName] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');

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
      <div className="flex min-h-screen bg-gray-50 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-20">
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
      <div className="block min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
          <div>
            <h1 className="text-3xl font-black text-gray-900 break-words">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage school information, media, and AI counselor settings.
            </p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="text-gray-500 hover:text-gray-900 text-sm font-bold transition-colors whitespace-nowrap"
          >
            Sign out <i className="fa-solid fa-arrow-right-from-bracket ml-1"></i>
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-4">
            <nav className="flex flex-wrap md:flex-col gap-2 md:space-y-2">
              <button
                onClick={() => setActiveTab('popup')}
                className={`whitespace-nowrap w-auto md:w-full flex-1 md:flex-none justify-center md:justify-start flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
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
                className={`whitespace-nowrap w-auto md:w-full flex-1 md:flex-none justify-center md:justify-start flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
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
                className={`whitespace-nowrap w-auto md:w-full flex-1 md:flex-none justify-center md:justify-start flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
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
                className={`whitespace-nowrap w-auto md:w-full flex-1 md:flex-none justify-center md:justify-start flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
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
                className={`whitespace-nowrap w-auto md:w-full flex-1 md:flex-none justify-center md:justify-start flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'calendar'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-regular fa-calendar-check w-6 text-center"></i>
                School Calendar
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 md:p-8 bg-white min-w-0 overflow-x-hidden">
            {activeTab === 'calendar' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-2 mb-6 gap-4 sm:gap-0">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 border-none">School Calendar</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage events, holidays, and academic schedules.</p>
                  </div>
                  <button 
                    className="bg-[#E11D48] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition flex items-center whitespace-nowrap"
                    onClick={() => setEditingEvent({ id: '', title: '', date: new Date().toISOString().split('T')[0], category: 'Academic' })}
                  >
                    <i className="fa-solid fa-plus mr-2"></i> Add Event
                  </button>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Yearly Calendar Document</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload a PDF or Image of the annual academic calendar so parents can download it directly.</p>
                  <div className="flex items-center space-x-3">
                    <label className="cursor-pointer bg-red-50 text-red-700 hover:bg-red-100 font-semibold py-2 px-4 rounded-lg text-sm transition-colors text-center inline-block">
                      <span>Choose File</span>
                      <input 
                        type="file" 
                        accept=".pdf,image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && setCalendarPdfUrl) {
                            setCalendarFileName(file.name);
                            const url = URL.createObjectURL(file);
                            setCalendarPdfUrl(url);
                          } else {
                            setCalendarFileName('');
                          }
                        }}
                      />
                    </label>
                    <span className="text-sm text-gray-500 truncate max-w-xs block">
                      {calendarFileName || 'No file chosen'}
                    </span>
                  </div>
                  {calendarPdfUrl && (
                    <div className="mt-4 flex items-center text-green-600 font-bold text-sm">
                      <i className="fa-solid fa-check-circle mr-2"></i> Document Uploaded
                    </div>
                  )}
                </div>
                
                <div className="bg-white border text-left border-gray-200 rounded-xl overflow-x-auto shadow-sm">
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
                            <button 
                              className="text-blue-600 hover:text-blue-900 mr-4"
                              onClick={() => setEditingEvent(ev)}
                            >
                              Edit
                            </button>
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-2 mb-6 gap-4 sm:gap-0">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 border-none">Popup Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage popups, visibility dates, and images.</p>
                  </div>
                  {!editingPopup ? (
                    <button 
                      className="bg-[#E11D48] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition flex items-center whitespace-nowrap"
                      onClick={() => setEditingPopup({ isActive: true, startDate: new Date().toISOString().split('T')[0], endDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] })}
                    >
                      <i className="fa-solid fa-plus mr-2"></i> Add Popup
                    </button>
                  ) : (
                    <button 
                      className="text-gray-500 hover:text-gray-700 transition font-bold whitespace-nowrap flex items-center"
                      onClick={() => setEditingPopup(null)}
                    >
                      <i className="fa-solid fa-arrow-left mr-2"></i> Back to List
                    </button>
                  )}
                </div>

                {!editingPopup ? (
                  <div className="bg-white border text-left border-gray-200 rounded-xl overflow-x-auto shadow-sm">
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
                        <DatePicker 
                          selected={editingPopup.startDate ? new Date(editingPopup.startDate) : null}
                          onChange={(date) => setEditingPopup({...editingPopup, startDate: date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : ''})}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="YYYY-MM-DD"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">End Date</label>
                        <DatePicker 
                          selected={editingPopup.endDate ? new Date(editingPopup.endDate) : null}
                          onChange={(date) => setEditingPopup({...editingPopup, endDate: date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : ''})}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="YYYY-MM-DD"
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
                <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 border-b border-gray-200 p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">🏷️ Gallery Categories (Tags)</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {galleryCategories.filter(cat => cat !== 'All').map(cat => (
                        <span key={cat} className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700">
                          {cat}
                          <button 
                            className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
                            onClick={() => {
                              if (setGalleryCategories) {
                                setGalleryCategories(galleryCategories.filter(c => c !== cat));
                              }
                              // Also remove category from images? Could be 'All' for deleted tags
                              if (setGalleryImages) {
                                setGalleryImages(galleryImages.map(img => img.category === cat ? { ...img, category: 'All' } : img));
                              }
                            }}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 max-w-sm">
                      <input 
                        type="text" 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New tag name (e.g. Events)" 
                        className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                      />
                      <button 
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-gray-900 transition whitespace-nowrap"
                        onClick={() => {
                          if (newCategory.trim() && setGalleryCategories && !galleryCategories.includes(newCategory.trim())) {
                            setGalleryCategories([...galleryCategories, newCategory.trim()]);
                            setNewCategory('');
                          }
                        }}
                      >
                        Add Tag
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-white border-b border-gray-200 space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">📸 Add New Photo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Upload Photo</label>
                        <div className="flex items-center space-x-3 mt-1.5 h-[38px] border border-gray-300 rounded-lg px-2">
                          <label className="cursor-pointer bg-red-50 text-red-700 hover:bg-red-100 font-semibold py-1 px-3 rounded-lg text-sm transition-colors text-center inline-block">
                            <span>Choose File</span>
                            <input 
                              type="file" 
                              accept="image/*"
                              ref={fileInputRef}
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  setPhotoFileName(file.name);
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    setNewPhotoSrc(event.target?.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                } else {
                                  setPhotoFileName('');
                                }
                              }}
                            />
                          </label>
                          <span className="text-sm text-gray-500 truncate block">
                            {photoFileName || 'No file chosen'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Description (Alt Text)</label>
                        <input 
                          type="text" 
                          value={newPhotoAlt}
                          onChange={(e) => setNewPhotoAlt(e.target.value)}
                          placeholder="E.g., Students playing" 
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Tag / Category</label>
                        <select 
                          value={newPhotoCategory}
                          onChange={(e) => setNewPhotoCategory(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                        >
                          {galleryCategories.filter(cat => cat !== 'All').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button 
                          className="w-full bg-[#E11D48] text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-red-700 transition"
                          onClick={() => {
                            if (newPhotoSrc && newPhotoAlt && setGalleryImages) {
                              setGalleryImages([
                                {
                                  id: Math.random().toString(36).substr(2, 9),
                                  src: newPhotoSrc,
                                  alt: newPhotoAlt,
                                  category: newPhotoCategory || galleryCategories[1] || 'All'
                                },
                                ...galleryImages
                              ]);
                              setNewPhotoSrc('');
                              setNewPhotoAlt('');
                              setPhotoFileName('');
                              if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                              }
                            } else {
                              alert('Please provide an image file and description.');
                            }
                          }}
                        >
                          Add to Gallery
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 p-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Current Gallery Images</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                      {galleryImages.map(img => (
                        <div key={img.id} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                          <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center">
                            <span className="truncate pr-2">{img.category}</span>
                            <button 
                              className="bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded flex items-center justify-center shrink-0"
                              onClick={() => {
                                if (setGalleryImages) {
                                  setGalleryImages(galleryImages.filter(i => i.id !== img.id));
                                }
                              }}
                            >
                              <i className="fa-solid fa-trash text-[10px]"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
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
                     <label className="block text-sm font-bold text-gray-700 mb-1">Chatbot Activation (Show on website)</label>
                     <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none">
                        <option>Always visible (Bottom right)</option>
                        <option>Pop-up only during admission season</option>
                        <option>Disabled (Hidden)</option>
                     </select>
                  </div>
                </div>

                <div className="pt-4 text-right">
                  <button 
                    className="bg-[#E11D48] text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition"
                    onClick={() => alert('Settings saved successfully!')}
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {editingEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingEvent.id ? 'Edit Event' : 'Add Event'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Event Title</label>
                <input 
                  type="text" 
                  value={editingEvent.title || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="e.g. Opening of Classes"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
                  <DatePicker 
                    selected={editingEvent.date ? new Date(editingEvent.date + 'T00:00:00') : null}
                    onChange={(date) => setEditingEvent({ ...editingEvent, date: date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '' })}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">End Date (Optional)</label>
                  <DatePicker 
                    selected={editingEvent.endDate ? new Date(editingEvent.endDate + 'T00:00:00') : null}
                    onChange={(date) => setEditingEvent({ ...editingEvent, endDate: date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '' })}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <select 
                   value={editingEvent.category || 'Academic'}
                   onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                   className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                >
                  <option value="Academic">Academic</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Religious">Religious</option>
                  <option value="Special">Special / Other</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition"
                onClick={() => setEditingEvent(null)}
              >
                Cancel
              </button>
              <button 
                className="bg-[#E11D48] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition"
                onClick={() => {
                  if (setCalendarEvents && editingEvent.title && editingEvent.date) {
                    if (editingEvent.id) {
                      setCalendarEvents(prev => prev.map(ev => ev.id === editingEvent.id ? editingEvent as CalendarEvent : ev));
                    } else {
                      setCalendarEvents(prev => [...prev, { ...editingEvent, id: Date.now().toString() } as CalendarEvent]);
                    }
                    setEditingEvent(null);
                  }
                }}
              >
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
