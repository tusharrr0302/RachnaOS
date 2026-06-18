-- supabase/migrations/001_freelancer_tables.sql
-- Freelancer feature tables for RachnaOS
-- Run in Supabase SQL editor or via supabase db push

-- freelancer_proposals
CREATE TABLE IF NOT EXISTS freelancer_proposals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  opportunity_id  UUID,
  cover_letter    TEXT,
  proposed_rate   DECIMAL(10,2),
  status          TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- freelancer_portfolio
CREATE TABLE IF NOT EXISTS freelancer_portfolio (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  media_url       TEXT,
  category        TEXT CHECK (category IN ('Video Editing', 'Color Grading', 'Motion Graphics', 'Thumbnail Design', 'Other')),
  views           INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- marketplace_opportunities (gigs posted by creators)
CREATE TABLE IF NOT EXISTS marketplace_opportunities (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id      UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  category        TEXT,
  budget_min      DECIMAL(10,2),
  budget_max      DECIMAL(10,2),
  experience      TEXT CHECK (experience IN ('Beginner', 'Intermediate', 'Expert')),
  tags            TEXT[],
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  expires_at      TIMESTAMPTZ
);

-- ── Row Level Security ───────────────────────────────────────────────

-- Enable RLS
ALTER TABLE freelancer_proposals    ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_portfolio    ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_opportunities ENABLE ROW LEVEL SECURITY;

-- freelancer_proposals: freelancers can only see/edit their own rows
CREATE POLICY "freelancer_proposals_own" ON freelancer_proposals
  USING (freelancer_id = (
    SELECT id FROM profiles WHERE clerk_user_id = auth.uid()::text LIMIT 1
  ));

CREATE POLICY "freelancer_proposals_insert" ON freelancer_proposals
  FOR INSERT WITH CHECK (freelancer_id = (
    SELECT id FROM profiles WHERE clerk_user_id = auth.uid()::text LIMIT 1
  ));

-- freelancer_portfolio: freelancers can only see/edit their own rows
CREATE POLICY "freelancer_portfolio_own" ON freelancer_portfolio
  USING (freelancer_id = (
    SELECT id FROM profiles WHERE clerk_user_id = auth.uid()::text LIMIT 1
  ));

CREATE POLICY "freelancer_portfolio_insert" ON freelancer_portfolio
  FOR INSERT WITH CHECK (freelancer_id = (
    SELECT id FROM profiles WHERE clerk_user_id = auth.uid()::text LIMIT 1
  ));

-- marketplace_opportunities: anyone can read active ones, creators manage their own
CREATE POLICY "opportunities_read_active" ON marketplace_opportunities
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "opportunities_creator_manage" ON marketplace_opportunities
  USING (creator_id = (
    SELECT id FROM profiles WHERE clerk_user_id = auth.uid()::text LIMIT 1
  ));

-- ── Indexes ──────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_proposals_freelancer    ON freelancer_proposals(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_proposals_status        ON freelancer_proposals(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_freelancer    ON freelancer_portfolio(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_category  ON marketplace_opportunities(category);
CREATE INDEX IF NOT EXISTS idx_opportunities_active    ON marketplace_opportunities(is_active);
