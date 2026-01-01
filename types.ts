
export type Page = 'Home' | 'About' | 'Academics' | 'Admissions' | 'Facilities' | 'Gallery' | 'Contact' | 'Team' | 'Careers';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Program {
  image: string;
  title: string;
  description: string;
  id: string;
}