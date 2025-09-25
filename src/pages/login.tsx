import { useState } from 'react'
import { supabase } from '@/lib/supabase' // adjust alias if needed

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setMsg(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    setMsg(error ? error.message : 'Logged in.')
  }

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setMsg(null)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    setMsg(error ? error.message : 'Check your inbox to confirm.')
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in / Create account</h1>
      <form className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={onLogin} className="px-4 py-2 rounded bg-pink-500 text-white" disabled={loading}>Login</button>
          <button onClick={onSignup} className="px-4 py-2 rounded bg-gray-100" disabled={loading}>Create account</button>
        </div>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  )
}
