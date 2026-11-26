import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function AdminLogin() {
  const { user, entrar, recuperarSenha } = useAuth()
  const navegar = useNavigate()
  const [email, setEmail] = useState('')
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
        <label>Senha<input type="password" name="senha" required autoComplete="current-password" /></label>
        <button className="btn btn-purple" disabled={ocupado}>{ocupado ? 'Entrando...' : 'Entrar'}</button>
        <button type="button" className="btn btn-sm" onClick={esqueci} disabled={ocupado}>Esqueci a senha</button>
        {erro && <p className="msg err">{erro}</p>}
        {info && <p className="msg ok">{info}</p>}
      </form>
    </div>
  )
}
