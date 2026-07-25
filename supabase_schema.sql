-- ===================================================
-- Love & Serve Christian School - Supabase Database Schema
-- Run this script in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Run
-- ===================================================

-- 1. Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    message TEXT,
    position TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Facilities Table
CREATE TABLE IF NOT EXISTS public.facilities (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Gallery Images Table
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id TEXT PRIMARY KEY,
    src TEXT NOT NULL,
    alt TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Calendar Events Table
CREATE TABLE IF NOT EXISTS public.calendar_events (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    end_date TEXT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Popups Table
CREATE TABLE IF NOT EXISTS public.popups (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    image_url TEXT,
    link_url TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) & Allow Public Read/Write
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.popups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on team_members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on team_members" ON public.team_members FOR ALL USING (true);

CREATE POLICY "Allow public select on facilities" ON public.facilities FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on facilities" ON public.facilities FOR ALL USING (true);

CREATE POLICY "Allow public select on gallery_images" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on gallery_images" ON public.gallery_images FOR ALL USING (true);

CREATE POLICY "Allow public select on calendar_events" ON public.calendar_events FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on calendar_events" ON public.calendar_events FOR ALL USING (true);

CREATE POLICY "Allow public select on popups" ON public.popups FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on popups" ON public.popups FOR ALL USING (true);
