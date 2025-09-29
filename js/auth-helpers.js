// js/auth-helpers.js
import { supabase } from './supabase.js'

export async function requireAuth() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('getSession error', error)
      return null
    }

    if (!session) {
      const redirect = encodeURIComponent(location.pathname + location.search)
      location.href = `/login?redirect=${redirect}`
      return null
    }
    return session
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

export function initAuthListener() {
  try {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        // force unauth routes
        if (!location.pathname.startsWith('/login') && !location.pathname.startsWith('/signup')) {
          location.href = '/login'
        }
      }
      if (event === 'SIGNED_IN') {
        if (location.pathname === '/login' || location.pathname === '/signup') {
          location.href = '/account'
        }
      }
    })
  } catch (error) {
    console.error('Auth listener error:', error)
  }
}
