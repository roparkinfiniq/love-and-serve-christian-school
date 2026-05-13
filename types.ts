
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export type Page = 'Home' | 'About' | 'Academics' | 'Admissions' | 'Facilities' | 'Gallery' | 'Contact' | 'Team' | 'Careers' | 'Admin' | 'Calendar';

export interface PopupData {
  id: string;
  title: string;
  imageUrl?: string;
  linkUrl?: string; // Optional link when clicked
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  isActive: boolean; // Manual toggle for forced hide
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CalendarEvent {
  id: string;
  date: string;
  endDate?: string;
  title: string;
  category: 'Academic' | 'Holiday' | 'Religious' | 'Special' | string;
}

export interface Program {
  title: string;
  description: string;
  id: string;
}