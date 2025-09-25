// /src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Vite-style envs (VITE_*). If you use Next or plain HTML, see notes below.
const url  = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anon) {
  // Helpful runtime error in dev
  console.error('Supabase env missing. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
}

export const supabase = createClient(url!, anon!, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
