// server/lib/supabase.js
// Server-side Supabase client using the SERVICE ROLE key (bypasses RLS)

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('[server] Supabase env vars missing — DB operations will fail')
}

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = { supabase }
