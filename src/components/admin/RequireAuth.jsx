import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function RequireAuth({ children }) {
  const { user, carregando } = useAuth()
  if (carregando) return <p className="container admin-wrap">Carregando...</p>
  return user ? children : <Navigate to="/admin" replace />
}
