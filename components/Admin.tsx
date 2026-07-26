import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  isSupabaseConfigured, 
  deleteGalleryImageFromDb, 
  deleteTeamMemberFromDb, 
  deleteFacilityFromDb, 
  deleteCalendarEventFromDb, 
  deletePopupFromDb,
  fetchInquiries,
  deleteInquiryFromDb,
  InquiryData
} from '../services/supabaseClient';

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
  teamMembers?: TeamMember[];
  setTeamMembers?: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  facilitiesList?: FacilityItem[];
  setFacilitiesList?: React.Dispatch<React.SetStateAction<FacilityItem[]>>;
}

const Admin: React.FC<AdminProps> = ({ 
  calendarEvents = [], setCalendarEvents, 
  calendarPdfUrl, setCalendarPdfUrl, 
  popups = [], setPopups,
  galleryImages = [], setGalleryImages,
  galleryCategories = [], setGalleryCategories,
  teamMembers = [], setTeamMembers,
  facilitiesList = [], setFacilitiesList
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'popup' | 'inquiries' | 'team' | 'facilities' | 'media' | 'calendar'>('popup');
  const [editingPopup, setEditingPopup] = useState<Partial<PopupData> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<CalendarEvent> | null>(null);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);

  React.useEffect(() => {
    async function loadInquiries() {
      const data = await fetchInquiries();
      setInquiries(data);
    }
    loadInquiries();
  }, [activeTab]);

  // Team & Facility Edit States
  const [editingTeamMember, setEditingTeamMember] = useState<Partial<TeamMember> | null>(null);
  const [teamFilterCategory, setTeamFilterCategory] = useState<string>('all');
  const [teamFileName, setTeamFileName] = useState('');

  const [editingFacility, setEditingFacility] = useState<Partial<FacilityItem> | null>(null);
  const [facilityFileName, setFacilityFileName] = useState('');

  const [newPhotoSrc, setNewPhotoSrc] = useState('');
  const [newPhotoAlt, setNewPhotoAlt] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState(galleryCategories[1] || 'All');
  const [newCategory, setNewCategory] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [calendarFileName, setCalendarFileName] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');
  
  const [calendarFilterMonth, setCalendarFilterMonth] = useState<string>('all');
  const [calendarFilterCategory, setCalendarFilterCategory] = useState<string>('all');

  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<GalleryImage | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Team Member CRUD Handlers
  const handleSaveTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeamMember || !editingTeamMember.name || !editingTeamMember.role) {
      showToast('Name and Role are required.', 'error');
      return;
    }

    const memberToSave: TeamMember = {
      id: editingTeamMember.id || `t_${Date.now()}`,
      name: editingTeamMember.name,
      role: editingTeamMember.role,
      category: (editingTeamMember.category as any) || 'Faculty',
      image: editingTeamMember.image || '',
      message: editingTeamMember.message || '',
      position: editingTeamMember.position || 'center top'
    };

    if (editingTeamMember.id) {
      setTeamMembers?.(prev => prev.map(m => m.id === memberToSave.id ? memberToSave : m));
      showToast('Team member updated successfully!');
    } else {
      setTeamMembers?.(prev => [...prev, memberToSave]);
      showToast('New team member added successfully!');
    }
    setEditingTeamMember(null);
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      await deleteTeamMemberFromDb(id);
      setTeamMembers?.(prev => prev.filter(m => m.id !== id));
      showToast('Team member deleted.');
    }
  };

  const handleMoveTeamMember = (id: string, direction: 'up' | 'down') => {
    if (!setTeamMembers || teamFilterCategory === 'all') return;
    
    const categoryMembers = teamMembers.filter(m => m.category === teamFilterCategory);
    const catIndex = categoryMembers.findIndex(m => m.id === id);
    if (catIndex === -1) return;
    
    const targetCatIndex = direction === 'up' ? catIndex - 1 : catIndex + 1;
    if (targetCatIndex < 0 || targetCatIndex >= categoryMembers.length) return;
    
    const targetMember = categoryMembers[targetCatIndex];
    
    const globalIdx1 = teamMembers.findIndex(m => m.id === id);
    const globalIdx2 = teamMembers.findIndex(m => m.id === targetMember.id);
    if (globalIdx1 === -1 || globalIdx2 === -1) return;

    const newTeam = [...teamMembers];
    const temp = newTeam[globalIdx1];
    newTeam[globalIdx1] = newTeam[globalIdx2];
    newTeam[globalIdx2] = temp;

    setTeamMembers(newTeam);
    showToast('Member order updated!');
  };

  const handleSaveFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFacility || !setFacilitiesList) return;

    const facilityToSave: FacilityItem = {
      ...editingFacility,
      id: editingFacility.id || Math.random().toString(36).substr(2, 9)
    };

    if (editingFacility.id) {
      setFacilitiesList(facilitiesList.map(f => f.id === editingFacility.id ? facilityToSave : f));
      showToast('Facility updated successfully!');
    } else {
      setFacilitiesList([...facilitiesList, facilityToSave]);
      showToast('New facility added successfully!');
    }
    setEditingFacility(null);
  };

  const handleDeleteFacility = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this facility?')) {
      await deleteFacilityFromDb(id);
      setFacilitiesList?.(prev => prev.filter(f => f.id !== id));
      showToast('Facility deleted.');
    }
  };

  const handleFacilityImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFacilityFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingFacility(prev => prev ? { ...prev, image: reader.result as string } : { image: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      setFacilityFileName('');
    }
  };

  const insertMarkdown = (prefix: string, suffix: string) => {
    const textarea = document.getElementById('popup-content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = editingPopup?.content || '';
    
    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);
    
    setEditingPopup({ ...editingPopup, content: newText });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const filteredCalendarEvents = calendarEvents.filter(ev => {
    let matchesCategory = true;
    let matchesMonth = true;
    
    if (calendarFilterCategory !== 'all' && ev.category !== calendarFilterCategory) {
      matchesCategory = false;
    }
    
    if (calendarFilterMonth !== 'all') {
      const eventMonth = new Date(ev.date).getMonth() + 1;
      if (eventMonth.toString() !== calendarFilterMonth) {
        matchesMonth = false;
      }
    }
    
    return matchesCategory && matchesMonth;
  });

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
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-red-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#E11D48] hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 shadow-md transition-colors"
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
              Manage school information, media, emergency popups, and calendar.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="text-gray-500 hover:text-gray-900 text-sm font-bold transition-colors whitespace-nowrap"
            >
              Sign out <i className="fa-solid fa-arrow-right-from-bracket ml-1"></i>
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-3 md:p-4">
            <nav className="flex flex-nowrap md:flex-col gap-2 md:space-y-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
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
                onClick={() => setActiveTab('inquiries')}
                className={`whitespace-nowrap w-auto md:w-full flex-1 md:flex-none justify-between flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'inquiries'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center">
                  <i className="fa-solid fa-envelope w-6 text-center"></i>
                  Contact Messages
                </span>
                {inquiries.length > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'inquiries' ? 'bg-white text-[#E11D48]' : 'bg-red-100 text-red-600'
                  }`}>
                    {inquiries.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`whitespace-nowrap w-auto md:w-full flex-1 md:flex-none justify-center md:justify-start flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'team'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-solid fa-users w-6 text-center"></i>
                Our Team (Faculty)
              </button>
              <button
                onClick={() => setActiveTab('facilities')}
                className={`whitespace-nowrap w-auto md:w-full flex-1 md:flex-none justify-center md:justify-start flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'facilities'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-solid fa-building w-6 text-center"></i>
                Campus Facilities
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
            {activeTab === 'inquiries' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4 sm:gap-0">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 border-none">Contact Form Messages ({inquiries.length})</h2>
                    <p className="text-gray-500 text-sm mt-1">Messages and inquiries submitted by parents and students via Contact Us page.</p>
                  </div>
                  <button 
                    onClick={async () => {
                      const data = await fetchInquiries();
                      setInquiries(data);
                      showToast('Messages refreshed');
                    }}
                    className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition flex items-center gap-2"
                  >
                    <i className="fa-solid fa-arrows-rotate"></i> Refresh Inbox
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <i className="fa-solid fa-inbox text-5xl text-gray-300 mb-4"></i>
                    <p className="text-gray-700 font-bold text-base">No contact messages yet.</p>
                    <p className="text-xs text-gray-400 mt-1">Submissions from the Contact Us form will appear here in real-time.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3 border-b border-gray-100 pb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-50 text-[#E11D48] flex items-center justify-center font-bold text-sm shrink-0">
                              {inq.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm">{inq.name}</h4>
                              <a href={`mailto:${inq.email}`} className="text-xs text-[#E11D48] hover:underline flex items-center gap-1">
                                <i className="fa-solid fa-envelope text-[10px]"></i> {inq.email}
                              </a>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                              {inq.subject}
                            </span>
                            {inq.created_at && (
                              <span className="text-[11px] text-gray-400">
                                {new Date(inq.created_at).toLocaleDateString()} {new Date(inq.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-800 leading-relaxed whitespace-pre-wrap mb-3 border border-gray-100 font-sans">
                          {inq.message}
                        </div>

                        <div className="flex justify-end gap-2">
                          <a 
                            href={`mailto:${inq.email}?subject=Re: [LSCS Inquiry] ${encodeURIComponent(inq.subject)}`}
                            className="px-3.5 py-1.5 bg-[#E11D48] hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5"
                          >
                            <i className="fa-solid fa-reply"></i> Reply via Email
                          </a>
                          <button 
                            onClick={async () => {
                              if (window.confirm('Delete this message?')) {
                                await deleteInquiryFromDb(inq.id);
                                setInquiries(prev => prev.filter(i => i.id !== inq.id));
                                showToast('Message deleted.');
                              }
                            }}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 text-xs font-bold rounded-lg transition flex items-center gap-1.5"
                          >
                            <i className="fa-solid fa-trash-can"></i> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-2 mb-6 gap-4 sm:gap-0">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 border-none">Our Team (Faculty & Staff)</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage leadership, teachers, and support staff details.</p>
                  </div>
                  <button 
                    className="bg-[#E11D48] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-rose-500 transition flex items-center whitespace-nowrap"
                    onClick={() => setEditingTeamMember({ id: '', name: '', role: '', category: 'Faculty', image: '', message: '' })}
                  >
                    <i className="fa-solid fa-plus mr-2"></i> Add Team Member
                  </button>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                  <span className="text-sm font-bold text-gray-700">Category:</span>
                  {['all', 'Leadership', 'Faculty', 'AdminSupport'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setTeamFilterCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                        teamFilterCategory === cat 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat === 'all' ? 'All' : cat === 'AdminSupport' ? 'Admin & Support' : cat}
                    </button>
                  ))}
                </div>

                {/* Team Members List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers
                    .filter(m => teamFilterCategory === 'all' || m.category === teamFilterCategory)
                    .map(member => (
                      <div key={member.id} className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border flex-shrink-0 flex items-center justify-center">
                            {member.image ? (
                              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <i className="fa-solid fa-user text-2xl text-gray-300"></i>
                            )}
                          </div>
                          <div>
                            <span className={`inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mb-1 ${
                              member.category === 'Leadership' ? 'bg-amber-100 text-amber-800' :
                              member.category === 'Faculty' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {member.category}
                            </span>
                            <h4 className="font-bold text-gray-900 text-sm leading-snug">{member.name}</h4>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {teamFilterCategory !== 'all' && (
                            <>
                              <button 
                                type="button"
                                onClick={() => handleMoveTeamMember(member.id, 'up')}
                                disabled={teamMembers.filter(m => m.category === teamFilterCategory).findIndex(m => m.id === member.id) === 0}
                                className="p-1.5 text-gray-400 hover:text-gray-900 disabled:opacity-20 disabled:hover:text-gray-400 transition rounded-lg hover:bg-gray-100"
                                title="Move Up"
                              >
                                <i className="fa-solid fa-arrow-up text-xs"></i>
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleMoveTeamMember(member.id, 'down')}
                                disabled={teamMembers.filter(m => m.category === teamFilterCategory).findIndex(m => m.id === member.id) === teamMembers.filter(m => m.category === teamFilterCategory).length - 1}
                                className="p-1.5 text-gray-400 hover:text-gray-900 disabled:opacity-20 disabled:hover:text-gray-400 transition rounded-lg hover:bg-gray-100"
                                title="Move Down"
                              >
                                <i className="fa-solid fa-arrow-down text-xs"></i>
                              </button>
                            </>
                          )}
                          <button 
                            type="button"
                            onClick={() => setEditingTeamMember(member)}
                            className="p-1.5 text-gray-500 hover:text-[#E11D48] transition rounded-lg hover:bg-gray-100"
                            title="Edit"
                          >
                            <i className="fa-solid fa-pen-to-square text-xs"></i>
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDeleteTeamMember(member.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 transition rounded-lg hover:bg-gray-100"
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash-can text-xs"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'facilities' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-2 mb-6 gap-4 sm:gap-0">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 border-none">Campus Facilities</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage photos, titles, and descriptions of campus facilities.</p>
                  </div>
                  <button 
                    className="bg-[#E11D48] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-rose-500 transition flex items-center whitespace-nowrap"
                    onClick={() => setEditingFacility({ id: '', title: '', desc: '', image: '' })}
                  >
                    <i className="fa-solid fa-plus mr-2"></i> Add Facility
                  </button>
                </div>

                {/* Facilities List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {facilitiesList.map(facility => (
                    <div key={facility.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="h-40 bg-gray-100 relative overflow-hidden">
                          {facility.image ? (
                            <img src={facility.image} alt={facility.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100">
                              <i className="fa-solid fa-building text-4xl text-gray-300"></i>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-gray-900 text-base mb-1">{facility.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{facility.desc}</p>
                        </div>
                      </div>

                      <div className="p-3 border-t bg-gray-50 flex justify-end gap-2">
                        <button 
                          onClick={() => setEditingFacility(facility)}
                          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:text-[#E11D48] transition flex items-center gap-1 shadow-sm"
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteFacility(facility.id)}
                          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition flex items-center gap-1 shadow-sm"
                        >
                          <i className="fa-solid fa-trash-can"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-2 mb-6 gap-4 sm:gap-0">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 border-none">School Calendar</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage events, holidays, and academic schedules.</p>
                  </div>
                  <button 
                    className="bg-[#E11D48] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-rose-500 transition flex items-center whitespace-nowrap"
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
                
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 border border-gray-200 rounded-xl mb-4 gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex flex-col text-left w-full sm:w-auto">
                      <label className="text-xs font-bold text-gray-500 uppercase mb-1">Month</label>
                      <select 
                        value={calendarFilterMonth}
                        onChange={(e) => setCalendarFilterMonth(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#E11D48] focus:border-[#E11D48] block w-full p-2"
                      >
                        <option value="all">All Months</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                          <option key={m} value={m.toString()}>
                            {new Date(2000, m - 1, 1).toLocaleString('en-US', { month: 'long' })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col text-left w-full sm:w-auto">
                      <label className="text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                      <select 
                        value={calendarFilterCategory}
                        onChange={(e) => setCalendarFilterCategory(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#E11D48] focus:border-[#E11D48] block w-full p-2"
                      >
                        <option value="all">All Categories</option>
                        <option value="Academic">Academic</option>
                        <option value="Holiday">Holiday</option>
                        <option value="Religious">Religious</option>
                        <option value="Special">Special</option>
                      </select>
                    </div>
                  </div>
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
                      {filteredCalendarEvents.map(ev => (
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
                                setEventToDelete(ev.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredCalendarEvents.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                            No upcoming events match the filters.
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
                      className="bg-[#E11D48] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-rose-500 transition flex items-center whitespace-nowrap"
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
                      <label className="block text-sm font-bold text-gray-700 mb-1">Popup Title (Admin reference only)</label>
                      <input 
                        type="text" 
                        value={editingPopup.title || ''}
                        onChange={(e) => setEditingPopup({...editingPopup, title: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-rose-500 focus:border-red-500 outline-none" 
                        placeholder="e.g., Summer Camp Registration" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Popup Content <span className="font-normal text-gray-500">(Mini Text Editor)</span>
                      </label>
                      <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-rose-500 focus-within:border-red-500 transition-shadow bg-white">
                        <div className="bg-gray-50 border-b border-gray-300 px-2 py-1.5 flex gap-1 items-center flex-wrap">
                          <button type="button" onClick={() => insertMarkdown('**', '**')} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors" title="Bold">
                            <i className="fa-solid fa-bold"></i>
                          </button>
                          <button type="button" onClick={() => insertMarkdown('*', '*')} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors" title="Italic">
                            <i className="fa-solid fa-italic"></i>
                          </button>
                          <div className="w-px h-5 bg-gray-300 mx-1"></div>
                          <button type="button" onClick={() => insertMarkdown('### ', '')} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors" title="Heading">
                            <i className="fa-solid fa-heading"></i>
                          </button>
                          <div className="w-px h-5 bg-gray-300 mx-1"></div>
                          <button type="button" onClick={() => insertMarkdown('[', '](https://)')} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors" title="Link">
                            <i className="fa-solid fa-link"></i>
                          </button>
                        </div>
                        <textarea 
                          id="popup-content-textarea"
                          value={editingPopup.content || ''}
                          onChange={(e) => setEditingPopup({...editingPopup, content: e.target.value})}
                          onKeyDown={(e) => {
                            if (e.ctrlKey || e.metaKey) {
                              if (e.key === 'b') {
                                e.preventDefault();
                                insertMarkdown('**', '**');
                              } else if (e.key === 'i') {
                                e.preventDefault();
                                insertMarkdown('*', '*');
                              }
                            }
                          }}
                          className="w-full p-4 outline-none min-h-[150px] resize-y block" 
                          placeholder="Enter text to display below the image. You can use the buttons above to format the text. (Shortcuts: Ctrl+B / Ctrl+I)" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Image Upload</label>
                      <div className="flex items-center space-x-4">
                        <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg text-sm transition-colors text-center inline-block">
                          <span>{editingPopup.imageUrl ? 'Change Image' : 'Choose File'}</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setEditingPopup({...editingPopup, imageUrl: event.target?.result as string});
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        {editingPopup.imageUrl && (
                          <div className="flex items-center space-x-3">
                             <img src={editingPopup.imageUrl} alt="Preview" className="h-12 w-auto max-w-[100px] object-contain rounded-md border border-gray-200" />
                             <button type="button" onClick={() => setEditingPopup({...editingPopup, imageUrl: ''})} className="text-red-500 hover:text-red-700 text-lg" title="Remove Image">
                               <i className="fa-solid fa-circle-xmark"></i>
                             </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Link URL (Optional link when image clicked)</label>
                      <input 
                        type="text" 
                        value={editingPopup.linkUrl || ''}
                        onChange={(e) => setEditingPopup({...editingPopup, linkUrl: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-rose-500 focus:border-red-500 outline-none" 
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
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-rose-500 focus:border-red-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">End Date</label>
                        <DatePicker 
                          selected={editingPopup.endDate ? new Date(editingPopup.endDate) : null}
                          onChange={(date) => setEditingPopup({...editingPopup, endDate: date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : ''})}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="YYYY-MM-DD"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-rose-500 focus:border-red-500 outline-none" 
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
                          if (!editingPopup.startDate || !editingPopup.endDate) {
                            showToast("Please fill out required fields: Start Date and End Date.", 'error');
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
                        className="bg-[#E11D48] text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-rose-500 transition"
                      >
                        Save Popup
                      </button>
                    </div>
                  </div>
                )}
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
                        className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-rose-500 focus:border-red-500 outline-none" 
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
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-rose-500 focus:border-red-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Tag / Category</label>
                        <select 
                          value={newPhotoCategory}
                          onChange={(e) => setNewPhotoCategory(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-rose-500 focus:border-red-500 outline-none"
                        >
                          {galleryCategories.filter(cat => cat !== 'All').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button 
                          className="w-full bg-[#E11D48] text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-rose-500 transition"
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
                              showToast('Please provide an image file and description.', 'error');
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
                          <div className="absolute bottom-0 left-0 right-0 bg-black/75 p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center gap-1">
                            <span className="truncate text-[11px] font-semibold flex-1" title={`${img.alt} (${img.category})`}>{img.category}</span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button 
                                type="button"
                                className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-sm"
                                title="Edit category and description"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingPhoto({ ...img });
                                }}
                              >
                                <i className="fa-solid fa-pen-to-square text-[11px]"></i>
                              </button>
                              <button 
                                type="button"
                                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                                  deletingPhotoId === img.id
                                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white scale-110 shadow-md ring-2 ring-white/50'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                                title={deletingPhotoId === img.id ? 'Click again to confirm deletion' : 'Delete photo'}
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  if (deletingPhotoId === img.id) {
                                    await deleteGalleryImageFromDb(img.id);
                                    if (setGalleryImages) {
                                      setGalleryImages(prev => prev.filter(i => i.id !== img.id));
                                    }
                                    setDeletingPhotoId(null);
                                    showToast('Photo deleted successfully');
                                  } else {
                                    setDeletingPhotoId(img.id);
                                    setTimeout(() => {
                                      setDeletingPhotoId(prev => (prev === img.id ? null : prev));
                                    }, 3000);
                                  }
                                }}
                              >
                                <i className={`fa-solid ${deletingPhotoId === img.id ? 'fa-check text-[12px]' : 'fa-trash text-[10px]'}`}></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-rose-500 focus:border-red-500 outline-none"
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
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-rose-500 focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">End Date (Optional)</label>
                  <DatePicker 
                    selected={editingEvent.endDate ? new Date(editingEvent.endDate + 'T00:00:00') : null}
                    onChange={(date) => setEditingEvent({ ...editingEvent, endDate: date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '' })}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-rose-500 focus:border-red-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <select 
                   value={editingEvent.category || 'Academic'}
                   onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                   className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-rose-500 focus:border-red-500 outline-none"
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
                className="bg-[#E11D48] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-rose-500 transition"
                onClick={() => {
                  if (setCalendarEvents && editingEvent.title && editingEvent.date) {
                    if (editingEvent.endDate && new Date(editingEvent.date) > new Date(editingEvent.endDate)) {
                      showToast('Start date cannot be after end date.', 'error');
                      return;
                    }

                    if (editingEvent.id) {
                      setCalendarEvents(prev => prev.map(ev => ev.id === editingEvent.id ? editingEvent as CalendarEvent : ev));
                      showToast('Successfully updated.');
                    } else {
                      setCalendarEvents(prev => [...prev, { ...editingEvent, id: Date.now().toString() } as CalendarEvent]);
                      showToast('Successfully added.');
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
      
      {/* Team Member Edit Modal */}
      {editingTeamMember && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-8 animate-fadeIn">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-bold text-gray-900">
                {editingTeamMember.id ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
              <button onClick={() => setEditingTeamMember(null)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSaveTeamMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Name *</label>
                <input 
                  type="text" 
                  required 
                  value={editingTeamMember.name || ''}
                  onChange={e => setEditingTeamMember({...editingTeamMember, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#E11D48] outline-none"
                  placeholder="e.g. Ms. Jane Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Role / Designation *</label>
                <input 
                  type="text" 
                  required 
                  value={editingTeamMember.role || ''}
                  onChange={e => setEditingTeamMember({...editingTeamMember, role: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#E11D48] outline-none"
                  placeholder="e.g. Grade 1 Adviser"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category *</label>
                <select 
                  value={editingTeamMember.category || 'Faculty'}
                  onChange={e => setEditingTeamMember({...editingTeamMember, category: e.target.value as any})}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#E11D48] outline-none bg-white font-medium"
                >
                  <option value="Leadership">School Leadership</option>
                  <option value="Faculty">Faculty Teacher</option>
                  <option value="AdminSupport">Admin & Support Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Photo Image</label>
                <div className="flex items-center gap-3 mb-2">
                  {editingTeamMember.image && (
                    <div className="w-12 h-12 rounded-full overflow-hidden border bg-gray-100 flex-shrink-0">
                      <img src={editingTeamMember.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="cursor-pointer bg-rose-50 text-[#E11D48] hover:bg-rose-100 font-bold py-1.5 px-3 rounded-lg text-xs transition-colors text-center inline-flex items-center gap-1.5">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <span>Choose File</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={handleTeamImageUpload}
                    />
                  </label>
                  <span className="text-xs text-gray-500 truncate max-w-[180px]">
                    {teamFileName || (editingTeamMember.image ? 'Image loaded' : 'No file chosen')}
                  </span>
                </div>
                <input 
                  type="text" 
                  value={editingTeamMember.image || ''}
                  onChange={e => setEditingTeamMember({...editingTeamMember, image: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-xs text-gray-600 focus:ring-2 focus:ring-[#E11D48] outline-none"
                  placeholder="Or enter Image URL (e.g. /img/OurTeam-Name.png)"
                />
              </div>

              {editingTeamMember.category === 'Leadership' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Quote / Message (for Leadership)</label>
                  <textarea 
                    rows={2}
                    value={editingTeamMember.message || ''}
                    onChange={e => setEditingTeamMember({...editingTeamMember, message: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#E11D48] outline-none"
                    placeholder='"Preparing the next generation as God-fearing leaders..."'
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setEditingTeamMember(null)}
                  className="px-4 py-2 border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-[#E11D48] text-white rounded-lg text-sm font-bold hover:bg-rose-600 shadow"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Facility Edit Modal */}
      {editingFacility && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-8 animate-fadeIn">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-bold text-gray-900">
                {editingFacility.id ? 'Edit Facility' : 'Add New Facility'}
              </h3>
              <button onClick={() => setEditingFacility(null)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSaveFacility} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Facility Title *</label>
                <input 
                  type="text" 
                  required 
                  value={editingFacility.title || ''}
                  onChange={e => setEditingFacility({...editingFacility, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#E11D48] outline-none"
                  placeholder="e.g. Science Laboratory"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={editingFacility.desc || ''}
                  onChange={e => setEditingFacility({...editingFacility, desc: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#E11D48] outline-none"
                  placeholder="Describe this facility..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Facility Photo</label>
                <div className="flex items-center gap-3 mb-2">
                  {editingFacility.image && (
                    <div className="w-16 h-12 rounded overflow-hidden border bg-gray-100 flex-shrink-0">
                      <img src={editingFacility.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="cursor-pointer bg-rose-50 text-[#E11D48] hover:bg-rose-100 font-bold py-1.5 px-3 rounded-lg text-xs transition-colors text-center inline-flex items-center gap-1.5">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <span>Choose File</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={handleFacilityImageUpload}
                    />
                  </label>
                  <span className="text-xs text-gray-500 truncate max-w-[180px]">
                    {facilityFileName || (editingFacility.image ? 'Image loaded' : 'No file chosen')}
                  </span>
                </div>
                <input 
                  type="text" 
                  value={editingFacility.image || ''}
                  onChange={e => setEditingFacility({...editingFacility, image: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-xs text-gray-600 focus:ring-2 focus:ring-[#E11D48] outline-none"
                  placeholder="Or enter Image URL (e.g. /img/Campus_Life-Library.png)"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setEditingFacility(null)}
                  className="px-4 py-2 border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-[#E11D48] text-white rounded-lg text-sm font-bold hover:bg-rose-600 shadow"
                >
                  Save Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Edit Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <i className="fa-solid fa-pen-to-square text-[#E11D48]"></i>
                Edit Photo Details
              </h3>
              <button onClick={() => setEditingPhoto(null)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!editingPhoto || !setGalleryImages) return;
              setGalleryImages(prev => prev.map(img => img.id === editingPhoto.id ? editingPhoto : img));
              setEditingPhoto(null);
              showToast('Photo details updated successfully!');
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Photo Preview</label>
                <div className="h-44 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-inner">
                  <img src={editingPhoto.src} alt={editingPhoto.alt} className="w-full h-full object-cover" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category (Tag) *</label>
                <select 
                  value={editingPhoto.category}
                  onChange={e => setEditingPhoto({...editingPhoto, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#E11D48] outline-none bg-white font-medium text-gray-800"
                >
                  {galleryCategories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description / Alt Text *</label>
                <input 
                  type="text" 
                  required 
                  value={editingPhoto.alt}
                  onChange={e => setEditingPhoto({...editingPhoto, alt: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#E11D48] outline-none text-gray-900 font-medium"
                  placeholder="e.g. Students in Science Laboratory"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2 border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-[#E11D48] text-white rounded-lg text-sm font-bold hover:bg-rose-600 shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Delete Confirmation Modal */}
      {eventToDelete && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-fadeIn">
            <h3 className="text-xl font-black text-gray-900 mb-4">Are you sure you want to delete this?</h3>
            <p className="text-gray-600 mb-6 font-medium">
              This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setEventToDelete(null)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white font-bold hover:bg-red-700 rounded-lg transition shadow-md"
                onClick={async () => {
                  if (eventToDelete) {
                    await deleteCalendarEventFromDb(eventToDelete);
                    if (setCalendarEvents) {
                      setCalendarEvents(prev => prev.filter(e => e.id !== eventToDelete));
                      showToast('Successfully deleted.');
                    }
                  }
                  setEventToDelete(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[100] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slideUp font-bold ${
          toast.type === 'success' ? 'bg-green-100 text-green-800 border-2 border-green-500' : 'bg-red-100 text-red-800 border-2 border-red-500'
        }`}>
          <i className={`fa-solid ${toast.type === 'success' ? 'fa-check-circle' : 'fa-triangle-exclamation'} text-xl`}></i>
          {toast.message}
        </div>
      )}

    </div>
  );
};

export default Admin;
