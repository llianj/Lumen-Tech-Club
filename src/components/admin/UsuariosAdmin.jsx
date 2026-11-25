import { useEffect, useState } from 'react'
import { listar, remover } from '../../services/adminService.js'
import { criarAdmin } from '../../services/adminUsers.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function UsuariosAdmin() {
  const { user } = useAuth()
  const [lista, setLista] = useState([])
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [msg, setMsg] = useState('')
  const [erro, setErro] = useState('')
  const [ocupado, setOcupado] = useState(false)

  async function carregar() {
    try {
      setLista(await listar('admins'))
      setErro('')
    } catch (e) {
      setErro(e.message)
    }
  }

  useEffect(() => {
    let ativo = true
    listar('admins')
      .then((admins) => { if (ativo) setLista(admins) })
      .catch((e) => { if (ativo) setErro(e.message) })
    return () => { ativo = false }
  }, [])

  async function adicionar(e) {
    e.preventDefault()
    setErro('')
    setMsg('')
    if (senha.length < 8) {
      setErro('A senha precisa ter pelo menos 8 caracteres.')
      return
    }

    setOcupado(true)
    try {
      const emailNovo = email.trim()
      await criarAdmin(emailNovo, senha)
      setMsg(`Administrador ${emailNovo} criado.`)
      setEmail('')
      setSenha('')
      await carregar()
    } catch (err) {
      setErro(err.code === 'auth/email-already-in-use'
        ? 'Esse e-mail já tem conta. Adicione o UID dele na coleção admins pelo Console.'
        : err.message)
    } finally {
      setOcupado(false)
    }
  }

  async function revogar(id) {
    if (!window.confirm('Remover o acesso deste administrador?')) return
    setErro('')
    setMsg('')
    setOcupado(true)
    try {
      await remover('admins', id)
      setMsg('Acesso do administrador removido.')
      await carregar()
    } catch (err) {
      setErro(err.message)
    } finally {
      setOcupado(false)
    }
  }

  return (
    <section className="admin-users">
      <h2 className="admin-titulo">Administradores</h2>

      <form className="admin-users-form" onSubmit={adicionar}>
        <label>
          E-mail <span className="req">*</span>
          <input type="email" required autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Senha inicial <span className="req">*</span>
          <input type="password" required minLength={8} autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        <div>
          <button className="btn btn-sm" disabled={ocupado}>{ocupado ? 'Criando...' : '+ Adicionar admin'}</button>
        </div>
        {msg && <p className="msg ok">{msg}</p>}
        {erro && <p className="msg err">{erro}</p>}
      </form>

      <ul className="admin-lista">
        {lista.map((admin) => (
          <li key={admin.id}>
            <span className="mono">{admin.email}</span>
            {admin.id !== user?.uid && (
              <button className="btn btn-sm" onClick={() => revogar(admin.id)} disabled={ocupado}>
                Remover acesso
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
