import { createClient } from '@supabase/supabase-js';
import { TeamMember, FacilityItem, GalleryImage, CalendarEvent, PopupData } from '../types';
import teamJson from '../public/content/team.json';
import facilitiesJson from '../public/content/facilities.json';
import galleryJson from '../public/content/gallery.json';
import calendarJson from '../public/content/calendar.json';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wnwwjrgtdglarbqsqdda.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_mJ6Flsmr-EZLM32zZj6vLw_ZNqF091B';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Initial Fallbacks
const DEFAULT_TEAM: TeamMember[] = (teamJson.members || teamJson) as TeamMember[];
const DEFAULT_FACILITIES: FacilityItem[] = (facilitiesJson.items || facilitiesJson) as FacilityItem[];
const DEFAULT_GALLERY: GalleryImage[] = (galleryJson.images || galleryJson) as GalleryImage[];
const DEFAULT_CALENDAR: CalendarEvent[] = (calendarJson.events || calendarJson) as CalendarEvent[];

// --- TEAM MEMBERS ---
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  if (!supabase) return DEFAULT_TEAM;
  try {
    const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_TEAM;
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      category: item.category,
      image: item.image || '',
      message: item.message || undefined,
      position: item.position || undefined,
    }));
  } catch (e) {
    console.warn('Supabase fetch team failed, fallback to default', e);
    return DEFAULT_TEAM;
  }
}

export async function saveTeamMembers(members: TeamMember[]): Promise<boolean> {
  if (!supabase) return false;
  try {
    const baseTime = new Date('2026-01-01T00:00:00Z').getTime();
    const payload = members.map((m, index) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      category: m.category,
      image: m.image || '',
      message: m.message || null,
      position: m.position || null,
      created_at: new Date(baseTime + index * 1000).toISOString(),
    }));
    const { error } = await supabase.from('team_members').upsert(payload, { onConflict: 'id' });
    if (error) console.error('Failed to upsert team members:', error);
    return !error;
  } catch (e) {
    console.error('Save team members failed', e);
    return false;
  }
}

export async function deleteTeamMemberFromDb(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    return !error;
  } catch (e) {
    console.error('Delete team member failed', e);
    return false;
  }
}

// --- FACILITIES ---
export async function fetchFacilities(): Promise<FacilityItem[]> {
  if (!supabase) return DEFAULT_FACILITIES;
  try {
    const { data, error } = await supabase.from('facilities').select('*').order('created_at', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_FACILITIES;
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      image: item.image,
      desc: item.desc,
    }));
  } catch (e) {
    console.warn('Supabase fetch facilities failed, fallback to default', e);
    return DEFAULT_FACILITIES;
  }
}

export async function saveFacilities(facilities: FacilityItem[]): Promise<boolean> {
  if (!supabase) return false;
  try {
    const payload = facilities.map(f => ({
      id: f.id,
      title: f.title,
      image: f.image,
      desc: f.desc,
    }));
    const { error } = await supabase.from('facilities').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.error('Save facilities failed', e);
    return false;
  }
}

export async function deleteFacilityFromDb(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('facilities').delete().eq('id', id);
    return !error;
  } catch (e) {
    console.error('Delete facility failed', e);
    return false;
  }
}

// --- GALLERY IMAGES ---
export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  if (!supabase) return DEFAULT_GALLERY;
  try {
    const { data, error } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_GALLERY;
    return data.map((item: any) => ({
      id: item.id,
      src: item.src,
      alt: item.alt,
      category: item.category,
    }));
  } catch (e) {
    console.warn('Supabase fetch gallery failed, fallback to default', e);
    return DEFAULT_GALLERY;
  }
}

export async function saveGalleryImages(images: GalleryImage[]): Promise<boolean> {
  if (!supabase) return false;
  try {
    const payload = images.map(g => ({
      id: g.id,
      src: g.src,
      alt: g.alt,
      category: g.category,
    }));
    const { error } = await supabase.from('gallery_images').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.error('Save gallery failed', e);
    return false;
  }
}

export async function deleteGalleryImageFromDb(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('gallery_images').delete().eq('id', id);
    return !error;
  } catch (e) {
    console.error('Delete gallery image failed', e);
    return false;
  }
}

// --- CALENDAR EVENTS ---
export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  if (!supabase) return DEFAULT_CALENDAR;
  try {
    const { data, error } = await supabase.from('calendar_events').select('*').order('date', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_CALENDAR;
    return data.map((item: any) => ({
      id: item.id,
      date: item.date,
      endDate: item.end_date || undefined,
      title: item.title,
      category: item.category,
    }));
  } catch (e) {
    console.warn('Supabase fetch calendar failed, fallback to default', e);
    return DEFAULT_CALENDAR;
  }
}

export async function saveCalendarEvents(events: CalendarEvent[]): Promise<boolean> {
  if (!supabase) return false;
  try {
    const payload = events.map(ev => ({
      id: ev.id,
      date: ev.date,
      end_date: ev.endDate || null,
      title: ev.title,
      category: ev.category,
    }));
    const { error } = await supabase.from('calendar_events').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.error('Save calendar failed', e);
    return false;
  }
}

export async function deleteCalendarEventFromDb(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('calendar_events').delete().eq('id', id);
    return !error;
  } catch (e) {
    console.error('Delete calendar event failed', e);
    return false;
  }
}

// --- POPUPS ---
export async function fetchPopups(): Promise<PopupData[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.from('popups').select('*').order('created_at', { ascending: false });
    if (error || !data) return [];
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      content: item.content || undefined,
      imageUrl: item.image_url || undefined,
      linkUrl: item.link_url || undefined,
      startDate: item.start_date,
      endDate: item.end_date,
      isActive: item.is_active,
    }));
  } catch (e) {
    console.warn('Supabase fetch popups failed', e);
    return [];
  }
}

export async function savePopups(popups: PopupData[]): Promise<boolean> {
  if (!supabase) return false;
  try {
    const payload = popups.map(p => ({
      id: p.id,
      title: p.title,
      content: p.content || null,
      image_url: p.imageUrl || null,
      link_url: p.linkUrl || null,
      start_date: p.startDate,
      end_date: p.endDate,
      is_active: p.isActive,
    }));
    const { error } = await supabase.from('popups').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.error('Save popups failed', e);
    return false;
  }
}

export async function deletePopupFromDb(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('popups').delete().eq('id', id);
    return !error;
  } catch (e) {
    console.error('Delete popup failed', e);
    return false;
  }
}
