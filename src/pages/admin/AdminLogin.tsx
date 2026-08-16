import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Mail, LogIn } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    setSubmitting(true)
    setError(null)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setSubmitting(false)
    if (authError) {
      setError(authError.message === 'Invalid login credentials'
        ? 'Email ou mot de passe incorrect.'
        : authError.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-900 to-earth-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Administration</h1>
          <p className="text-earth-200">Espace de gestion des photos du site SAIN</p>
        </div>

        {!isSupabaseConfigured ? (
          <div className="bg-sun-50 border border-sun-200 rounded-2xl p-6 text-sm text-sun-800">
            Supabase n'est pas encore configuré. Ajoutez les variables{' '}
            <code className="font-mono bg-white px-1.5 py-0.5 rounded">VITE_SUPABASE_URL</code> et{' '}
            <code className="font-mono bg-white px-1.5 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code>{' '}
            dans votre fichier <code className="font-mono bg-white px-1.5 py-0.5 rounded">.env.local</code>,
            puis redémarrez le serveur.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8 space-y-6">
            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-ink-soft mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-earth-300 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                  placeholder="admin@sain-benin.org"
                />
              </div>
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-ink-soft mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-earth-300 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-sun-600 hover:bg-earth-700 disabled:opacity-60 text-white rounded-full font-semibold transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2"
            >
              <LogIn className="w-5 h-5" aria-hidden="true" />
              {submitting ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        )}

        <p className="text-center mt-6">
          <Link to="/" className="text-earth-300 hover:text-white text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-400 focus-visible:ring-offset-2 rounded-lg">
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
