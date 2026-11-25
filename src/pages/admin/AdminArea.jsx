import { Navigate, Route, Routes } from 'react-router-dom'
import { firebaseOk } from '../../lib/firebase.js'
import { AuthProvider } from '../../context/AuthContext.jsx'
import RequireAuth from '../../components/admin/RequireAuth.jsx'
import AdminLogin from './AdminLogin.jsx'
import AdminPanel from './AdminPanel.jsx'

// Carregada só quando alguém abre /admin (não pesa no site público).
export default function AdminArea() {
  if (!firebaseOk) {
    return (
      <div className="container admin-wrap">
        <p className="msg err">Firebase não configurado. Preencha as variáveis VITE_FIREBASE_* no arquivo .env e reinicie o servidor.</p>
      </div>
    )
  }
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<AdminLogin />} />
        <Route path="painel" element={<RequireAuth><AdminPanel /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  )
}
