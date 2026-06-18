-- supabase/migrations/002_freelancer_public_profile.sql
-- Freelancer Public Profile table for RachnaOS
-- Run in Supabase SQL editor or via: supabase db push

-- ── Table ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS freelancer_public_profiles (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id     UUID        REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  username          TEXT        UNIQUE NOT NULL,
  
  -- Identity
  role_title        TEXT,
  location          TEXT,
  languages         TEXT[]      DEFAULT '{}',
  is_available      BOOLEAN     DEFAULT TRUE,
  
  -- Cover & Avatar
  cover_preset      TEXT        DEFAULT 'indigo',
  cover_image_url   TEXT,

  -- About
  bio               TEXT        CHECK (char_length(bio) <= 300),
  specializations   TEXT[]      DEFAULT '{}',
  tools             JSONB       DEFAULT '[]',
  
  -- Services (array of {id, name, description, priceFrom, deliveryDays, tags[]})
  services          JSONB       DEFAULT '[]',

  -- Skills (array of {category, items: [{name, level}]})
  skills            JSONB       DEFAULT '[]',

  -- Work Style
  work_style_tags   TEXT[]      DEFAULT '{}',
  working_with_me   TEXT,

  -- Availability
  availability_days TEXT[]      DEFAULT '{}',
  preferred_duration TEXT       CHECK (preferred_duration IN ('short', 'long', 'both')) DEFAULT 'both',
  rate_min          INTEGER     CHECK (rate_min >= 0) DEFAULT 0,
  rate_max          INTEGER     CHECK (rate_max >= 0) DEFAULT 0,

  -- Social
  social_links      JSONB       DEFAULT '{}',

  -- Metadata
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── Updated_at auto-trigger ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER freelancer_public_profiles_updated_at
  BEFORE UPDATE ON freelancer_public_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── Row Level Security ───────────────────────────────────────────────
ALTER TABLE freelancer_public_profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read any active public profile (used by creator marketplace)
CREATE POLICY "public_profiles_read_all" ON freelancer_public_profiles
  FOR SELECT USING (true);

-- Only the owning freelancer can insert their own profile
CREATE POLICY "public_profiles_insert_own" ON freelancer_public_profiles
  FOR INSERT WITH CHECK (
    freelancer_id = (
      SELECT id FROM profiles
      WHERE clerk_user_id = auth.uid()::text
      LIMIT 1
    )
  );

-- Only the owning freelancer can update their own profile
CREATE POLICY "public_profiles_update_own" ON freelancer_public_profiles
  FOR UPDATE USING (
    freelancer_id = (
      SELECT id FROM profiles
      WHERE clerk_user_id = auth.uid()::text
      LIMIT 1
    )
  );

-- Freelancers cannot delete profiles (requires admin)
-- To allow: uncomment and add DELETE policy

-- ── Indexes ─────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_public_profiles_username      ON freelancer_public_profiles(username);
CREATE INDEX IF NOT EXISTS idx_public_profiles_freelancer_id ON freelancer_public_profiles(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_public_profiles_is_available  ON freelancer_public_profiles(is_available);
CREATE INDEX IF NOT EXISTS idx_public_profiles_location      ON freelancer_public_profiles(location);

-- ── Seed for development ─────────────────────────────────────────────
-- Run this only in development to pre-populate Aditya Singh's profile
-- INSERT INTO freelancer_public_profiles (freelancer_id, username, role_title, ...) VALUES (...);
