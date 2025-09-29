// /api/_supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js'

const url  = process.env.SUPABASE_URL
const key  = process.env.SUPABASE_SERVICE_ROLE_KEY // server-only!

if (!url || !key) {
  console.error('Server Supabase env missing. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
}

export const supabaseAdmin = createClient(url!, key!, {
  auth: { persistSession: false },
})
