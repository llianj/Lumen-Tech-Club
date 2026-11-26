import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function AdminLogin() {
  const { user, entrar, recuperarSenha } = useAuth()
  const navegar = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [info, setInfo] = useState('')
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

  async function esqueci() {
    setErro('')
    setInfo('')
    if (!email.trim()) {
      setErro('Digite seu e-mail acima para recuperar a senha.')
      return
    }

    setOcupado(true)
    try {
      await recuperarSenha(email.trim())
      setInfo('Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.')
    } catch (err) {
      setErro(err.message)
    } finally {
      setOcupado(false)
    }
  }

  return (
    <div className="container admin-wrap">
      <form className="card form" onSubmit={aoEnviar}>
        <h2>Painel Administrativo</h2>
        <label>E-mail<input type="email" name="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>
          Senha
          <div className="password-field">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              name="senha"
              required
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setMostrarSenha((mostrar) => !mostrar)}
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              aria-pressed={mostrarSenha}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {mostrarSenha ? (
                  <><path d="M3 3l18 18" /><path d="M10.6 10.7a2 2 0 002.7 2.7" /><path d="M9.9 4.2A10.8 10.8 0 0112 4c5.5 0 9 8 9 8a16.8 16.8 0 01-2.1 3.2" /><path d="M6.6 6.6C4.3 8.1 3 12 3 12s3.5 8 9 8a9.8 9.8 0 004-.8" /></>
                ) : (
                  <><path d="M3 12s3.5-8 9-8 9 8 9 8-3.5 8-9 8-9-8-9-8z" /><circle cx="12" cy="12" r="3" /></>
                )}
              </svg>
            </button>
          </div>
        </label>
        <button className="btn btn-purple" disabled={ocupado}>{ocupado ? 'Entrando...' : 'Entrar'}</button>
        <button type="button" className="btn btn-sm" onClick={esqueci} disabled={ocupado}>Esqueci a senha</button>
        {erro && <p className="msg err">{erro}</p>}
        {info && <p className="msg ok">{info}</p>}
      </form>
    </div>
  )
}
