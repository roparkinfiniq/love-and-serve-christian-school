
export type Page = 'Home' | 'About' | 'Academics' | 'Admissions' | 'Facilities' | 'Gallery' | 'Contact' | 'Team' | 'Careers' | 'Admin' | 'Calendar';

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