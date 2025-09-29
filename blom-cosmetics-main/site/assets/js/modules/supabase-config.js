// js/supabase-config.js
// Supabase Configuration
// Replace these values with your actual Supabase project credentials

export const SUPABASE_CONFIG = {
  // Your Supabase project URL
  url: 'https://your-project-id.supabase.co',
  
  // Your Supabase anon/public key
  anonKey: 'your-anon-key-here',
  
  // Optional: Service role key (for server-side operations)
  serviceRoleKey: 'your-service-role-key-here',
  
  // Auth configuration
  auth: {
    flowType: 'pkce', // better UX for magic links
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }
}

// Instructions for setup:
// 1. Go to https://supabase.com/dashboard
// 2. Create a new project or select existing project
// 3. Go to Settings > API
// 4. Copy the Project URL and anon/public key
// 5. Replace the values above with your actual credentials
// 6. Save this file
