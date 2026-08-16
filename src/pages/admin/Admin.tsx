import { useAdminAuth } from '../../hooks/useAdminAuth'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

const Admin = () => {
  const { session, loading } = useAdminAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-earth-900 to-earth-950 flex items-center justify-center">
        <p className="text-earth-200">Chargement…</p>
      </div>
    )
  }

  if (!session) return <AdminLogin />
  return <AdminDashboard />
}

export default Admin
