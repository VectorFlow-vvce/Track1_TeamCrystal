-- JeevanAid Supabase Tables Setup
-- Run this in Supabase Dashboard → SQL Editor → New Query → Run

-- 1. Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Family members table
CREATE TABLE IF NOT EXISTS family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relation TEXT,
  blood_group TEXT,
  conditions TEXT,
  allergies TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies — users can only access their own data
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own family" ON family_members FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own family" ON family_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own family" ON family_members FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own family" ON family_members FOR DELETE USING (auth.uid() = user_id);
