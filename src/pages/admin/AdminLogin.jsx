import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function AdminLogin() {
  const { user, entrar } = useAuth()
  const navegar = useNavigate()
  const [erro, setErro] = useState('')
  const [ocupado, setOcupado] = useState(false)

  useEffect(() => { if (user) navegar('/admin/painel', { replace: true }) }, [user, navegar])

  async function aoEnviar(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setErro(''); setOcupado(true)
    try { await entrar(f.get('email'), f.get('senha')) }
    catch (err) {
      setErro(['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found'].includes(err.code)
        ? 'E-mail ou senha incorretos.' : 'Não foi possível entrar. Tente de novo.')
    }
    setOcupado(false)
  }

  return (
    <div className="container admin-wrap">
      <form className="card form" onSubmit={aoEnviar}>
        <h2>Área do adm ne bb</h2>
        <label>E-mail<input type="email" name="email" required autoComplete="username" /></label>
        <label>Senha<input type="password" name="senha" required autoComplete="current-password" /></label>
        <button className="btn btn-purple" disabled={ocupado}>{ocupado ? 'Entrando...' : 'Entrar'}</button>
        {erro && <p className="msg err">{erro}</p>}
      </form>
    </div>
  )
}
