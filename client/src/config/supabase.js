// client/src/config/supabase.js
// Lazy Supabase client — won't throw if env vars aren't set yet (shows warning instead).

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase

const isPlaceholder = (val) => {
  if (!val) return true
  return val.includes('your_key_here') || 
         val.includes('your-project') || 
         val.includes('your_anon_key_here') || 
         val.includes('pk_test_your_key_here') ||
         val.includes('sk_test_your_key_here')
}

if (!supabaseUrl || !supabaseKey || isPlaceholder(supabaseUrl) || isPlaceholder(supabaseKey)) {
  console.warn(
    '[RachnaOS] Supabase env vars missing or placeholder. Running with mock database stub.'
  )
  // Return a stub that logs errors instead of crashing
  supabase = {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null })
        }),
        order: () => ({
          limit: async () => ({ data: [], error: null })
        }),
        limit: async () => ({ data: [], error: null })
      }),
      upsert: async () => ({ data: null, error: null }),
      insert: async () => ({ data: null, error: null }),
      update: async () => ({ data: null, error: null }),
      delete: async () => ({ data: null, error: null }),
    }),
  }
} else {
  supabase = createClient(supabaseUrl, supabaseKey)
}

export { supabase }
