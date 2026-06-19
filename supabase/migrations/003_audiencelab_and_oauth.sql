CREATE TABLE focus_group_runs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  hook TEXT,
  script_outline TEXT,
  niche TEXT,
  persona_results JSONB,
  synthesis JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_focus_group_user ON focus_group_runs(user_id);

ALTER TABLE focus_group_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view their own runs" ON focus_group_runs
  FOR SELECT USING (user_id = auth.uid()::text);
CREATE POLICY "Users insert their own runs" ON focus_group_runs
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- Add to Supabase: stores the creator's own OAuth tokens
CREATE TABLE youtube_oauth_connections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  channel_id TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expiry_date BIGINT,
  connected_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE youtube_oauth_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own connection" ON youtube_oauth_connections
  FOR ALL USING (user_id = auth.uid()::text);
