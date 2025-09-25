import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!user) return <div className="p-6">You’re logged out. <a className="text-pink-600" href="/login">Login</a></div>

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">My Account</h1>
      <div>Email: {user.email}</div>
      <button
        className="px-4 py-2 rounded bg-gray-100"
        onClick={() => supabase.auth.signOut()}
      >
        Sign out
      </button>
    </div>
  )
}
