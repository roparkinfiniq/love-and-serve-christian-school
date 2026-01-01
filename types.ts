
export type Page = 'Home' | 'About' | 'Academics' | 'Admissions' | 'Gallery';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Program {
  icon: string;
  title: string;
  description: string;
  id: string;
}
