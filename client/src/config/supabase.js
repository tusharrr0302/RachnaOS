// client/src/config/supabase.js
// Lazy Supabase client — won't throw if env vars aren't set yet (shows warning instead).

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '[RachnaOS] Supabase env vars missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to client/.env'
  )
  // Return a stub that logs errors instead of crashing
  supabase = {
    from: () => ({
      select: () => ({ eq: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }),
      upsert: async () => ({ error: new Error('Supabase not configured') }),
    }),
  }
} else {
  supabase = createClient(supabaseUrl, supabaseKey)
}

export { supabase }
